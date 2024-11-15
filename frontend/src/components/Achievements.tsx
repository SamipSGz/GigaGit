import React from 'react';
import { Award, Star, Code2, GitPullRequest, Users, Zap } from 'lucide-react';

export default function Achievements() {
  const categories = [
    {
      title: "Coding Excellence",
      achievements: [
        { icon: <Code2 className="w-8 h-8 text-blue-500" />, name: "Code Quality Champion", description: "Maintain high code quality standards", progress: 75 },
        { icon: <GitPullRequest className="w-8 h-8 text-purple-500" />, name: "Pull Request Master", description: "Submit and review PRs effectively", progress: 60 },
        { icon: <Zap className="w-8 h-8 text-yellow-500" />, name: "Fast Resolver", description: "Quick issue resolution", progress: 90 }
      ]
    },
    {
      title: "Community Impact",
      achievements: [
        { icon: <Users className="w-8 h-8 text-green-500" />, name: "Community Leader", description: "Active community participation", progress: 45 },
        { icon: <Star className="w-8 h-8 text-yellow-500" />, name: "Project Stargazer", description: "Create popular repositories", progress: 80 },
        { icon: <Award className="w-8 h-8 text-red-500" />, name: "Mentor Status", description: "Help other developers grow", progress: 30 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-2">Track your progress and earn rewards</p>
        </div>
        <Award className="w-12 h-12 text-purple-500" />
      </div>

      <div className="space-y-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {achievement.icon}
                      <div>
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}