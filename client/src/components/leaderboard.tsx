import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { User } from "@/../../shared/schema";

interface LeaderboardProps {
  currentUserId?: string;
}

export function Leaderboard({ currentUserId }: LeaderboardProps) {
  const { data: leaderboard, isLoading } = useQuery<User[]>({
    queryKey: ["/api/leaderboard"],
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                  <div className="w-24 h-4 bg-slate-700 rounded"></div>
                </div>
                <div className="w-16 h-4 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-center py-8">No leaderboard data available</p>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-slate-400">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400">1st</Badge>;
      case 2:
        return <Badge className="bg-gray-400 text-gray-900 hover:bg-gray-300">2nd</Badge>;
      case 3:
        return <Badge className="bg-amber-600 text-amber-100 hover:bg-amber-500">3rd</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-300 border-slate-600">#{rank}</Badge>;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          Dragon Leaderboard
        </CardTitle>
        <p className="text-slate-400 text-sm">Top treasure hunters in the realm</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.id === currentUserId;
            
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isCurrentUser 
                    ? 'bg-green-900/30 border border-green-500/30' 
                    : 'bg-slate-800 hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isCurrentUser ? 'text-green-300' : 'text-white'}`}>
                        {user.displayName}
                      </span>
                      {isCurrentUser && (
                        <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                          You
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-slate-400">@{user.username}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {user.xp || 0} XP
                    </div>
                    <div className="text-xs text-slate-400">
                      Level {user.level || 1}
                    </div>
                  </div>
                  
                  {getRankBadge(rank)}
                </div>
              </div>
            );
          })}
        </div>
        
        {leaderboard.length > 0 && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Trophy className="h-4 w-4 text-green-400" />
              <span>
                Compete with other dragons by completing quests and earning XP!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}