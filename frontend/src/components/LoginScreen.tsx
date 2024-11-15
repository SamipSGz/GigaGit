import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mt-4 gradient-text">Welcome to GigaGit</h1>
          <p className="text-gray-600 text-center mt-2">
            Level up your coding journey with gamified GitHub integration
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Github className="w-5 h-5" />
          <span>Continue with GitHub</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}