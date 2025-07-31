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
import auricDragonImage from "@assets/DRAGON_1_1753840736082_1753972723734_1753975956129.png";

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
  const [seenEducationalSections, setSeenEducationalSections] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [auricMessage, setAuricMessage] = useState(getRandomAuricMessage('educational'));
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [answerExplanation, setAnswerExplanation] = useState("");

  const queryClient = useQueryClient();

  const quest: QuestData | undefined = questId ? questDatabase[questId] : undefined;
  const currentQuestion: QuestionData | undefined = quest?.questions[currentQuestionIndex];
  
  // Show educational content only at the beginning (section 0) and middle (section 1)
  const getEducationalSection = (): EducationalSection | undefined => {
    if (!quest?.educationalSections) return undefined;
    
    // Show first educational section at the beginning
    if (currentQuestionIndex === 0 && !seenEducationalSections.has(0)) {
      return quest.educationalSections[0];
    }
    
    // Show second educational section at the middle of the quest
    const middleIndex = Math.floor(quest.questions.length / 2);
    if (currentQuestionIndex === middleIndex && !seenEducationalSections.has(1) && quest.educationalSections[1]) {
      return quest.educationalSections[1];
    }
    
    return undefined;
  };
  
  const currentEducationalSection = getEducationalSection();

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

  // Update educational content visibility based on current position
  useEffect(() => {
    const shouldShowEducational = currentEducationalSection && !seenEducationalSections.has(
      currentQuestionIndex === 0 ? 0 : 1
    );
    setShowEducationalContent(shouldShowEducational || false);
  }, [currentQuestionIndex, currentEducationalSection, seenEducationalSections]);

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

    // Check if answer is correct and show feedback
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(correct);
    setAnswerExplanation(currentQuestion.explanation);
    setShowAnswerFeedback(true);

    // Update Auric message based on answer
    if (correct) {
      setAuricMessage({
        id: `correct-${currentQuestion.id}`,
        content: "🎉 Excellent work, brave treasure hunter! You've got the wisdom of a master dragon! Your hoard grows stronger with each correct answer! ✨🐲💰",
        category: 'celebration',
        context: 'correct_answer'
      });
    } else {
      setAuricMessage({
        id: `incorrect-${currentQuestion.id}`,
        content: "Don't worry, even the mightiest dragons learn from their mistakes! Every wrong turn teaches us the right path. Keep going, you're building wisdom! 🐲💪",
        category: 'motivational',
        context: 'incorrect_answer'
      });
    }

    // Calculate score
    let newScore = score;
    if (correct) {
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
  };

  const handleContinueAfterFeedback = async () => {
    setShowAnswerFeedback(false);
    
    // Check if this is the last question
    if (currentQuestionIndex === quest!.questions.length - 1) {
      // Complete the quest
      const timeSpent = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
      
      if (questId) {
        await completeQuestMutation.mutateAsync({
          questId,
          score,
          timeSpent,
        });

        onComplete(questId, score, quest!.xpReward, quest!.coinReward);
      }
      
      handleClose();
      return;
    }

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer("");
    
    // Reset to next question's hint if available
    const nextQuestion = quest!.questions[currentQuestionIndex + 1];
    if (nextQuestion?.auricHint) {
      setAuricMessage({
        id: `hint-${nextQuestion.id}`,
        content: nextQuestion.auricHint,
        category: 'educational',
        context: 'question_hint'
      });
    } else {
      setAuricMessage(getRandomAuricMessage('educational'));
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[quest?.questions[currentQuestionIndex - 1]?.id] || "");
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
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setUserAnswers({});
    setShowEducationalContent(true);
    setSeenEducationalSections(new Set());
    setScore(0);
    setStartTime(null);
    setShowAnswerFeedback(false);
    setIsAnswerCorrect(false);
    setAnswerExplanation("");
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

        <div className="space-y-6 relative">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-4 left-8 w-2 h-2 bg-amber-400 rounded-full animate-twinkle opacity-60"></div>
            <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-twinkle opacity-40" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-20 left-16 w-1 h-1 bg-blue-400 rounded-full animate-twinkle opacity-50" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-8 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle opacity-45" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-16 right-6 w-1 h-1 bg-pink-400 rounded-full animate-twinkle opacity-55" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-6 left-24 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-twinkle opacity-50" style={{animationDelay: '2.5s'}}></div>
          </div>

          {/* Educational Content Section */}
          {showEducationalContent && currentEducationalSection && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-amber-500/5"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-start space-x-4">
                  {/* Auric Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <img 
                      src={auricDragonImage} 
                      alt="Auric" 
                      className="w-10 h-10 object-contain" 
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
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

          {/* Answer Feedback Section */}
          {showAnswerFeedback && (
            <Card className={`${isAnswerCorrect ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'} shadow-lg relative overflow-hidden`}>
              <div className="absolute inset-0 pointer-events-none">
                {isAnswerCorrect && (
                  <>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-6 right-8 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </>
                )}
              </div>
              <CardContent className="p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative ${isAnswerCorrect ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/20' : 'bg-gradient-to-br from-orange-500/20 to-red-500/20'}`}>
                    <div className="text-3xl">
                      {isAnswerCorrect ? '🎉' : '🤔'}
                    </div>
                    {isAnswerCorrect && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`rounded-lg p-4 relative ${isAnswerCorrect ? 'bg-emerald-100/50' : 'bg-orange-100/50'}`}>
                      <h3 className={`font-bold text-lg mb-2 ${isAnswerCorrect ? 'text-emerald-700' : 'text-orange-700'}`}>
                        {isAnswerCorrect ? '✅ Correct!' : '❌ Not quite right'}
                      </h3>
                      <p className="text-sm mb-4 text-gray-700">{answerExplanation}</p>
                      
                      {/* Auric's Feedback */}
                      <div className={`p-3 rounded-lg ${isAnswerCorrect ? 'bg-emerald-200/50' : 'bg-orange-200/50'}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <img 
                            src={auricDragonImage} 
                            alt="Auric" 
                            className="w-6 h-6 object-contain" 
                          />
                          <span className="font-medium text-sm">Auric says:</span>
                        </div>
                        <p className="text-sm italic">{auricMessage.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Section */}
          {!showEducationalContent && !showAnswerFeedback && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 relative">
                  {currentQuestion.question}
                  <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-primary rounded-full animate-twinkle"></div>
                </h3>
                
                {/* Answer Options */}
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all relative overflow-hidden">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full animate-twinkle opacity-60"></div>
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
              <Card className="bg-primary/5 border-primary/20 relative overflow-hidden">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-full flex items-center justify-center relative">
                      <img 
                        src={auricDragonImage} 
                        alt="Auric" 
                        className="w-6 h-6 object-contain" 
                      />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-70"></div>
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
          <div className="flex items-center justify-between relative">
            {/* Decorative sparkles around buttons */}
            <div className="absolute -top-2 left-4 w-1 h-1 bg-amber-400 rounded-full animate-twinkle opacity-60"></div>
            <div className="absolute -bottom-2 right-8 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-twinkle opacity-50" style={{animationDelay: '1s'}}></div>
            
            <Button 
              onClick={handlePreviousQuestion}
              variant="outline"
              disabled={currentQuestionIndex === 0 || showAnswerFeedback}
              className="flex items-center space-x-2 relative overflow-hidden"
            >
              <span>←</span>
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              {showEducationalContent ? (
                <Button 
                  onClick={() => {
                    setShowEducationalContent(false);
                    // Mark this educational section as seen
                    const sectionIndex = currentQuestionIndex === 0 ? 0 : 1;
                    setSeenEducationalSections(prev => new Set(prev).add(sectionIndex));
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium relative overflow-hidden"
                >
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                  Continue to Question
                </Button>
              ) : showAnswerFeedback ? (
                <Button 
                  onClick={handleContinueAfterFeedback}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium relative overflow-hidden"
                >
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                  {currentQuestionIndex === quest.questions.length - 1 ? 'Complete Quest' : 'Continue'}
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
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium relative overflow-hidden"
                  >
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    Submit Answer
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
