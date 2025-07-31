export interface QuestionOption {
  id: string;
  text: string;
  explanation: string;
}

export interface QuestionData {
  id: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  auricHint: string;
}

export interface EducationalSection {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  auricComment?: string;
  keyPoints?: string[];
  examples?: Record<string, string[]>;
}

export interface QuestData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedMinutes: number;
  xpReward: number;
  coinReward: number;
  questions: QuestionData[];
  educationalSections: EducationalSection[];
}

export const questDatabase: Record<string, QuestData> = {
  'investment-fundamentals': {
    id: 'investment-fundamentals',
    title: 'Investment Fundamentals Quest',
    description: 'Master the basics of investing and portfolio management',
    category: 'investing',
    difficulty: 2,
    estimatedMinutes: 20,
    xpReward: 150,
    coinReward: 50,
    questions: [
      {
        id: 1,
        question: "What is compound interest?",
        options: [
          { id: "A", text: "Interest paid only on the principal amount", explanation: "This describes simple interest, not compound interest" },
          { id: "B", text: "Interest earned on both principal and previously earned interest", explanation: "This is the correct definition of compound interest" },
          { id: "C", text: "Interest that compounds daily", explanation: "While it can compound daily, this doesn't define what compound interest is" },
          { id: "D", text: "Interest paid by banks on savings accounts", explanation: "This is too narrow - compound interest applies to many investments" }
        ],
        correctAnswer: "B",
        explanation: "Compound interest is the interest earned on both the initial principal and the accumulated interest from previous periods. This creates exponential growth over time.",
        auricHint: "Think of it like a dragon's hoard that keeps growing - not just from new treasure you add, but the existing treasure magically creates more treasure! The longer you wait, the more powerful the magic becomes! 🐲✨💰"
      },
      {
        id: 2,
        question: "What is diversification in investing?",
        options: [
          { id: "A", text: "Putting all your money in one stock", explanation: "This is the opposite of diversification - it's concentration risk" },
          { id: "B", text: "Spreading investments across different assets to reduce risk", explanation: "This is exactly what diversification means" },
          { id: "C", text: "Only investing in bonds", explanation: "This is limiting yourself to one asset class, not diversifying" },
          { id: "D", text: "Buying and selling stocks frequently", explanation: "This describes active trading, not diversification" }
        ],
        correctAnswer: "B",
        explanation: "Diversification means spreading your investments across different types of assets, sectors, and geographies to reduce the impact of any single investment's poor performance.",
        auricHint: "Don't put all your treasure eggs in one basket! A wise dragon spreads their hoard across different caves, different types of treasure, and different kingdoms. If one cave gets raided, you still have treasure elsewhere! 🐲🏰💎"
      },
      {
        id: 3,
        question: "What is the relationship between risk and return in investing?",
        options: [
          { id: "A", text: "Higher risk always guarantees higher returns", explanation: "Risk doesn't guarantee returns - it just creates the possibility" },
          { id: "B", text: "Lower risk investments typically offer higher potential returns", explanation: "This is backwards - typically lower risk means lower potential returns" },
          { id: "C", text: "Higher risk investments typically offer higher potential returns", explanation: "This is the fundamental risk-return relationship in investing" },
          { id: "D", text: "Risk and return are completely unrelated", explanation: "Risk and return are closely related in investing" }
        ],
        correctAnswer: "C",
        explanation: "Generally, investments with higher risk offer the potential for higher returns to compensate investors for taking on that additional risk.",
        auricHint: "The most dangerous dragon quests offer the greatest treasure rewards! But remember - higher risk means you might lose treasure too. Choose your adventures wisely based on your dragon courage! ⚔️🐲💰"
      },
      {
        id: 4,
        question: "What is dollar-cost averaging?",
        options: [
          { id: "A", text: "Investing the same amount of money at regular intervals", explanation: "This is the correct definition of dollar-cost averaging" },
          { id: "B", text: "Trying to time the market perfectly", explanation: "This is the opposite of dollar-cost averaging" },
          { id: "C", text: "Investing only when prices are low", explanation: "Dollar-cost averaging involves regular investing regardless of price" },
          { id: "D", text: "Averaging the cost of different stocks", explanation: "This doesn't describe dollar-cost averaging" }
        ],
        correctAnswer: "A",
        explanation: "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions.",
        auricHint: "It's like adding the same amount of gold to your hoard every month, whether treasure is expensive or cheap! Sometimes you'll get less treasure, sometimes more, but over time it averages out nicely! 🐲📅💰"
      },
      {
        id: 5,
        question: "What is a stock market index?",
        options: [
          { id: "A", text: "A single company's stock price", explanation: "An index tracks multiple companies, not just one" },
          { id: "B", text: "A measure of how a group of stocks is performing", explanation: "This correctly describes what a stock market index is" },
          { id: "C", text: "The total value of all stocks", explanation: "While related, this is too broad - indices track specific groups" },
          { id: "D", text: "A prediction of future stock prices", explanation: "Indices track current performance, not predict future prices" }
        ],
        correctAnswer: "B",
        explanation: "A stock market index is a measurement of the performance of a group of stocks, representing a particular market or sector.",
        auricHint: "Think of it like a dragon leaderboard that tracks how well a group of treasure collectors are doing! The S&P 500, for example, tracks the 500 most successful treasure-hoarding companies! 🐲📊🏆"
      },
      {
        id: 6,
        question: "What is the main advantage of index fund investing?",
        options: [
          { id: "A", text: "Guaranteed high returns", explanation: "No investment guarantees high returns" },
          { id: "B", text: "Low fees and broad diversification", explanation: "This captures the main benefits of index fund investing" },
          { id: "C", text: "Ability to beat the market consistently", explanation: "Index funds track the market, they don't try to beat it" },
          { id: "D", text: "No risk of losing money", explanation: "All investments carry some risk of loss" }
        ],
        correctAnswer: "B",
        explanation: "Index funds offer low management fees and instant diversification across many stocks, making them an efficient way to invest in the overall market.",
        auricHint: "Index funds are like hiring a dragon who collects a little bit of treasure from every successful kingdom - you get diversity without having to personally visit each kingdom! And the fees are much lower than hiring individual treasure hunters! 🐲🌍💰"
      },
      {
        id: 7,
        question: "What is asset allocation?",
        options: [
          { id: "A", text: "Buying only growth stocks", explanation: "This is a specific investment choice, not asset allocation" },
          { id: "B", text: "How you divide your investments among different asset classes", explanation: "This is exactly what asset allocation means" },
          { id: "C", text: "Timing when to buy and sell investments", explanation: "This describes market timing, not asset allocation" },
          { id: "D", text: "Choosing which broker to use", explanation: "This is about choosing a platform, not allocating assets" }
        ],
        correctAnswer: "B",
        explanation: "Asset allocation is the strategy of dividing your investments among different asset classes like stocks, bonds, and cash to balance risk and reward.",
        auricHint: "It's like deciding how to organize your treasure hoard - how much in shiny gold coins (stocks), how much in stable silver (bonds), and how much in easily accessible gems (cash)! The right mix depends on your dragon goals and risk tolerance! 🐲⚖️💎"
      },
      {
        id: 8,
        question: "What is the time horizon's role in investment strategy?",
        options: [
          { id: "A", text: "It doesn't affect investment choices", explanation: "Time horizon is crucial in determining investment strategy" },
          { id: "B", text: "Longer time horizons typically allow for more aggressive investments", explanation: "This correctly explains how time horizon affects investment strategy" },
          { id: "C", text: "Shorter time horizons allow for riskier investments", explanation: "This is backwards - shorter horizons usually require more conservative approaches" },
          { id: "D", text: "Time horizon only matters for retirement accounts", explanation: "Time horizon is important for all types of investments" }
        ],
        correctAnswer: "B",
        explanation: "Longer investment time horizons typically allow investors to take on more risk because they have more time to recover from short-term market downturns.",
        auricHint: "If you're planning to use your treasure in a few months, keep it safe and accessible! But if you won't need it for decades, you can risk it on more dangerous but potentially rewarding dragon quests! Time is a powerful ally in treasure-building adventures! 🐲⏰⚔️"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "The Magic of Compound Interest",
        content: "Albert Einstein allegedly called compound interest 'the eighth wonder of the world.' Whether he said it or not, compound interest is indeed a powerful force in wealth building. When you earn interest on your initial investment plus all the interest that has been added to it, your money grows exponentially over time.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Compound interest is like dragon magic - it makes your treasure grow by itself! The longer you leave your treasure untouched, the more powerful the magic becomes. Even small amounts can become mighty hoards with enough time! 🐲✨💰",
        examples: {
          "Power of Time": ["$1,000 at 7% for 10 years = $1,967", "$1,000 at 7% for 20 years = $3,870", "$1,000 at 7% for 30 years = $7,612"],
          "Power of Rate": ["$1,000 at 5% for 30 years = $4,322", "$1,000 at 7% for 30 years = $7,612", "$1,000 at 10% for 30 years = $17,449"]
        }
      },
      {
        id: 2,
        title: "Diversification: Don't Put All Your Eggs in One Basket",
        content: "Diversification is one of the most important concepts in investing. By spreading your investments across different asset classes, sectors, and geographies, you reduce the risk that a single event will significantly impact your entire portfolio.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "A wise dragon never keeps all their treasure in one cave! Spread your hoard across different locations and different types of treasure. If pirates raid one cave, you'll still have treasure safe in the others! 🐲🏰💎",
        keyPoints: [
          "Reduces overall portfolio risk without necessarily reducing returns",
          "Can be achieved through asset classes (stocks, bonds, real estate)",
          "Geographic diversification protects against country-specific risks",
          "Sector diversification protects against industry-specific downturns",
          "Index funds provide instant diversification in a single purchase"
        ]
      },
      {
        id: 3,
        title: "Understanding Risk vs. Return",
        content: "All investments involve some level of risk, but understanding the relationship between risk and potential return is crucial for making informed decisions. Generally, investments with higher potential returns come with higher risk of loss.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "In the dragon world, the most dangerous quests offer the greatest treasure rewards! But remember - with great potential treasure comes great potential danger. Choose your adventures based on your risk tolerance and goals! ⚔️🐲💰",
        examples: {
          "Low Risk, Low Return": ["Savings accounts", "CDs", "Government bonds"],
          "Medium Risk, Medium Return": ["Corporate bonds", "Dividend stocks", "REITs"],
          "High Risk, High Potential Return": ["Growth stocks", "Small-cap stocks", "Cryptocurrency"]
        }
      }
    ]
  },
  'emergency-fund-basics': {
    id: 'emergency-fund-basics',
    title: 'Emergency Fund Basics Quiz',
    description: 'Learn the importance of emergency funds and how to build one',
    category: 'savings',
    difficulty: 1, 
    estimatedMinutes: 12,
    xpReward: 100,
    coinReward: 30,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of an emergency fund?",
        options: [
          { id: "A", text: "To invest in high-risk opportunities", explanation: "Emergency funds should be safe and accessible, not risky" },
          { id: "B", text: "To cover unexpected expenses without going into debt", explanation: "This is exactly why emergency funds are essential" },
          { id: "C", text: "To maximize investment returns", explanation: "Emergency funds prioritize safety and access over returns" },
          { id: "D", text: "To pay for planned vacations", explanation: "Vacations are planned expenses, not emergencies" }
        ],
        correctAnswer: "B",
        explanation: "Emergency funds provide a financial safety net for unexpected expenses like medical bills, car repairs, or job loss, helping you avoid debt.",
        auricHint: "Think of your emergency fund as your dragon armor! It protects you from unexpected attacks on your treasure hoard. Without it, surprise expenses can force you into dangerous debt dungeons! 🛡️🐲"
      },
      {
        id: 2,
        question: "How much should you ideally have in an emergency fund?",
        options: [
          { id: "A", text: "1 month of expenses", explanation: "This is a good start but not quite enough for most situations" },
          { id: "B", text: "3-6 months of expenses", explanation: "This is the standard recommendation for most people" },
          { id: "C", text: "12 months of expenses", explanation: "While not wrong, this is more than most people need" },
          { id: "D", text: "$1,000 maximum", explanation: "This might not be enough depending on your monthly expenses" }
        ],
        correctAnswer: "B",
        explanation: "Most financial experts recommend saving 3-6 months of living expenses in an emergency fund to cover most unexpected situations.",
        auricHint: "Imagine if a bigger dragon challenged you and you couldn't hunt for treasure for several months! You'd need enough stored treasure to survive. 3-6 months of living costs is usually enough to weather most storms! 🐲⛈️💰"
      },
      {
        id: 3,
        question: "Where should you keep your emergency fund?",
        options: [
          { id: "A", text: "In a high-yield savings account", explanation: "This provides safety, accessibility, and modest growth" },
          { id: "B", text: "Invested in stocks", explanation: "Stocks are too volatile for emergency funds" },
          { id: "C", text: "In a retirement account", explanation: "Retirement accounts have penalties for early withdrawal" },
          { id: "D", text: "Under your mattress", explanation: "This doesn't protect against inflation and isn't safe" }
        ],
        correctAnswer: "A",
        explanation: "High-yield savings accounts offer the best combination of safety, accessibility, and modest growth for emergency funds.",
        auricHint: "Keep your emergency treasure somewhere safe but easy to grab quickly! A high-yield savings account is like a secure but accessible treasure chest that even grows a little bit while you're not looking! 🏦💰✨"
      },
      {
        id: 4,
        question: "When should you use your emergency fund?",
        options: [
          { id: "A", text: "For a great deal on a new TV", explanation: "This is a want, not an emergency" },
          { id: "B", text: "For unexpected medical expenses", explanation: "Medical emergencies are exactly what the fund is for" },
          { id: "C", text: "For a dream vacation opportunity", explanation: "Vacations should be planned and saved for separately" },
          { id: "D", text: "To invest in a hot stock tip", explanation: "Investment opportunities are not emergencies" }
        ],
        correctAnswer: "B",
        explanation: "Emergency funds should only be used for true emergencies like medical expenses, major car repairs, or job loss.",
        auricHint: "Only break the emergency treasure seal for real dragon emergencies! Medical bills, job loss, or your cave collapsing - these are true emergencies. Don't raid it for shiny trinkets! 💰⚠️🐲"
      },
      {
        id: 5,
        question: "Should you build an emergency fund before paying off debt?",
        options: [
          { id: "A", text: "Yes, always build the full 6-month fund first", explanation: "This isn't always the best strategy with high-interest debt" },
          { id: "B", text: "No, always pay off debt first", explanation: "Without any emergency fund, you might create more debt" },
          { id: "C", text: "Build a small starter fund ($1,000), then focus on high-interest debt", explanation: "This balanced approach protects you while tackling expensive debt" },
          { id: "D", text: "It doesn't matter which order", explanation: "The order can significantly impact your financial progress" }
        ],
        correctAnswer: "C",
        explanation: "Most experts recommend building a small emergency fund first ($1,000) to prevent new debt, then focusing on high-interest debt before building a larger emergency fund.",
        auricHint: "It's like having a small shield while you fight the debt dragons! A little protection prevents you from getting wounded (new debt) while you battle the expensive debt monsters first! ⚔️🛡️🐲"
      },
      {
        id: 6,
        question: "Which of these is NOT typically considered an emergency?",
        options: [
          { id: "A", text: "Job loss", explanation: "Losing your income is definitely an emergency" },
          { id: "B", text: "Major car repair", explanation: "Unexpected car repairs are legitimate emergencies" },
          { id: "C", text: "Annual property taxes", explanation: "These are predictable and should be budgeted for annually" },
          { id: "D", text: "Emergency room visit", explanation: "Unexpected medical expenses are true emergencies" }
        ],
        correctAnswer: "C",
        explanation: "Annual property taxes are predictable expenses that should be planned for in your regular budget, not covered by emergency funds.",
        auricHint: "Property taxes come every year like clockwork - that's not a surprise dragon attack, that's a scheduled treasure payment! Plan for it! 📅💰"
      },
      {
        id: 7,
        question: "What's a good first step if you don't have any emergency savings?",
        options: [
          { id: "A", text: "Wait until you have more income", explanation: "Starting small is better than not starting at all" },
          { id: "B", text: "Save $1,000 as quickly as possible", explanation: "This creates a starter emergency fund for most common emergencies" },
          { id: "C", text: "Focus only on paying off debt first", explanation: "Having some emergency savings prevents new debt" },
          { id: "D", text: "Invest in stocks instead", explanation: "Stocks are too risky for emergency money" }
        ],
        correctAnswer: "B",
        explanation: "A starter emergency fund of $1,000 can cover many common emergencies and prevent you from going into debt.",
        auricHint: "Every great treasure hoard starts with a single gold coin! Start with 1,000 pieces of treasure - it's enough to handle most small dragon attacks! 🐲🏆"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "Why Emergency Funds Matter",
        content: "Life is full of unexpected expenses. Your car breaks down, you have a medical emergency, or you lose your job. An emergency fund is your financial safety net that helps you handle these situations without going into debt or derailing your long-term financial goals.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Think of your emergency fund as your financial armor! Just like how I keep some treasure hidden away for when other dragons challenge me, you need treasure set aside for life's unexpected battles! 🛡️🐲",
        examples: {
          "Common Emergencies": ["Job loss", "Medical emergencies", "Major car repairs", "Home repairs", "Family emergencies"],
          "Why It Matters": ["Prevents debt", "Reduces stress", "Maintains financial stability", "Protects other goals"]
        }
      },
      {
        id: 2,
        title: "Building Your Emergency Fund",
        content: "Building an emergency fund doesn't happen overnight, but every dollar you save brings you closer to financial security. Start small and build gradually - even $25-50 per month adds up over time.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Building an emergency fund is like growing a dragon's hoard - start with small treasures and keep adding to it! Before you know it, you'll have a mighty treasure pile! 💰📈",
        keyPoints: [
          "Start with a goal of $1,000",
          "Save consistently, even small amounts",
          "Keep it in a separate, easily accessible account",
          "Gradually build to 3-6 months of expenses",
          "Don't invest emergency funds - keep them safe!"
        ]
      }
    ]
  },
  'budgeting-mastery': {
    id: 'budgeting-mastery',
    title: 'Budgeting Mastery',
    description: 'Master the art of budgeting and expense tracking',
    category: 'budgeting',
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
        explanation: "The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
        auricHint: "Think of it like organizing treasure - first secure the necessities, then enjoy some luxuries, and always save for future adventures! 🐲💰"
      },
      {
        id: 2,
        question: "What should be your first priority when creating a budget?",
        options: [
          { id: "A", text: "Entertainment expenses", explanation: "While important, this shouldn't be your first priority" },
          { id: "B", text: "Essential needs like housing and food", explanation: "This is correct - needs come first in budgeting" },
          { id: "C", text: "Luxury purchases", explanation: "These should come after needs and savings" },
          { id: "D", text: "Vacation fund", explanation: "This is a want, not a priority" }
        ],
        correctAnswer: "B",
        explanation: "Essential needs like housing, food, utilities, and transportation should always be your first budget priority.",
        auricHint: "Just like a dragon needs a secure cave before collecting treasure, you need to secure your basic needs first! 🏠🐲"
      },
      {
        id: 3,
        question: "How often should you review and adjust your budget?",
        options: [
          { id: "A", text: "Once a year", explanation: "This is too infrequent for effective budgeting" },
          { id: "B", text: "Monthly", explanation: "This is the ideal frequency for budget reviews" },
          { id: "C", text: "Only when you overspend", explanation: "Reactive budgeting is less effective than proactive" },
          { id: "D", text: "Never, once it's set", explanation: "Budgets need regular adjustments as life changes" }
        ],
        correctAnswer: "B",
        explanation: "Monthly budget reviews allow you to track progress, identify issues, and make necessary adjustments.",
        auricHint: "Even dragons need to check their treasure hoards regularly to make sure everything is in order! 📊✨"
      },
      {
        id: 4,
        question: "What is zero-based budgeting?",
        options: [
          { id: "A", text: "Having zero money left over", explanation: "Close, but not quite the definition" },
          { id: "B", text: "Assigning every dollar a purpose until income minus expenses equals zero", explanation: "This is exactly what zero-based budgeting means" },
          { id: "C", text: "Starting with no budget at all", explanation: "This is not what zero-based budgeting means" },
          { id: "D", text: "Spending everything you earn", explanation: "This would leave no room for savings" }
        ],
        correctAnswer: "B",
        explanation: "Zero-based budgeting means every dollar of income is allocated to expenses, savings, or debt payments until the budget balances to zero.",
        auricHint: "It's like making sure every gold coin in your hoard has a specific purpose - none just sitting around doing nothing! 💰🎯"
      },
      {
        id: 5,
        question: "What is lifestyle inflation?",
        options: [
          { id: "A", text: "When the cost of living increases", explanation: "This is general inflation, not lifestyle inflation" },
          { id: "B", text: "When you increase spending as your income rises", explanation: "This is exactly what lifestyle inflation means" },
          { id: "C", text: "When you buy more expensive groceries", explanation: "This is just one small example, not the full concept" },
          { id: "D", text: "When your rent goes up", explanation: "This is a cost increase, not lifestyle inflation" }
        ],
        correctAnswer: "B",
        explanation: "Lifestyle inflation occurs when you increase your spending proportionally (or more) as your income increases, preventing wealth building.",
        auricHint: "It's like getting more treasure but immediately needing a bigger, fancier cave - you never actually get richer! 🏰💸"
      },
      {
        id: 6,
        question: "What percentage of income should ideally go to housing costs?",
        options: [
          { id: "A", text: "No more than 25%", explanation: "This is quite conservative but good for aggressive savers" },
          { id: "B", text: "No more than 30%", explanation: "This is the commonly recommended maximum" },
          { id: "C", text: "50% or more is fine", explanation: "This would leave little room for other expenses and savings" },
          { id: "D", text: "Whatever you can afford", explanation: "This lacks specific guidance for healthy budgeting" }
        ],
        correctAnswer: "B",
        explanation: "Financial experts typically recommend spending no more than 30% of gross income on housing to maintain a balanced budget.",
        auricHint: "Your cave (housing) should be comfortable but not so expensive that you can't save treasure for other adventures! 🏠💰"
      },
      {
        id: 7,
        question: "What is the envelope budgeting method?",
        options: [
          { id: "A", text: "Mailing your bills in envelopes", explanation: "This has nothing to do with the envelope method" },
          { id: "B", text: "Allocating cash to different spending categories in separate envelopes", explanation: "This is exactly what envelope budgeting is" },
          { id: "C", text: "Saving money in bank envelopes", explanation: "This is not the envelope budgeting method" },
          { id: "D", text: "Budgeting once per month", explanation: "This describes frequency, not the envelope method" }
        ],
        correctAnswer: "B",
        explanation: "Envelope budgeting involves allocating cash for different spending categories into physical envelopes to control spending.",
        auricHint: "It's like having separate treasure chests for different purposes - once a chest is empty, no more spending in that category! 💰📦"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "Budgeting Fundamentals",
        content: "Budgeting is the foundation of financial wellness. It helps you understand where your money goes and ensures you're working toward your financial goals. A good budget acts as your financial roadmap, guiding every spending decision.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Think of budgeting like organizing a treasure hoard - you need to know what you have, where it goes, and how to make it grow! 🐲💰",
        examples: {
          "Needs (50%)": ["Housing", "Food", "Transportation", "Insurance", "Minimum debt payments"],
          "Wants (30%)": ["Entertainment", "Dining out", "Hobbies", "Subscriptions", "Shopping"],
          "Savings & Debt (20%)": ["Emergency fund", "Retirement", "Extra debt payments", "Investment accounts"]
        }
      },
      {
        id: 2,
        title: "Different Budgeting Methods",
        content: "There are several effective budgeting approaches. The key is finding one that fits your personality and financial situation. Some people prefer detailed tracking, while others need simpler systems.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Just like dragons have different ways to organize their hoards, humans have different budgeting styles. Find what works for your treasure management! 📊✨",
        examples: {
          "Zero-Based Budget": ["Every dollar has a job", "Income - expenses = 0", "Most detailed method"],
          "50/30/20 Rule": ["Simple percentage-based", "Good for beginners", "Easy to remember"],
          "Envelope Method": ["Cash-based system", "Physical spending limits", "Great for overspenders"],
          "Pay Yourself First": ["Save before spending", "Automated approach", "Focus on goals"]
        }
      }
    ]
  },
  'debt-management': {
    id: 'debt-management',
    title: 'Debt Management Strategies',
    description: 'Learn effective strategies to pay off debt and avoid financial traps',
    category: 'debt',
    difficulty: 3,
    estimatedMinutes: 25,
    xpReward: 180,
    coinReward: 60,
    questions: [
      {
        id: 1,
        question: "What is the debt snowball method?",
        options: [
          { id: "A", text: "Paying off debts with the highest interest rates first", explanation: "This describes the debt avalanche method" },
          { id: "B", text: "Paying off debts from smallest to largest balance", explanation: "This is the correct definition of debt snowball" },
          { id: "C", text: "Making only minimum payments on all debts", explanation: "This won't help you pay off debt faster" },
          { id: "D", text: "Consolidating all debts into one payment", explanation: "This is debt consolidation, not the snowball method" }
        ],
        correctAnswer: "B",
        explanation: "The debt snowball method focuses on paying off the smallest debt first to build momentum and psychological wins.",
        auricHint: "Like rolling a snowball down a hill, you start small but gain momentum and power as you go! Each victory makes you stronger! ❄️🐲"
      },
      {
        id: 2,
        question: "What is the debt avalanche method?",
        options: [
          { id: "A", text: "Paying off debts from smallest to largest balance", explanation: "This describes the debt snowball method" },
          { id: "B", text: "Paying off debts with the highest interest rates first", explanation: "This is the correct definition of debt avalanche" },
          { id: "C", text: "Paying off all debts equally", explanation: "This is less efficient than targeting specific debts" },
          { id: "D", text: "Ignoring debt payments", explanation: "This would only make debt problems worse" }
        ],
        correctAnswer: "B",
        explanation: "The debt avalanche method prioritizes paying off high-interest debt first to minimize total interest paid over time.",
        auricHint: "Like an avalanche crushing the biggest threats first, this method destroys the most expensive debts that steal your treasure! 🏔️⚔️"
      },
      {
        id: 3,
        question: "What is a good debt-to-income ratio?",
        options: [
          { id: "A", text: "Less than 20%", explanation: "This is excellent but may not be realistic for everyone" },
          { id: "B", text: "Less than 36%", explanation: "This is considered a healthy debt-to-income ratio" },
          { id: "C", text: "50% or higher is fine", explanation: "This is too high and indicates potential financial stress" },
          { id: "D", text: "There's no ideal ratio", explanation: "There are definitely guidelines for healthy debt levels" }
        ],
        correctAnswer: "B",
        explanation: "Financial experts recommend keeping your total debt payments below 36% of your gross monthly income.",
        auricHint: "Your debt should never be a dragon bigger than your treasure-earning ability! Keep it manageable. 🐲⚖️"
      },
      {
        id: 4,
        question: "What should you do first when facing overwhelming debt?",
        options: [
          { id: "A", text: "Ignore it and hope it goes away", explanation: "This will only make the problem worse" },
          { id: "B", text: "List all debts and create a payment plan", explanation: "This is the right first step - know what you're dealing with" },
          { id: "C", text: "Take out more loans to pay existing debts", explanation: "This usually creates more problems" },
          { id: "D", text: "Stop making all payments", explanation: "This will damage your credit and create more problems" }
        ],
        correctAnswer: "B",
        explanation: "The first step in debt management is understanding exactly what you owe and creating a strategic plan to address it.",
        auricHint: "Even when facing multiple enemy dragons, a wise warrior first counts them all and plans the battle strategy! 🐲⚔️📋"
      },
      {
        id: 5,
        question: "What is debt consolidation?",
        options: [
          { id: "A", text: "Paying off debt faster", explanation: "This is a benefit but not the definition" },
          { id: "B", text: "Combining multiple debts into one loan", explanation: "This is exactly what debt consolidation means" },
          { id: "C", text: "Declaring bankruptcy", explanation: "This is a different financial strategy" },
          { id: "D", text: "Negotiating lower payments", explanation: "This might be part of it but not the main definition" }
        ],
        correctAnswer: "B",
        explanation: "Debt consolidation involves combining multiple debts into a single loan, often with better terms or lower interest rates.",
        auricHint: "It's like gathering scattered treasure pieces into one big, organized hoard - easier to manage and protect! 💰🔄"
      },
      {
        id: 6,
        question: "What is the minimum payment trap?",
        options: [
          { id: "A", text: "Making only minimum payments keeps you in debt longer", explanation: "This is exactly what the minimum payment trap is" },
          { id: "B", text: "Minimum payments are always enough", explanation: "This is false - minimums keep you in debt" },
          { id: "C", text: "You can't make less than minimum payments", explanation: "This is about payment amounts, not the trap concept" },
          { id: "D", text: "Minimum payments save money", explanation: "Actually, they cost more in the long run" }
        ],
        correctAnswer: "A",
        explanation: "Making only minimum payments means most of your payment goes to interest, keeping you in debt for decades.",
        auricHint: "It's like trying to fill a treasure chest with a hole in the bottom - the gold keeps leaking out as interest! 🕳️💰"
      },
      {
        id: 7,
        question: "What is credit utilization?",
        options: [
          { id: "A", text: "How often you use your credit cards", explanation: "This is about frequency, not utilization ratio" },
          { id: "B", text: "The percentage of available credit you're using", explanation: "This is the correct definition of credit utilization" },
          { id: "C", text: "Your credit score", explanation: "Credit utilization affects your score but isn't the score itself" },
          { id: "D", text: "The number of credit cards you have", explanation: "This is about quantity, not utilization" }
        ],
        correctAnswer: "B",
        explanation: "Credit utilization is the percentage of your available credit that you're currently using, which affects your credit score.",
        auricHint: "Think of it like how full your treasure chest is compared to its total capacity - you want to keep some room available! 📦💰"
      },
      {
        id: 8,
        question: "What credit utilization ratio is recommended for good credit scores?",
        options: [
          { id: "A", text: "Under 30%", explanation: "This is good, but there's an even better target" },
          { id: "B", text: "Under 10%", explanation: "This is the optimal range for the best credit scores" },
          { id: "C", text: "50% is fine", explanation: "This is too high and will hurt your credit score" },
          { id: "D", text: "It doesn't matter", explanation: "Credit utilization significantly impacts your credit score" }
        ],
        correctAnswer: "B",
        explanation: "Keeping credit utilization under 10% typically results in the highest credit scores, though under 30% is still considered good.",
        auricHint: "Keep your treasure chest mostly empty of debt - the less you use of your available space, the more the credit wizards trust you! ✨🏆"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "Understanding Different Types of Debt",
        content: "Not all debt is created equal. Some debt can actually help build wealth (good debt), while other debt drains your finances (bad debt). Understanding the difference is crucial for financial health.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Some debts are like investing in better treasure-hunting equipment - they help you earn more gold! Others are like cursed trinkets that drain your hoard. Choose wisely! 🐲⚖️",
        examples: {
          "Good Debt (Can Build Wealth)": ["Mortgages (real estate)", "Student loans (education)", "Business loans (income generation)", "Investment property loans"],
          "Bad Debt (Costs Money)": ["Credit card debt", "Auto loans (depreciating asset)", "Personal loans for consumption", "Payday loans"],
          "Interest Rates": ["Good debt: typically 3-7%", "Bad debt: often 15-25%+", "Emergency debt: 200-400%+ (payday loans)"]
        }
      },
      {
        id: 2,
        title: "Debt Payoff Strategies Compared",
        content: "There are two main approaches to paying off debt: the debt snowball (smallest balance first) and debt avalanche (highest interest first). Both work, but they appeal to different personalities and situations.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Whether you choose the snowball's momentum or the avalanche's efficiency, the key is picking one method and sticking with it like a determined dragon! 🏔️❄️🐲",
        examples: {
          "Debt Snowball Benefits": ["Quick psychological wins", "Builds momentum", "Good for motivation", "Simplifies debt list quickly"],
          "Debt Avalanche Benefits": ["Saves more money overall", "Mathematically optimal", "Faster debt freedom", "Lower total interest paid"],
          "Which to Choose": ["Snowball: Need motivation", "Avalanche: Prefer efficiency", "Either: Better than minimum payments"]
        }
      }
    ]
  }
};

// Helper function to get all available quests
export const getAllQuests = (): QuestData[] => {
  return Object.values(questDatabase);
};

// Helper function to get a quest by ID
export const getQuestById = (id: string): QuestData | undefined => {
  return questDatabase[id];
};