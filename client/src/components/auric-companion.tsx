import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getRandomAuricMessage } from "@/lib/auric-data";

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
      if (auricTip) {
        setCurrentMessage({
          id: auricTip.id,
          content: auricTip.content,
          category: auricTip.category as any,
          context: auricTip.context
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
          <div className="relative mx-auto w-32 h-32 mb-4">
            <div className={`w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center text-6xl transition-transform duration-500 ${isAnimating ? 'animate-bounce' : 'animate-bounce-slow'}`}>
              🐲
            </div>
            {/* Floating coins animation */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full animate-pulse-slow flex items-center justify-center text-xs">
              💰
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse-slow flex items-center justify-center text-xs" style={{animationDelay: '1s'}}>
              ✨
            </div>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Meet Auric!</h3>
          <p className="text-sm text-muted-foreground mb-4">Your wise financial dragon companion</p>
        </div>
        
        {/* Speech Bubble */}
        <div className="relative bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-primary/10 border-l border-t border-primary/20 rotate-45"></div>
          <p className={`text-sm italic transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            "{currentMessage.content}"
          </p>
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
