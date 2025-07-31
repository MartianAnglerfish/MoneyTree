import { 
  type User, 
  type InsertUser, 
  type Quest,
  type InsertQuest,
  type UserProgress,
  type InsertUserProgress,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type AuricTip,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Quest methods
  getAllQuests(): Promise<Quest[]>;
  getQuest(id: string): Promise<Quest | undefined>;
  createQuest(quest: InsertQuest): Promise<Quest>;

  // User Progress methods
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserQuestProgress(userId: string, questId: string): Promise<UserProgress | undefined>;
  createOrUpdateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  completeQuest(userId: string, questId: string, score: number, timeSpent: number): Promise<UserProgress>;

  // Achievement methods
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]>;
  unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement>;

  // Auric Tips methods
  getRandomAuricTip(category?: string): Promise<AuricTip | undefined>;
  getAllAuricTips(): Promise<AuricTip[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quests: Map<string, Quest>;
  private userProgress: Map<string, UserProgress>;
  private achievements: Map<string, Achievement>;
  private userAchievements: Map<string, UserAchievement>;
  private auricTips: Map<string, AuricTip>;

  constructor() {
    this.users = new Map();
    this.quests = new Map();
    this.userProgress = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.auricTips = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: "user-1",
      username: "alex_johnson",
      displayName: "Alex Johnson",
      email: "alex@example.com",
      coins: 500,
      xp: 1250,
      level: 5,
      streak: 7,
      lastActiveDate: new Date(),
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Initialize sample quests
    this.initializeQuests();
    this.initializeAchievements();
    this.initializeAuricTips();
  }

  private initializeQuests() {
    const quests: Quest[] = [
      {
        id: "investment-fundamentals",
        title: "Investment Fundamentals",
        description: "Master the basics of investing and portfolio management",
        category: "investing",
        difficulty: 2,
        estimatedMinutes: 15,
        xpReward: 150,
        coinReward: 50,
        questions: [
          {
            id: 1,
            question: "Which investment option typically offers the highest potential returns but also comes with the highest risk?",
            options: [
              { id: "A", text: "Savings account with guaranteed interest", explanation: "Federally insured, typically 0.5-2% annual return" },
              { id: "B", text: "Individual growth stocks", explanation: "Can provide high returns but values can fluctuate significantly" },
              { id: "C", text: "Government treasury bonds", explanation: "Backed by government, stable but lower returns" },
              { id: "D", text: "Certificate of Deposit (CD)", explanation: "Fixed-term deposit with guaranteed return" }
            ],
            correctAnswer: "B",
            explanation: "Individual growth stocks offer the highest potential returns but also carry the most risk due to market volatility."
          },
          {
            id: 2,
            question: "What is diversification in investing?",
            options: [
              { id: "A", text: "Putting all money in one stock", explanation: "This actually increases risk" },
              { id: "B", text: "Spreading investments across different assets", explanation: "This reduces overall portfolio risk" },
              { id: "C", text: "Only investing in bonds", explanation: "This limits growth potential" },
              { id: "D", text: "Timing the market perfectly", explanation: "This is nearly impossible to do consistently" }
            ],
            correctAnswer: "B",
            explanation: "Diversification helps reduce risk by spreading investments across different asset classes, sectors, and securities."
          }
        ],
        educationalContent: [
          {
            id: 1,
            title: "Understanding Risk vs. Reward",
            content: "Before we dive into this question, let me explain a key investment principle: the relationship between risk and potential reward. Generally, the higher the potential return of an investment, the higher the risk involved.",
            imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            examples: {
              lowRisk: ["Savings accounts (0.5-2% return)", "Government bonds (2-4% return)", "CDs (1-3% return)"],
              highRisk: ["Individual stocks (variable)", "Growth mutual funds (6-12% potential)", "Real estate (variable)"]
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "emergency-fund-basics",
        title: "Emergency Fund Basics",
        description: "Learn the importance of emergency funds and how to build one",
        category: "savings",
        difficulty: 1,
        estimatedMinutes: 10,
        xpReward: 100,
        coinReward: 30,
        questions: [
          {
            id: 1,
            question: "What is the primary purpose of an emergency fund?",
            options: [
              { id: "A", text: "To restrict spending completely", explanation: "Emergency funds aren't about restricting spending" },
              { id: "B", text: "To cover unexpected expenses without debt", explanation: "This is the main purpose - financial security" },
              { id: "C", text: "To invest in stocks", explanation: "Emergency funds should be liquid and safe, not invested" },
              { id: "D", text: "To pay regular monthly bills", explanation: "This is what your regular budget is for" }
            ],
            correctAnswer: "B",
            explanation: "Emergency funds provide financial security by covering unexpected expenses like medical bills, car repairs, or job loss without going into debt."
          }
        ],
        educationalContent: [
          {
            id: 1,
            title: "Why Emergency Funds Matter",
            content: "An emergency fund is your financial safety net. It's money set aside specifically for unexpected expenses or financial emergencies.",
            imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            examples: {
              emergencies: ["Job loss", "Medical emergencies", "Major car repairs", "Home repairs"],
              amounts: ["3-6 months of expenses", "Start with $1,000", "Build gradually", "Keep in savings account"]
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "budgeting-mastery",
        title: "Budgeting Mastery",
        description: "Master the art of budgeting and expense tracking",
        category: "budgeting",
        difficulty: 2,
        estimatedMinutes: 18,
        xpReward: 120,
        coinReward: 40,
        questions: [
          {
            id: 1,
            question: "What is the 50/30/20 budgeting rule?",
            options: [
              { id: "A", text: "50% savings, 30% needs, 20% wants", explanation: "This would be very difficult for most people" },
              { id: "B", text: "50% needs, 30% wants, 20% savings", explanation: "This is the correct 50/30/20 rule" },
              { id: "C", text: "50% wants, 30% needs, 20% savings", explanation: "This prioritizes wants over needs incorrectly" },
              { id: "D", text: "Equal thirds for all categories", explanation: "This isn't the 50/30/20 rule" }
            ],
            correctAnswer: "B",
            explanation: "The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment."
          }
        ],
        educationalContent: [
          {
            id: 1,
            title: "Budgeting Fundamentals",
            content: "Budgeting is the foundation of financial wellness. It helps you understand where your money goes and ensures you're working toward your financial goals.",
            imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            examples: {
              needs: ["Housing", "Food", "Transportation", "Insurance"],
              wants: ["Entertainment", "Dining out", "Hobbies", "Subscriptions"]
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
      }
    ];

    quests.forEach(quest => this.quests.set(quest.id, quest));
  }

  private initializeAchievements() {
    const achievements: Achievement[] = [
      {
        id: "budget-master",
        title: "Budget Master",
        description: "Complete all budgeting lessons",
        icon: "🛡️",
        category: "budgeting",
        requirements: { type: "complete_category", category: "budgeting" },
        xpReward: 100,
        coinReward: 50,
        isActive: true,
      },
      {
        id: "golden-investor",
        title: "Golden Investor",
        description: "7-day streak & investment mastery",
        icon: "👑",
        category: "investing",
        requirements: { type: "streak_and_category", streak: 7, category: "investing" },
        xpReward: 200,
        coinReward: 100,
        isActive: true,
      },
      {
        id: "savings-sage",
        title: "Savings Sage",
        description: "Master emergency funds & savings",
        icon: "💎",
        category: "savings",
        requirements: { type: "complete_category", category: "savings" },
        xpReward: 150,
        coinReward: 75,
        isActive: true,
      }
    ];

    achievements.forEach(achievement => this.achievements.set(achievement.id, achievement));
  }

  private initializeAuricTips() {
    const tips: AuricTip[] = [
      {
        id: "tip-1",
        content: "Welcome to MoneyTree! I'm Auric, your financial wisdom dragon. Let's build your treasure of knowledge together and watch your wealth grow like golden scales on my back! 🐲✨",
        category: "welcome",
        context: "first_visit",
        isActive: true,
      },
      {
        id: "tip-2",
        content: "Fantastic work! You're building your financial wisdom like a true treasure hoarder! 🐲✨ Keep it up!",
        category: "motivational",
        context: "quest_complete",
        isActive: true,
      },
      {
        id: "tip-3",
        content: "Take your time thinking about this one! Remember, higher potential rewards often come with higher risks. What do you think offers the most growth potential?",
        category: "educational",
        context: "investment_question",
        isActive: true,
      },
      {
        id: "tip-4",
        content: "Remember, building wealth is like growing my golden scales - it takes time, patience, and consistent effort. Every lesson you complete adds to your treasure! 💰",
        category: "motivational",
        context: "daily_encouragement",
        isActive: true,
      }
    ];

    tips.forEach(tip => this.auricTips.set(tip.id, tip));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      coins: 0,
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date(),
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Quest methods
  async getAllQuests(): Promise<Quest[]> {
    return Array.from(this.quests.values()).filter(quest => quest.isActive);
  }

  async getQuest(id: string): Promise<Quest | undefined> {
    return this.quests.get(id);
  }

  async createQuest(insertQuest: InsertQuest): Promise<Quest> {
    const id = randomUUID();
    const quest: Quest = { 
      ...insertQuest, 
      id,
      createdAt: new Date(),
    };
    this.quests.set(id, quest);
    return quest;
  }

  // User Progress methods
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserQuestProgress(userId: string, questId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.questId === questId
    );
  }

  async createOrUpdateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const existing = await this.getUserQuestProgress(insertProgress.userId, insertProgress.questId);
    
    if (existing) {
      const updated = { ...existing, ...insertProgress };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const progress: UserProgress = { 
        ...insertProgress, 
        id,
        startedAt: new Date(),
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }

  async completeQuest(userId: string, questId: string, score: number, timeSpent: number): Promise<UserProgress> {
    const progress = await this.createOrUpdateUserProgress({
      userId,
      questId,
      isCompleted: true,
      score,
      timeSpent,
      completedAt: new Date(),
    });

    // Update user XP and coins
    const quest = this.quests.get(questId);
    if (quest) {
      const user = this.users.get(userId);
      if (user) {
        await this.updateUser(userId, {
          xp: user.xp + quest.xpReward,
          coins: user.coins + quest.coinReward,
          level: Math.floor((user.xp + quest.xpReward) / 250) + 1,
        });
      }
    }

    return progress;
  }

  // Achievement methods
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.isActive);
  }

  async getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const userAchievements = Array.from(this.userAchievements.values()).filter(ua => ua.userId === userId);
    return userAchievements.map(ua => ({
      ...ua,
      achievement: this.achievements.get(ua.achievementId)!
    }));
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement> {
    const id = randomUUID();
    const userAchievement: UserAchievement = {
      id,
      userId,
      achievementId,
      unlockedAt: new Date(),
    };
    this.userAchievements.set(id, userAchievement);

    // Award achievement rewards
    const achievement = this.achievements.get(achievementId);
    if (achievement) {
      const user = this.users.get(userId);
      if (user) {
        await this.updateUser(userId, {
          xp: user.xp + achievement.xpReward,
          coins: user.coins + achievement.coinReward,
        });
      }
    }

    return userAchievement;
  }

  // Auric Tips methods
  async getRandomAuricTip(category?: string): Promise<AuricTip | undefined> {
    const tips = Array.from(this.auricTips.values()).filter(tip => 
      tip.isActive && (!category || tip.category === category)
    );
    
    if (tips.length === 0) return undefined;
    
    return tips[Math.floor(Math.random() * tips.length)];
  }

  async getAllAuricTips(): Promise<AuricTip[]> {
    return Array.from(this.auricTips.values()).filter(tip => tip.isActive);
  }
}

export const storage = new MemStorage();
