import React from 'react';
import { BookOpen, Play, CheckCircle, Clock, Star } from 'lucide-react';

export default function Learning() {
  const courses = [
    {
      title: "Advanced Git Workflows",
      description: "Master complex Git operations and team collaboration",
      progress: 75,
      duration: "2.5 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      title: "Clean Code Principles",
      description: "Write maintainable and efficient code",
      progress: 45,
      duration: "3 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      title: "Open Source Contribution",
      description: "Learn how to contribute to open source projects",
      progress: 0,
      duration: "2 hours",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300&h=200"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Path</h1>
          <p className="text-gray-600 mt-2">Enhance your development skills</p>
        </div>
        <BookOpen className="w-12 h-12 text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{course.level}</span>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <button
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors"
                >
                  {course.progress > 0 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Continue</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Course</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}