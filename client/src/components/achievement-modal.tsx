import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomAuricMessage } from "@/lib/auric-data";
import auricDragonImage from "@assets/DRAGON_1_1753840736082_1753972723734_1753975956129.png";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
  xpGained: number;
  coinsGained: number;
  onNextQuest?: () => void;
}

export function AchievementModal({ 
  isOpen, 
  onClose, 
  questTitle, 
  xpGained, 
  coinsGained,
  onNextQuest 
}: AchievementModalProps) {
  const celebrationMessage = getRandomAuricMessage('celebration', 'quest_completion');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center p-6">
          {/* Celebration Animation */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto flex items-center justify-center animate-bounce-slow text-4xl">
              🏆
            </div>
            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-1/4 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Quest Complete!</h2>
          <p className="text-muted-foreground mb-4">You've successfully completed {questTitle}!</p>
          
          {/* Rewards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-sm">+{xpGained}</span>
              </div>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-600 font-bold text-sm">+{coinsGained}</span>
              </div>
              <p className="text-xs text-muted-foreground">Coins</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">
                🛡️
              </div>
              <p className="text-xs text-muted-foreground">Progress</p>
            </div>
          </div>
          
          {/* Auric Celebration */}
          <Card className="bg-primary/10 border-primary/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-full flex items-center justify-center animate-wiggle relative">
                  <img 
                    src={auricDragonImage} 
                    alt="Auric" 
                    className="w-8 h-8 object-contain" 
                  />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm italic text-primary">"{celebrationMessage.content}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex space-x-3">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              View Dashboard
            </Button>
            {onNextQuest && (
              <Button 
                onClick={onNextQuest}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Next Quest
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
