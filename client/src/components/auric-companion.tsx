import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getRandomAuricMessage } from "@/lib/auric-data";
import auricDragonImage from "@assets/DRAGON_1_1753840736082_1753972723734_1753975956129.png";

interface AuricCompanionProps {
  className?: string;
}

export function AuricCompanion({ className }: AuricCompanionProps) {
  const [currentMessage, setCurrentMessage] = useState(getRandomAuricMessage('welcome'));
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch random tip from API
  const { data: auricTip } = useQuery({
    queryKey: ['/api/auric-tip'],
    refetchOnWindowFocus: false,
  });

  const handleAskAuric = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessage(getRandomAuricMessage('educational'));
      setIsAnimating(false);
    }, 500);
  };

  const handleDailyTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (auricTip && 'id' in auricTip && 'content' in auricTip) {
        setCurrentMessage({
          id: auricTip.id as string,
          content: auricTip.content as string,
          category: (auricTip.category as any) || 'motivational',
          context: auricTip.context as string
        });
      } else {
        setCurrentMessage(getRandomAuricMessage('motivational'));
      }
      setIsAnimating(false);
    }, 500);
  };

  const handleMotivation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessage(getRandomAuricMessage('motivational'));
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          {/* Auric Dragon Character */}
          <div className="relative mx-auto w-40 h-40 mb-4">
            <div className={`relative w-full h-full transition-transform duration-500 ${isAnimating ? 'animate-bounce' : 'animate-bounce-slow'}`}>
              <img 
                src={auricDragonImage} 
                alt="Auric the Dragon" 
                className="w-full h-full object-contain rounded-full bg-gradient-to-br from-emerald-500/20 to-amber-500/20 p-2"
              />
              
              {/* Sparkly overlay effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 right-4 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-8 left-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-6 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-2 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-1/2 left-1 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
              </div>
            </div>
            
            {/* Floating treasure animations */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full animate-float flex items-center justify-center text-sm shadow-lg">
              💰
            </div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-float-delayed flex items-center justify-center text-xs shadow-lg">
              ✨
            </div>
            <div className="absolute top-4 -left-4 w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-float-slow flex items-center justify-center text-xs shadow-lg">
              💎
            </div>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Meet Auric!</h3>
          <p className="text-sm text-muted-foreground mb-4">Your wise financial dragon companion</p>
        </div>
        
        {/* Speech Bubble */}
        <div className="relative bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20 rounded-lg p-4 mb-4 shadow-lg">
          <div className="absolute -top-2 left-8 w-4 h-4 bg-gradient-to-br from-primary/10 to-emerald-500/10 border-l border-t border-primary/20 rotate-45"></div>
          <p className={`text-sm italic transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            "{currentMessage.content}"
          </p>
          
          {/* Sparkle effects in speech bubble */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-twinkle"></div>
          <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-twinkle" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
          <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
          Auric cares about your financial success
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Button 
            onClick={handleAskAuric}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>💬</span>
            <span>Ask Auric</span>
          </Button>
          <Button 
            onClick={handleDailyTip}
            className="bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>💡</span>
            <span>Daily Tip</span>
          </Button>
          <Button 
            onClick={handleMotivation}
            variant="outline"
            className="border border-primary text-primary hover:bg-primary/10 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>🎯</span>
            <span>Need Motivation?</span>
          </Button>
        </div>

        {/* Auric Status */}
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">🐲 Auric is online • Wisdom Level: Master</p>
        </div>
      </CardContent>
    </Card>
  );
}
