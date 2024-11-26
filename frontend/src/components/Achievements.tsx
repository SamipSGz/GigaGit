import React, { useEffect, useState } from 'react';
import { Award, Star, Code2, GitPullRequest, Users, Zap } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface Achievement {
  icon: React.ReactNode;
  name: string;
  description: string;
  progress: number;
}

interface AchievementCategory {
  title: string;
  achievements: Achievement[];
}

export default function Achievements() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [repoData, setRepoData] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<AchievementCategory[]>([]);
  const { githubToken, user } = useAuth();

  // Helper function to calculate progress
  const calculateProgress = (value: number, maxValue: number): number => {
    const progress = Math.floor((value || 0) / maxValue * 100);
    return Math.min(progress, 100);
  };

  useEffect(() => {
    // If no GitHub token, call login required callback
    if (!githubToken) {
      navigate('/login');
      return;
    }

    const fetchGitHubData = async () => {
      try {
        // Fetch user info
        const userResponse = await fetch('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${githubToken}` }
        });
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/user/repos', {
          headers: { Authorization: `Bearer ${githubToken}` }
        });
        const reposData = await reposResponse.json();
        setRepoData(reposData);

        // Calculate achievements based on GitHub data
        const newAchievements: AchievementCategory[] = [
          {
            title: "Coding Excellence",
            achievements: [
              {
                icon: <Code2 className="w-8 h-8 text-blue-500" />,
                name: "Code Quality Champion",
                description: "Number of public repositories",
                progress: calculateProgress(userData.public_repos, 20)
              },
              {
                icon: <GitPullRequest className="w-8 h-8 text-purple-500" />,
                name: "Pull Request Master",
                description: "Total number of repositories",
                progress: calculateProgress(reposData.length, 15)
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-500" />,
                name: "Fast Resolver",
                description: "Number of public gists",
                progress: calculateProgress(userData.public_gists, 10)
              }
            ]
          },
          {
            title: "Community Impact",
            achievements: [
              {
                icon: <Users className="w-8 h-8 text-green-500" />,
                name: "Community Leader",
                description: "Number of GitHub followers",
                progress: calculateProgress(userData.followers, 50)
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-500" />,
                name: "Project Stargazer",
                description: "Total repository stars",
                progress: calculateProgress(
                  reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0), 
                  100
                )
              },
              {
                icon: <Award className="w-8 h-8 text-red-500" />,
                name: "Mentor Status",
                description: "Number of people you're following",
                progress: calculateProgress(userData.following, 30)
              }
            ]
          }
        ];

        setAchievements(newAchievements);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, [githubToken]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userData ? `${userData.name || 'Developer'}'s Achievements` : 'Achievements'}
          </h1>
          <p className="text-gray-600 mt-2">Track your progress and earn rewards</p>
        </div>
        <Award className="w-12 h-12 text-purple-500" />
      </div>

      {achievements.length > 0 ? (
        <div className="space-y-8">
          {achievements.map((category, index) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading achievements...</p>
        </div>
      )}
    </div>
  );
}