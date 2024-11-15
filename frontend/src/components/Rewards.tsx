import React from 'react';
import { Gift, Star, Shield, Zap, Award } from 'lucide-react';

export default function Rewards() {
  const rewards = [
    {
      icon: <Shield className="w-12 h-12 text-purple-500" />,
      title: "Premium Badge",
      points: 5000,
      description: "Exclusive badge for your profile",
      claimed: false
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      title: "GitHub Pro",
      points: 15000,
      description: "1 month of GitHub Pro subscription",
      claimed: false
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-500" />,
      title: "Fast Track Review",
      points: 3000,
      description: "Priority review for your next PR",
      claimed: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Store</h1>
          <p className="text-gray-600 mt-2">Redeem your points for exclusive rewards</p>
        </div>
        <Gift className="w-12 h-12 text-red-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Points</h2>
              <p className="text-gray-600">Available balance</p>
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-900">12,450</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{reward.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.title}</h3>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              <div className="flex items-center space-x-2 text-sm font-medium text-yellow-600 mb-4">
                <Star className="w-4 h-4" />
                <span>{reward.points.toLocaleString()} points</span>
              </div>
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  reward.claimed
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
                disabled={reward.claimed}
              >
                {reward.claimed ? 'Claimed' : 'Redeem Reward'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}