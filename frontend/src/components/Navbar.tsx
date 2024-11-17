import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Star, Trophy, Award, BookOpen, User, Code2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/dashboard" className="flex items-center space-x-3">
            <Github className="w-8 h-8" />
            <span className="text-xl font-bold">GigaGit</span>
          </NavLink>
          
          <div className="flex items-center space-x-8">
            <NavItem to="/leaderboard" icon={<Trophy className="w-5 h-5" />} text="Leaderboard" />
            <NavItem to="/achievements" icon={<Star className="w-5 h-5" />} text="Achievements" />
            <NavItem to="/rewards" icon={<Award className="w-5 h-5" />} text="Rewards" />
            <NavItem to="/learn" icon={<BookOpen className="w-5 h-5" />} text="Learn" />
            <NavItem to="/challenges" icon={<Code2 className="w-5 h-5" />} text="Challenges" />
            
            <NavLink to="/profile" className="flex items-center space-x-3 ml-8 hover:opacity-80 transition-opacity">
              <img
                className="w-8 h-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
              <User className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, text, to }: { icon: React.ReactNode; text: string; to: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex items-center space-x-2 transition-colors ${
          isActive ? 'text-white' : 'text-gray-200 hover:text-white'
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}