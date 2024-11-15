import React from 'react';
import { User, Github, Star, Code2, GitPullRequest, GitCommit, Award, Calendar } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex items-end -mt-12 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-xl ring-4 ring-white"
            />
            <div className="ml-6 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">Alex Developer</h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>@alexdev</span>
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Star className="w-5 h-5 text-yellow-500" />} label="Total Points" value="15,234" />
            <StatCard icon={<Code2 className="w-5 h-5 text-blue-500" />} label="Repositories" value="48" />
            <StatCard icon={<GitPullRequest className="w-5 h-5 text-purple-500" />} label="Pull Requests" value="183" />
            <StatCard icon={<GitCommit className="w-5 h-5 text-green-500" />} label="Contributions" value="2,547" />
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Award className="w-8 h-8 text-yellow-500" />, title: "Bug Hunter", date: "Mar 15, 2024" },
                { icon: <Star className="w-8 h-8 text-purple-500" />, title: "Popular Creator", date: "Mar 10, 2024" },
                { icon: <Code2 className="w-8 h-8 text-blue-500" />, title: "Code Quality", date: "Mar 5, 2024" },
                { icon: <GitPullRequest className="w-8 h-8 text-green-500" />, title: "Team Player", date: "Mar 1, 2024" }
              ].map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
                  {achievement.icon}
                  <h3 className="font-medium mt-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Calendar */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contribution Activity</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Current Streak: 45 days</span>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              {/* Placeholder for contribution graph */}
              <div className="h-32 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}