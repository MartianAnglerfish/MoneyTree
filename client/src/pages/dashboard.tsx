import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AuricCompanion } from "@/components/auric-companion";
import { QuestModal } from "@/components/quest-modal";
import { AchievementModal } from "@/components/achievement-modal";
import { Leaderboard } from "@/components/leaderboard";
import type { User, Quest, UserProgress, Achievement } from "@shared/schema";

export default function Dashboard() {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [completedQuestData, setCompletedQuestData] = useState<{
    questId: string;
    score: number;
    xpGained: number;
    coinsGained: number;
  } | null>(null);

  const userId = "user-1"; // Default user for demo

  // Fetch user data
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user', userId],
  });

  // Fetch quests
  const { data: quests = [] } = useQuery<Quest[]>({
    queryKey: ['/api/quests'],
  });

  // Fetch user progress
  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: ['/api/user', userId, 'progress'],
  });

  // Fetch achievements
  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
  });

  // Fetch user achievements
  const { data: userAchievements = [] } = useQuery({
    queryKey: ['/api/user', userId, 'achievements'],
  });

  const openQuestModal = (questId: string) => {
    setSelectedQuestId(questId);
    setShowQuestModal(true);
  };

  const handleQuestComplete = (questId: string, score: number, xpGained: number, coinsGained: number) => {
    setCompletedQuestData({ questId, score, xpGained, coinsGained });
    setShowAchievementModal(true);
  };

  const getQuestProgress = (questId: string) => {
    const progress = userProgress.find(p => p.questId === questId);
    const quest = quests.find(q => q.id === questId);
    if (!progress || !quest) return { completed: 0, total: 1, percentage: 0 };
    
    const totalQuestions = Array.isArray(quest.questions) ? quest.questions.length : 0;
    const completedQuestions = progress.currentQuestion || 0;
    
    return {
      completed: completedQuestions,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0
    };
  };

  const getAchievementProgress = (achievementId: string) => {
    const userAchievement = Array.isArray(userAchievements) ? 
      userAchievements.find((ua: any) => ua.achievementId === achievementId) : 
      null;
    if (userAchievement) return 100;
    
    // Mock progress calculation based on category completion
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return 0;
    
    if (achievementId === 'golden-investor') return 85;
    if (achievementId === 'savings-sage') return 60;
    
    return 0;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your financial journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-full flex items-center justify-center relative">
              <img 
                src="/attached_assets/DRAGON_1_1753840736082_1753972723734_1753975794455.png" 
                alt="Auric - MoneyTree Mascot" 
                className="w-10 h-10 object-contain" 
              />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold">MoneyTree</h1>
              <p className="text-sm text-muted-foreground">Level up your finances</p>
            </div>
          </div>
          
          {/* User Stats */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-amber-500/20 px-3 py-1 rounded-full">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs text-black">💰</div>
              <span className="font-semibold">{user.coins}</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">🔥</span>
              </div>
              <span className="font-semibold">{user.streak}</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-black">{user.level}</span>
              </div>
              <span className="font-semibold">Level {user.level}</span>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">{user.displayName.charAt(0)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Auric Companion & Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            <AuricCompanion />
            <Leaderboard currentUserId={userId} />
          </div>

          {/* Right Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Message */}
            <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.displayName}!</h2>
                <p className="text-muted-foreground mb-4">
                  You're on a {user.streak}-day learning streak! Keep it going to unlock the Golden Investor badge.
                </p>
                <div className="flex items-center space-x-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium">
                    Continue Learning
                  </Button>
                  <div className="flex items-center space-x-2 text-amber-500">
                    <span>🔥</span>
                    <span className="font-semibold">{user.streak} day streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Challenge */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <span>Today's Challenge</span>
                    </h3>
                  </div>
                  
                  {quests.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{quests[0].title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{quests[0].description}</p>
                      <div className="text-sm text-muted-foreground mb-4">
                        {(() => {
                          const progress = getQuestProgress(quests[0].id);
                          return `${progress.completed}/${progress.total} questions completed`;
                        })()} 
                        <span className="text-amber-500 font-medium ml-2">+{quests[0].xpReward} XP</span>
                      </div>
                      <Progress value={getQuestProgress(quests[0].id).percentage} className="mb-4" />
                    </div>
                  )}

                  <Button 
                    onClick={() => quests.length > 0 && openQuestModal(quests[0].id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg"
                  >
                    Continue Challenge
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Quiz */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full"></div>
                      <span>Quick Quiz</span>
                    </h3>
                  </div>
                  
                  {quests.length > 1 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{quests[1].title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{quests[1].description}</p>
                      
                      {/* Sample Question Preview */}
                      <div className="bg-background/50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium mb-2">Quick preview question:</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border border-muted rounded-full"></div>
                            <span>Sample answer option...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => quests.length > 1 && openQuestModal(quests[1].id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg"
                  >
                    Start 5-Min Quiz
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
                      <span>Achievements</span>
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Complete lessons to unlock achievements!</p>
                  
                  {/* Achievement Progress */}
                  <div className="space-y-3">
                    {achievements.map((achievement) => {
                      const progress = getAchievementProgress(achievement.id);
                      const isCompleted = progress === 100;
                      
                      return (
                        <div 
                          key={achievement.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            isCompleted 
                              ? 'bg-primary/10 border-primary/20' 
                              : 'bg-muted/10 border-border'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-primary' : 'bg-muted'
                          }`}>
                            <span className={isCompleted ? 'text-primary-foreground' : 'text-muted-foreground'}>
                              {achievement.icon}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            {!isCompleted && (
                              <div className="w-full bg-background/50 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all" 
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                          <div className={`font-bold text-sm ${
                            isCompleted ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {isCompleted ? '✓' : `${progress}%`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Available Challenges */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Available Challenges</h3>
                  
                  <div className="space-y-3">
                    {quests.slice(2).map((quest) => (
                      <button
                        key={quest.id}
                        onClick={() => openQuestModal(quest.id)}
                        className="w-full text-left p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium group-hover:text-primary">{quest.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {Array.isArray(quest.questions) ? quest.questions.length : 0} questions • {quest.estimatedMinutes} min
                            </p>
                          </div>
                          <div className="text-primary">→</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Quest Modal */}
      <QuestModal
        isOpen={showQuestModal}
        onClose={() => setShowQuestModal(false)}
        questId={selectedQuestId}
        userId={userId}
        onComplete={handleQuestComplete}
      />

      {/* Achievement Modal */}
      {completedQuestData && (
        <AchievementModal
          isOpen={showAchievementModal}
          onClose={() => setShowAchievementModal(false)}
          questTitle={quests.find(q => q.id === completedQuestData.questId)?.title || 'Quest'}
          xpGained={completedQuestData.xpGained}
          coinsGained={completedQuestData.coinsGained}
          onNextQuest={() => {
            setShowAchievementModal(false);
            // Find next available quest
            const currentIndex = quests.findIndex(q => q.id === completedQuestData.questId);
            if (currentIndex >= 0 && currentIndex < quests.length - 1) {
              openQuestModal(quests[currentIndex + 1].id);
            }
          }}
        />
      )}
    </div>
  );
}
