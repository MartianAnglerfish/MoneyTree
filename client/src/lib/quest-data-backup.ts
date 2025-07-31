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

export interface QuestionData {
  id: number;
  question: string;
  options: AnswerOption[];
  correctAnswer: string;
  explanation: string;
  auricHint?: string;
}

export interface AnswerOption {
  id: string;
  text: string;
  explanation: string;
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
        question: "Which investment option typically offers the highest potential returns but also comes with the highest risk?",
        options: [
          { id: "A", text: "Savings account with guaranteed interest", explanation: "Federally insured, typically 0.5-2% annual return" },
          { id: "B", text: "Individual growth stocks", explanation: "Can provide high returns but values can fluctuate significantly" },
          { id: "C", text: "Government treasury bonds", explanation: "Backed by government, stable but lower returns" },
          { id: "D", text: "Certificate of Deposit (CD)", explanation: "Fixed-term deposit with guaranteed return" }
        ],
        correctAnswer: "B",
        explanation: "Individual growth stocks offer the highest potential returns but also carry the most risk due to market volatility.",
        auricHint: "Think about this like different types of treasure - some are safe but small, others are huge but guarded by dangerous dragons! 🐲"
      },
      {
        id: 2,
        question: "What is diversification in investing?",
        options: [
          { id: "A", text: "Putting all money in one stock", explanation: "This actually increases risk by concentrating it" },
          { id: "B", text: "Spreading investments across different assets", explanation: "This reduces overall portfolio risk" },
          { id: "C", text: "Only investing in bonds", explanation: "This limits growth potential" },
          { id: "D", text: "Timing the market perfectly", explanation: "This is nearly impossible to do consistently" }
        ],
        correctAnswer: "B",
        explanation: "Diversification helps reduce risk by spreading investments across different asset classes, sectors, and securities.",
        auricHint: "Think about this like organizing a treasure hoard - you want different types of treasures so if one loses value, others can make up for it! 🏆"
      },
      {
        id: 3,
        question: "What does 'compound interest' mean?",
        options: [
          { id: "A", text: "Interest paid only on the original amount", explanation: "This is simple interest, not compound interest" },
          { id: "B", text: "Interest paid on both principal and accumulated interest", explanation: "This is the power of compound interest" },
          { id: "C", text: "Interest that decreases over time", explanation: "This is not how compound interest works" },
          { id: "D", text: "Interest paid only once per year", explanation: "This describes frequency, not the compounding effect" }
        ],
        correctAnswer: "B",
        explanation: "Compound interest is earnings on both your original money and on the earnings you've already accumulated.",
        auricHint: "Compound interest is like my treasure hoard growing - the bigger it gets, the faster it grows! It's magical! ✨"
      },
      {
        id: 4,
        question: "What is a mutual fund?",
        options: [
          { id: "A", text: "A single company's stock", explanation: "This describes individual stocks, not mutual funds" },
          { id: "B", text: "A pool of money from many investors to buy securities", explanation: "This is exactly what a mutual fund is" },
          { id: "C", text: "A government savings bond", explanation: "This is a different type of investment" },
          { id: "D", text: "A high-risk cryptocurrency", explanation: "This is not what mutual funds are" }
        ],
        correctAnswer: "B",
        explanation: "Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.",
        auricHint: "Think of it like many dragons pooling their treasure together to buy bigger, better investments! 🐲💰"
      },
      {
        id: 5,
        question: "What is the relationship between risk and return in investing?",
        options: [
          { id: "A", text: "Higher risk always guarantees higher returns", explanation: "Risk doesn't guarantee returns, it just creates potential" },
          { id: "B", text: "There's no relationship between risk and return", explanation: "There is definitely a relationship" },
          { id: "C", text: "Generally, higher potential returns come with higher risk", explanation: "This is the fundamental risk-return relationship" },
          { id: "D", text: "Lower risk always means higher returns", explanation: "This is backwards - lower risk typically means lower returns" }
        ],
        correctAnswer: "C",
        explanation: "In general, investments with higher potential returns also carry higher risk of loss.",
        auricHint: "The biggest treasures are usually guarded by the fiercest dragons - greater rewards require braving greater risks! 🐲⚔️"
      },
      {
        id: 6,
        question: "What is dollar-cost averaging?",
        options: [
          { id: "A", text: "Investing a lump sum all at once", explanation: "This is the opposite of dollar-cost averaging" },
          { id: "B", text: "Investing the same amount regularly over time", explanation: "This is exactly what dollar-cost averaging is" },
          { id: "C", text: "Only buying stocks when prices are low", explanation: "This describes market timing, not dollar-cost averaging" },
          { id: "D", text: "Investing only in US dollar denominated assets", explanation: "This has nothing to do with dollar-cost averaging" }
        ],
        correctAnswer: "B",
        explanation: "Dollar-cost averaging involves investing a fixed amount regularly, regardless of market conditions.",
        auricHint: "It's like adding the same amount of gold to your hoard every month - sometimes gold is expensive, sometimes cheap, but it averages out! 📈"
      },
      {
        id: 7,
        question: "What is a stock market index?",
        options: [
          { id: "A", text: "A single company's stock price", explanation: "This describes individual stocks, not an index" },
          { id: "B", text: "A measure of a group of stocks' performance", explanation: "This is what a stock market index measures" },
          { id: "C", text: "The total amount of money in the stock market", explanation: "This is not what an index measures" },
          { id: "D", text: "The number of companies in existence", explanation: "This is not related to stock market indices" }
        ],
        correctAnswer: "B",
        explanation: "A stock market index tracks the performance of a group of stocks, representing a portion of the overall market.",
        auricHint: "Think of it like a treasure chest inventory - it tells you how well a collection of different treasures is doing overall! 📊"
      },
      {
        id: 8,
        question: "What does it mean when a stock pays dividends?",
        options: [
          { id: "A", text: "The company is losing money", explanation: "Dividend payments don't indicate losses" },
          { id: "B", text: "The company shares profits with shareholders", explanation: "This is exactly what dividends are" },
          { id: "C", text: "The stock price will definitely increase", explanation: "Dividends don't guarantee price increases" },
          { id: "D", text: "The company is about to go bankrupt", explanation: "Dividends are actually a sign of profitability" }
        ],
        correctAnswer: "B",
        explanation: "Dividends are payments made by companies to their shareholders, typically from profits.",
        auricHint: "It's like the company sharing some of its treasure hoard with everyone who owns a piece of it! Very generous! 💎"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "Understanding Risk vs. Reward",
        content: "Before we dive into investing, let me explain a fundamental principle: the relationship between risk and potential reward. Generally, the higher the potential return of an investment, the higher the risk involved.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Think of it like treasure hunting - the biggest treasures are usually in the most dangerous places! But with knowledge, we can be smart treasure hunters! 🐲⚔️",
        examples: {
          "Low Risk (1-4% returns)": ["Savings accounts", "Government bonds", "CDs"],
          "Medium Risk (4-8% returns)": ["Corporate bonds", "Balanced mutual funds", "Blue-chip stocks"],
          "High Risk (8%+ potential)": ["Growth stocks", "Small-cap funds", "Real estate investment"]
        }
      },
      {
        id: 2,
        title: "The Magic of Compound Interest",
        content: "Compound interest is often called the 'eighth wonder of the world.' It's when you earn returns not just on your original investment, but also on all the returns you've earned previously.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "This is my favorite magic! It's like my treasure hoard growing bigger and bigger, and the bigger it gets, the faster it grows! Time is our best friend here! ✨📈",
        keyPoints: [
          "Start investing as early as possible",
          "Even small amounts can grow significantly over time",
          "Time is more important than timing",
          "Reinvest your earnings to maximize the effect"
        ]
      },
      {
        id: 3,
        title: "Diversification: Don't Put All Eggs in One Basket",
        content: "Diversification means spreading your investments across different types of assets, industries, and even countries. This helps reduce risk because different investments often perform differently under various market conditions.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Smart dragons don't keep all their treasure in one cave! Spread it around - some in gold, some in gems, some in different kingdoms. That way, if one cave gets robbed, you still have treasure elsewhere! 🏰💎",
        examples: {
          "Asset Types": ["Stocks", "Bonds", "Real Estate", "Commodities"],
          "Geographic": ["US Markets", "International Developed", "Emerging Markets"],
          "Sectors": ["Technology", "Healthcare", "Finance", "Consumer Goods"]
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
          { id: "A", text: "To restrict spending completely", explanation: "Emergency funds aren't about restricting spending" },
          { id: "B", text: "To cover unexpected expenses without debt", explanation: "This is the main purpose - financial security" },
          { id: "C", text: "To invest in stocks", explanation: "Emergency funds should be liquid and safe, not invested" },
          { id: "D", text: "To pay regular monthly bills", explanation: "This is what your regular budget is for" }
        ],
        correctAnswer: "B",
        explanation: "Emergency funds provide financial security by covering unexpected expenses like medical bills, car repairs, or job loss without going into debt.",
        auricHint: "Emergency funds are like having a secret stash of treasure for when unexpected dragons attack your finances! Always keep some gold safely tucked away. 🛡️"
      },
      {
        id: 2,
        question: "How much should you typically save in an emergency fund?",
        options: [
          { id: "A", text: "One month of expenses", explanation: "This might not be enough for major emergencies" },
          { id: "B", text: "3-6 months of expenses", explanation: "This is the standard recommendation for most people" },
          { id: "C", text: "One year of expenses", explanation: "This might be more than necessary for most people" },
          { id: "D", text: "Whatever you can spare", explanation: "While any amount helps, there are better guidelines" }
        ],
        correctAnswer: "B",
        explanation: "Most financial experts recommend saving 3-6 months of living expenses in your emergency fund to cover most unexpected situations.",
        auricHint: "Think of it as having enough treasure to keep your dragon cave running for 3-6 months if you can't hunt for more gold! 🐲🏠"
      },
      {
        id: 3,
        question: "Where should you keep your emergency fund?",
        options: [
          { id: "A", text: "In a high-yield savings account", explanation: "This provides safety and easy access while earning some return" },
          { id: "B", text: "Invested in stocks", explanation: "Too risky - the value could drop when you need the money" },
          { id: "C", text: "In cash under your mattress", explanation: "This doesn't earn any return and isn't secure" },
          { id: "D", text: "In a retirement account", explanation: "This money isn't easily accessible for emergencies" }
        ],
        correctAnswer: "A",
        explanation: "Emergency funds should be kept in easily accessible, low-risk accounts like high-yield savings accounts.",
        auricHint: "Keep your emergency treasure somewhere safe but reachable - not buried so deep you can't get to it quickly when dragons attack! 🏦✨"
      },
      {
        id: 4,
        question: "When should you use your emergency fund?",
        options: [
          { id: "A", text: "For vacation expenses", explanation: "Vacations are planned expenses, not emergencies" },
          { id: "B", text: "For a new TV on sale", explanation: "Sales on wants are not legitimate emergencies" },
          { id: "C", text: "For unexpected medical bills", explanation: "This is exactly what emergency funds are for" },
          { id: "D", text: "For holiday gifts", explanation: "Holidays are predictable and should be budgeted for" }
        ],
        correctAnswer: "C",
        explanation: "Emergency funds should only be used for true unexpected expenses that threaten your financial stability.",
        auricHint: "Only raid your emergency treasure stash when there's a real financial dragon attacking - not when you just want something shiny! 🐲⚔️"
      },
      {
        id: 5,
        question: "What should you do after using money from your emergency fund?",
        options: [
          { id: "A", text: "Leave it empty until next year", explanation: "This leaves you vulnerable to the next emergency" },
          { id: "B", text: "Replace it as soon as possible", explanation: "This maintains your financial safety net" },
          { id: "C", text: "Use the rest for other expenses", explanation: "This defeats the purpose of having an emergency fund" },
          { id: "D", text: "Invest what's left", explanation: "Emergency funds should remain liquid and accessible" }
        ],
        correctAnswer: "B",
        explanation: "After using emergency funds, prioritize replenishing them to maintain your financial safety net.",
        auricHint: "After using some emergency treasure, work hard to fill that treasure chest back up! You never know when the next dragon might come around! 💰🔄"
      },
      {
        id: 6,
        question: "Which of these is NOT typically considered an emergency expense?",
        options: [
          { id: "A", text: "Job loss", explanation: "This is a major emergency that affects income" },
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
    title: 'Budgeting Mastery Challenge',
    description: 'Master the art of budgeting and expense tracking',
    category: 'budgeting',
    difficulty: 2,
    estimatedMinutes: 18,
    questions: [
      {
        id: 1,
        question: "What is the 50/30/20 budgeting rule?",
        options: [
          { id: "A", text: "50% savings, 30% needs, 20% wants", explanation: "This would be very difficult for most people to achieve" },
          { id: "B", text: "50% needs, 30% wants, 20% savings", explanation: "This is the correct 50/30/20 rule allocation" },
          { id: "C", text: "50% wants, 30% needs, 20% savings", explanation: "This prioritizes wants over needs incorrectly" },
          { id: "D", text: "Equal thirds for all categories", explanation: "This isn't the 50/30/20 rule" }
        ],
        correctAnswer: "B",
        explanation: "The 50/30/20 rule suggests allocating 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment.",
        auricHint: "Think of it like organizing your treasure hoard - half for essential dragon needs, some for fun dragon wants, and always save some treasure for the future! 🐲💰"
      },
      {
        id: 2,
        question: "Which of these is considered a 'need' rather than a 'want'?",
        options: [
          { id: "A", text: "Netflix subscription", explanation: "This is entertainment, which is a want" },
          { id: "B", text: "Grocery food", explanation: "Basic food is essential for survival - definitely a need" },
          { id: "C", text: "Designer clothing", explanation: "While clothing is a need, designer brands are usually wants" },
          { id: "D", text: "Dining at restaurants", explanation: "This is convenient but not essential - it's a want" }
        ],
        correctAnswer: "B",
        explanation: "Grocery food is a basic necessity for survival and health, making it a clear need rather than want.",
        auricHint: "Even us dragons need to eat! Basic food for survival is always a need, but fancy dragon delicacies? Those are wants! 🍖🐲"
      },
      {
        id: 3,
        question: "What's the first step in creating a budget?",
        options: [
          { id: "A", text: "Set spending limits for each category", explanation: "You need to know your income first" },
          { id: "B", text: "Track your current spending habits", explanation: "While important, you should know your income first" },
          { id: "C", text: "Calculate your total monthly income", explanation: "You must know how much money you have coming in first" },
          { id: "D", text: "List all your financial goals", explanation: "Goals are important but come after understanding your income" }
        ],
        correctAnswer: "C",
        explanation: "Before you can allocate money to different categories, you need to know exactly how much money you have available each month.",
        auricHint: "Before I can organize my treasure hoard, I need to know how much treasure I actually have! Count your golden income first! 💰🔢"
      },
      {
        id: 4,
        question: "How often should you review and adjust your budget?",
        options: [
          { id: "A", text: "Once a year", explanation: "This isn't frequent enough to stay on track" },
          { id: "B", text: "Monthly", explanation: "Regular monthly reviews help you stay on track and make adjustments" },
          { id: "C", text: "Only when something major changes", explanation: "Regular reviews are better than waiting for big changes" },
          { id: "D", text: "Never - set it once and forget it", explanation: "Budgets need regular attention and adjustments" }
        ],
        correctAnswer: "B",
        explanation: "Monthly budget reviews help you track your progress, identify issues, and make necessary adjustments to stay on track.",
        auricHint: "I check on my treasure hoard every month to make sure no sneaky thieves took anything! Same with your budget - regular check-ups keep everything secure! 🔍🐲"
      },
      {
        id: 5,
        question: "What should you do if you consistently overspend in a budget category?",
        options: [
          { id: "A", text: "Ignore it and hope it gets better", explanation: "Ignoring the problem won't solve it" },
          { id: "B", text: "Give up on budgeting entirely", explanation: "This throws away a valuable financial tool" },
          { id: "C", text: "Analyze why and adjust your budget or habits", explanation: "This addresses the root cause of the overspending" },
          { id: "D", text: "Just use credit cards to cover the difference", explanation: "This creates debt and doesn't solve the underlying issue" }
        ],
        correctAnswer: "C",
        explanation: "Consistent overspending indicates either unrealistic budget allocations or spending habits that need adjustment.",
        auricHint: "If I keep losing treasure from one part of my hoard, I need to figure out why! Is there a hole in my cave? Are my estimates wrong? Smart dragons adapt their treasure management! 🐲🔧"
      },
      {
        id: 6,
        question: "What is zero-based budgeting?",
        options: [
          { id: "A", text: "Having zero dollars left over", explanation: "This is close but not quite the complete definition" },
          { id: "B", text: "Assigning every dollar a purpose until income minus expenses equals zero", explanation: "This is exactly what zero-based budgeting means" },
          { id: "C", text: "Starting your budget from scratch each month", explanation: "While you do start fresh, the key is the zero balance" },
          { id: "D", text: "Having no budget categories", explanation: "This is the opposite of zero-based budgeting" }
        ],
        correctAnswer: "B",
        explanation: "Zero-based budgeting means giving every dollar of your income a specific job until your income minus all assigned expenses equals zero.",
        auricHint: "It's like making sure every single piece of treasure in your hoard has a specific purpose - none just lying around doing nothing! Every gold coin gets a job! 🐲💼"
      },
      {
        id: 7,
        question: "Which expense tracking method is most effective?",
        options: [
          { id: "A", text: "Only tracking large expenses", explanation: "Small expenses add up and should be tracked too" },
          { id: "B", text: "Estimating expenses from memory", explanation: "Memory is unreliable for accurate tracking" },
          { id: "C", text: "Recording all expenses as they happen", explanation: "Real-time tracking provides the most accurate picture" },
          { id: "D", text: "Only tracking monthly bills", explanation: "This misses variable and discretionary spending" }
        ],
        correctAnswer: "C",
        explanation: "Recording expenses as they happen provides the most accurate and complete picture of your spending patterns.",
        auricHint: "I keep track of every treasure that comes into and leaves my hoard right when it happens! Fresh memory makes for accurate treasure records! 📝🐲"
      },
      {
        id: 8,
        question: "What percentage of income should ideally go to housing costs?",
        options: [
          { id: "A", text: "No more than 28-30%", explanation: "This is the recommended guideline for housing affordability" },
          { id: "B", text: "Around 50%", explanation: "This would leave too little for other needs and savings" },
          { id: "C", text: "Whatever you can afford", explanation: "There are specific guidelines for housing affordability" },
          { id: "D", text: "At least 40%", explanation: "This is higher than recommended and could strain your budget" }
        ],
        correctAnswer: "A",
        explanation: "Financial experts generally recommend spending no more than 28-30% of gross income on housing to maintain a balanced budget.",
        auricHint: "Even dragon caves shouldn't take up too much of your treasure! Keep housing costs reasonable so you have plenty left for other needs and growing your hoard! 🏠🐲"
      }
    ],
    educationalSections: [
      {
        id: 1,
        title: "Budgeting Fundamentals",
        content: "A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Think of it as a roadmap for your financial journey - it helps you reach your destinations (financial goals) efficiently.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "A budget is like having a master plan for organizing your treasure hoard! Without it, treasures just pile up randomly and you can't find what you need when you need it! 🐲📋",
        keyPoints: [
          "A budget is a spending plan, not a restriction",
          "It helps you prioritize what's important to you",
          "Budgets should be realistic and flexible",
          "They help you reach your financial goals faster"
        ]
      },
      {
        id: 2,
        title: "Needs vs. Wants: The Foundation of Smart Budgeting",
        content: "Understanding the difference between needs and wants is crucial for effective budgeting. Needs are expenses required for basic living and working, while wants are things that enhance your lifestyle but aren't essential.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Even dragons must distinguish between essential cave maintenance and shiny decorative treasures! Needs keep you alive and functional, wants make life more enjoyable! 🐲✨",
        examples: {
          "Needs": ["Housing", "Basic food", "Transportation", "Insurance", "Utilities", "Minimum debt payments"],
          "Wants": ["Entertainment", "Dining out", "Designer items", "Hobbies", "Subscriptions", "Luxury upgrades"]
        }
      },
      {
        id: 3,
        title: "Popular Budgeting Methods",
        content: "There are several effective budgeting approaches. The key is finding one that fits your lifestyle and personality. Some people prefer detailed tracking, while others need simpler systems.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Different dragons organize their hoards differently! Some sort by treasure type, others by value, some keep it simple. Find the treasure management system that works for your dragon style! 🐲💎",
        examples: {
          "50/30/20 Rule": ["50% Needs", "30% Wants", "20% Savings & Debt"],
          "Zero-Based": ["Every dollar assigned", "Income - Expenses = 0", "Intentional spending"],
          "Envelope Method": ["Cash for categories", "Visual spending limits", "Physical boundaries"]
        }
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
      },
      {
        id: 3,
        title: "Common Budgeting Mistakes",
        content: "Even with the best intentions, many people make budgeting mistakes that derail their financial progress. Understanding these pitfalls helps you avoid them and build sustainable money management habits.",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Even the wisest dragons make mistakes when managing their treasure! Learn from common errors to keep your hoard growing steadily. 🐲⚠️",
        keyPoints: [
          "Being too restrictive and setting unrealistic limits",
          "Forgetting irregular expenses like car maintenance or gifts",
          "Not tracking small purchases that add up over time",
          "Failing to adjust the budget when life circumstances change",
          "Giving up after one bad month instead of getting back on track"
        ]
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
      },
      {
        id: 3,
        title: "Credit Scores and Debt Management",
        content: "Your credit score is heavily influenced by how you manage debt. Understanding the factors that affect your score helps you make strategic decisions about debt payments and credit usage.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        auricComment: "Your credit score is like your reputation among treasure merchants - the better it is, the better deals you can negotiate for future adventures! ⭐🐲",
        keyPoints: [
          "Payment history is 35% of your credit score - never miss payments",
          "Credit utilization is 30% - keep balances low relative to limits",
          "Length of credit history is 15% - keep old accounts open",
          "Mix of credit types is 10% - having variety can help",
          "New credit inquiries are 10% - don't apply for too much at once"
        ]
      }
    ]
  }
};
