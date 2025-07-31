import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getRandomAuricMessage } from "@/lib/auric-data";
import { questDatabase, type QuestData, type QuestionData, type EducationalSection } from "@/lib/quest-data";

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: string | null;
  userId: string;
  onComplete: (questId: string, score: number, xpGained: number, coinsGained: number) => void;
}

export function QuestModal({ isOpen, onClose, questId, userId, onComplete }: QuestModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showEducationalContent, setShowEducationalContent] = useState(true);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [auricMessage, setAuricMessage] = useState(getRandomAuricMessage('educational'));

  const queryClient = useQueryClient();

  const quest: QuestData | undefined = questId ? questDatabase[questId] : undefined;
  const currentQuestion: QuestionData | undefined = quest?.questions[currentQuestionIndex];
  const currentEducationalSection: EducationalSection | undefined = quest?.educationalSections[Math.floor(currentQuestionIndex / 3)];

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async (data: { questId: string; currentQuestion: number; answers: Record<number, string> }) => {
      return apiRequest('POST', `/api/user/${userId}/progress`, {
        questId: data.questId,
        currentQuestion: data.currentQuestion,
        answers: data.answers,
      });
    },
  });

  // Complete quest mutation
  const completeQuestMutation = useMutation({
    mutationFn: async (data: { questId: string; score: number; timeSpent: number }) => {
      return apiRequest('POST', `/api/user/${userId}/complete-quest/${data.questId}`, {
        score: data.score,
        timeSpent: data.timeSpent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user', userId] });
      queryClient.invalidateQueries({ queryKey: ['/api/user', userId, 'progress'] });
    },
  });

  useEffect(() => {
    if (isOpen && questId && !startTime) {
      setStartTime(new Date());
      // Generate context-appropriate Auric message
      if (questId.includes('investment')) {
        setAuricMessage(getRandomAuricMessage('educational', 'investment_question'));
      } else if (questId.includes('emergency')) {
        setAuricMessage(getRandomAuricMessage('educational', 'emergency_fund_question'));
      } else {
        setAuricMessage(getRandomAuricMessage('educational'));
      }
    }
  }, [isOpen, questId, startTime]);

  useEffect(() => {
    if (currentQuestion?.auricHint) {
      setAuricMessage({
        id: `hint-${currentQuestion.id}`,
        content: currentQuestion.auricHint,
        category: 'educational',
        context: 'question_hint'
      });
    }
  }, [currentQuestion]);

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer || !quest || !currentQuestion) return;

    const newAnswers = { ...userAnswers, [currentQuestion.id]: selectedAnswer };
    setUserAnswers(newAnswers);

    // Calculate score
    let newScore = score;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      newScore += 10; // 10 points per correct answer
      setScore(newScore);
    }

    // Update progress
    if (questId) {
      updateProgressMutation.mutate({
        questId,
        currentQuestion: currentQuestionIndex + 1,
        answers: newAnswers,
      });
    }

    // Check if this is the last question
    if (currentQuestionIndex === quest.questions.length - 1) {
      // Complete the quest
      const timeSpent = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
      
      if (questId) {
        await completeQuestMutation.mutateAsync({
          questId,
          score: newScore,
          timeSpent,
        });

        onComplete(questId, newScore, quest.xpReward, quest.coinReward);
      }
      
      handleClose();
      return;
    }

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer("");
    setShowEducationalContent(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[quest?.questions[currentQuestionIndex - 1]?.id] || "");
      setShowEducationalContent(false);
    }
  };

  const handleSkipQuestion = () => {
    if (!quest) return;
    
    const newAnswers = { ...userAnswers, [currentQuestion?.id || 0]: "" };
    setUserAnswers(newAnswers);

    if (currentQuestionIndex === quest.questions.length - 1) {
      const timeSpent = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
      
      if (questId) {
        completeQuestMutation.mutate({
          questId,
          score,
          timeSpent,
        });

        onComplete(questId, score, quest.xpReward, quest.coinReward);
      }
      
      handleClose();
      return;
    }

    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer("");
    setShowEducationalContent(true);
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setUserAnswers({});
    setShowEducationalContent(true);
    setScore(0);
    setStartTime(null);
    onClose();
  };

  const progressPercentage = quest ? ((currentQuestionIndex + 1) / quest.questions.length) * 100 : 0;

  if (!quest || !currentQuestion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <DialogHeader className="sticky top-0 bg-card border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{quest.title}</DialogTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Question</span>
              <span className="font-semibold text-primary">{currentQuestionIndex + 1}</span>
              <span>of</span>
              <span className="font-semibold">{quest.questions.length}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2">
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Educational Content Section */}
          {showEducationalContent && currentEducationalSection && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Auric Avatar */}
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    🐲
                  </div>
                  <div className="flex-1">
                    <div className="bg-card/80 rounded-lg p-4 relative">
                      <div className="absolute -left-2 top-4 w-4 h-4 bg-card/80 rotate-45 border-l border-t border-primary/20"></div>
                      <h3 className="font-semibold text-primary mb-2">
                        📚 {currentEducationalSection.title}
                      </h3>
                      <p className="text-sm mb-3">{currentEducationalSection.content}</p>
                      
                      {currentEducationalSection.imageUrl && (
                        <img 
                          src={currentEducationalSection.imageUrl}
                          alt={currentEducationalSection.title}
                          className="w-full h-32 object-cover rounded-lg mb-3" 
                        />
                      )}
                      
                      {currentEducationalSection.examples && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {Object.entries(currentEducationalSection.examples).map(([key, values]) => (
                            <div key={key} className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                              <h4 className="font-medium text-primary mb-1">{key}:</h4>
                              <ul className="text-xs space-y-1 text-muted-foreground">
                                {values.map((value, index) => (
                                  <li key={index}>• {value}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {currentEducationalSection.keyPoints && (
                        <div className="mt-3">
                          <h4 className="font-medium text-primary mb-2">Key Points:</h4>
                          <ul className="text-sm space-y-1">
                            {currentEducationalSection.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-primary">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {currentEducationalSection.auricComment && (
                        <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-sm italic text-amber-600 dark:text-amber-400">
                            "{currentEducationalSection.auricComment}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Section */}
          {!showEducationalContent && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
                
                {/* Answer Options */}
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <span className="font-medium">{option.text}</span>
                          <p className="text-sm text-muted-foreground mt-1">{option.explanation}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Auric Encouragement */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm">
                      🐲
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-primary">"{auricMessage.content}" - Auric</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button 
              onClick={handlePreviousQuestion}
              variant="outline"
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2"
            >
              <span>←</span>
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              {showEducationalContent ? (
                <Button 
                  onClick={() => setShowEducationalContent(false)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
                >
                  Continue to Question
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleSkipQuestion}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Skip for now
                  </Button>
                  <Button 
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
                  >
                    {currentQuestionIndex === quest.questions.length - 1 ? 'Complete Quest' : 'Submit Answer'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
