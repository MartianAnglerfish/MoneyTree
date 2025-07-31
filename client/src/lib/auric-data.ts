export interface AuricMessage {
  id: string;
  content: string;
  category: 'welcome' | 'motivational' | 'educational' | 'celebration';
  context?: string;
}

export const auricMessages: Record<string, AuricMessage[]> = {
  welcome: [
    {
      id: 'welcome-1',
      content: "Welcome to MoneyTree! I'm Auric, your financial wisdom dragon. Let's build your treasure of knowledge together and watch your wealth grow like golden scales on my back! 🐲✨",
      category: 'welcome',
      context: 'first_visit'
    },
    {
      id: 'welcome-2', 
      content: "Hello again, my treasure seeker! Ready to add more golden knowledge to your hoard? Every quest you complete makes both of us stronger! 💰",
      category: 'welcome',
      context: 'returning_user'
    }
  ],
  motivational: [
    {
      id: 'motivational-1',
      content: "Fantastic work! You're building your financial wisdom like a true treasure hoarder! 🐲✨ Keep it up!",
      category: 'motivational',
      context: 'quest_complete'
    },
    {
      id: 'motivational-2',
      content: "Remember, building wealth is like growing my golden scales - it takes time, patience, and consistent effort. Every lesson you complete adds to your treasure! 💰",
      category: 'motivational',
      context: 'daily_encouragement'
    },
    {
      id: 'motivational-3',
      content: "You're on fire! That streak is making my scales shimmer with pride. Keep up the excellent learning habits! 🔥",
      category: 'motivational',
      context: 'streak_encouragement'
    }
  ],
  educational: [
    {
      id: 'educational-1',
      content: "Take your time thinking about this one! Remember, higher potential rewards often come with higher risks. What do you think offers the most growth potential?",
      category: 'educational',
      context: 'investment_question'
    },
    {
      id: 'educational-2',
      content: "Think about this like organizing a treasure hoard - you want different types of treasures (diversification) so if one loses value, others can make up for it! 🏆",
      category: 'educational',
      context: 'diversification_question'
    },
    {
      id: 'educational-3',
      content: "Emergency funds are like having a secret stash of treasure for when unexpected dragons attack your finances! Always keep some gold safely tucked away. 🛡️",
      category: 'educational',
      context: 'emergency_fund_question'
    }
  ],
  celebration: [
    {
      id: 'celebration-1',
      content: "ROAR! 🐲 You've mastered another quest! My scales are practically glowing with pride. Your financial wisdom treasure grows stronger!",
      category: 'celebration',
      context: 'quest_completion'
    },
    {
      id: 'celebration-2',
      content: "Achievement unlocked! *happy dragon noises* 🎉 You're becoming quite the financial wizard. I knew you had it in you!",
      category: 'celebration',
      context: 'achievement_unlock'
    }
  ]
};

export function getRandomAuricMessage(category: keyof typeof auricMessages, context?: string): AuricMessage {
  const messages = auricMessages[category];
  
  if (context) {
    const contextMessages = messages.filter(msg => msg.context === context);
    if (contextMessages.length > 0) {
      return contextMessages[Math.floor(Math.random() * contextMessages.length)];
    }
  }
  
  return messages[Math.floor(Math.random() * messages.length)];
}

export const auricPersonality = {
  traits: [
    "Wise and encouraging",
    "Loves collecting financial knowledge like treasure",
    "Uses dragon metaphors for financial concepts",
    "Celebrates user achievements enthusiastically",
    "Patient teacher who breaks down complex topics"
  ],
  catchphrases: [
    "Let's build your treasure of knowledge!",
    "Every quest makes us both stronger!",
    "Your financial wisdom grows like golden scales!",
    "Time to hoard some knowledge!",
    "*happy dragon noises*"
  ]
};
