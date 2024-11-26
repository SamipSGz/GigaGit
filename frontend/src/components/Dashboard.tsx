import React, { useEffect, useState } from 'react';
import { Code2, GitPullRequest, Star, Users, Activity, Award } from 'lucide-react';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

interface GitHubAchievement {
  title: string;
  icon: React.ReactNode;
  progress: number;
  description: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const { githubToken, user } = useAuth();

  const [achievements, setAchievements] = useState<GitHubAchievement[]>([
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: 'Bug Hunter',
      progress: 0,
      description: 'Number of public gists'
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      title: 'Popular Creator',
      progress: 0,
      description: 'Total repository stars'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Team Player',
      progress: 0,
      description: 'Number of GitHub followers'
    }
  ]);

  const calculateChangePercentage = (currentValue: number, previousValue: number): string => {
    if (previousValue === 0) return '+0%';
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
  };

  useEffect(() => {
    if (!githubToken) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
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

        // Calculate achievements
        const newAchievements = [
          {
            ...achievements[0],
            progress: calculateProgress(userData.public_gists, 10),
          },
          {
            ...achievements[1],
            progress: calculateProgress(
              reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
              50
            ),
          },
          {
            ...achievements[2],
            progress: calculateProgress(userData.followers, 20),
          }
        ];

        setAchievements(newAchievements);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchUserData();
  }, [githubToken]);

  // Helper function to calculate progress
  const calculateProgress = (value: number, divisor: number): number => {
    const progress = Math.floor((value || 0) / divisor * 100);
    return Math.min(progress, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {userData?.name || 'Developer'}!
        </h1>
        <p className="text-gray-600 mt-2">Your coding journey continues. Keep pushing!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Code2 className="w-6 h-6 text-emerald-600" />}
          title="Public Repositories"
          value={userData?.public_repos || 'N/A'}
          change={calculateChangePercentage(
            userData?.public_repos || 0, 
            Math.floor((userData?.public_repos || 0) * 0.9)
          )}
          positive={true}
        />
        <StatCard
          icon={<GitPullRequest className="w-6 h-6 text-blue-600" />}
          title="Followers"
          value={userData?.followers || 'N/A'}
          change={calculateChangePercentage(
            userData?.followers || 0, 
            Math.floor((userData?.followers || 0) * 0.9)
          )}
          positive={true}
        />
        <StatCard
          icon={<Star className="w-6 h-6 text-yellow-500" />}
          title="Repository Stars"
          value={repoData.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
          change={calculateChangePercentage(
            repoData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            Math.floor(repoData.reduce((sum, repo) => sum + repo.stargazers_count, 0) * 0.9)
          )}
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed repoData={repoData} />
        <AchievementsPanel achievements={achievements} />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, positive }: any) {
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

function ActivityFeed({ repoData }: { repoData: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Repositories</h2>
        <Activity className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {repoData.slice(0, 5).map((repo) => (
          <div key={repo.id} className="flex items-start space-x-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{repo.name}</h3>
              <p className="text-sm text-gray-600">{repo.description || 'No description'}</p>
            </div>
            <span className="text-xs text-gray-500">{repo.language}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsPanel({ achievements }: { achievements: GitHubAchievement[] }) {
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
            {achievement.description && (
              <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}