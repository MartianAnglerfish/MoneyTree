export interface QuestData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedMinutes: number;
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
  }
};
