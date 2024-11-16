import React from 'react';
import { User, Github, Star, Code2, GitPullRequest, GitCommit, Award, Calendar } from 'lucide-react';

export default function Profile() {
  const CURRENT_STREAK = 45;

  // Generate mock contribution data for the graph with current streak
  const generateContributions = () => {
    const contributions = [];
    for (let i = 0; i < 52; i++) { // 52 weeks
      const week = [];
      for (let j = 0; j < 7; j++) { // 7 days per week
        const totalDays = i * 7 + j;
        const daysFromEnd = (52 * 7) - totalDays;
        
        // Set high intensity for the current streak days
        if (daysFromEnd <= CURRENT_STREAK) {
          week.push(3); // Highest intensity for streak days
        } else {
          const intensity = Math.floor(Math.random() * 4); // 0-3 for different intensities
          week.push(intensity);
        }
      }
      contributions.unshift(week); // Add to start to show most recent contributions on the right
    }
    return contributions;
  };

  const contributions = generateContributions();

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
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Current Streak: <span className="text-green-600 font-semibold">{CURRENT_STREAK} days</span></span>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              
              {/* GitHub-style contribution graph */}
              <div className="overflow-x-auto">
                <div className="inline-flex gap-1">
                  {contributions.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((intensity, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm transition-colors ${
                            intensity === 0 ? 'bg-gray-100' :
                            intensity === 1 ? 'bg-green-200' :
                            intensity === 2 ? 'bg-green-400' :
                            'bg-green-600'
                          }`}
                          title={`${intensity} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-end space-x-2 mt-4 text-xs text-gray-500">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                <span>More</span>
              </div>
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