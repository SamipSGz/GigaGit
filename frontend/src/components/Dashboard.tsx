import React from 'react';
import { Code2, GitPullRequest, Star, Users, Activity, Award } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Developer!</h1>
        <p className="text-gray-600 mt-2">Your coding journey continues. Keep pushing!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Code2 className="w-6 h-6 text-emerald-600" />}
          title="Contributions"
          value="2,547"
          change="+12%"
          positive={true}
        />
        <StatCard
          icon={<GitPullRequest className="w-6 h-6 text-blue-600" />}
          title="Pull Requests"
          value="183"
          change="+5%"
          positive={true}
        />
        <StatCard
          icon={<Star className="w-6 h-6 text-yellow-500" />}
          title="Repository Stars"
          value="1.2k"
          change="+8%"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <AchievementsPanel />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, positive }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-4">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Merged Pull Request",
      description: "Feature: Add user authentication",
      time: "2h ago"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Earned New Badge",
      description: "Code Quality Champion",
      time: "5h ago"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "New Collaboration",
      description: "Joined project: OpenAI-Integration",
      time: "1d ago"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <Activity className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsPanel() {
  const achievements = [
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: "Bug Hunter",
      progress: 75
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      title: "Popular Creator",
      progress: 60
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Team Player",
      progress: 90
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        <Award className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {achievement.icon}
                <span className="font-medium">{achievement.title}</span>
              </div>
              <span className="text-sm text-gray-600">{achievement.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}