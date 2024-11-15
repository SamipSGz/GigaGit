import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Sarah Chen", points: 15420, contributions: 324, streak: 45 },
    { rank: 2, name: "Alex Kumar", points: 14250, contributions: 298, streak: 32 },
    { rank: 3, name: "Maria Garcia", points: 13800, contributions: 275, streak: 28 },
    { rank: 4, name: "John Smith", points: 12900, contributions: 245, streak: 21 },
    { rank: 5, name: "Lisa Wang", points: 12400, contributions: 232, streak: 19 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Leaderboard</h1>
          <p className="text-gray-600 mt-2">Compete with developers worldwide</p>
        </div>
        <Trophy className="w-12 h-12 text-yellow-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Developer</div>
          <div className="col-span-3">Points</div>
          <div className="col-span-2">Contributions</div>
          <div className="col-span-2">Streak</div>
        </div>

        {leaderboardData.map((user) => (
          <div key={user.rank} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="col-span-1 font-semibold flex items-center">
              {user.rank <= 3 ? (
                <Medal className={`w-6 h-6 ${
                  user.rank === 1 ? 'text-yellow-500' :
                  user.rank === 2 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              ) : (
                user.rank
              )}
            </div>
            <div className="col-span-4 font-medium text-gray-900 flex items-center space-x-3">
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + user.rank}?fit=facearea&facepad=2&w=256&h=256&q=80`}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <div className="col-span-3 flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{user.points.toLocaleString()}</span>
            </div>
            <div className="col-span-2">{user.contributions}</div>
            <div className="col-span-2 flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {user.streak} days
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}