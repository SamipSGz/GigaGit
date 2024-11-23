import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Code2, Star, Zap } from 'lucide-react';

export default function CodeScoring() {
  const [code, setCode] = useState<string>(`function calculateSum(numbers) {
  let sum = 0;
  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [improvedCode, setImprovedCode] = useState<string>('');
  const [points, setPoints] = useState(0);

  const handleScoreCode = async () => {
    setLoading(true);
    try {
      // Simulated backend response - In production, replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => {
        const randomScore = Math.floor(Math.random() * 11);
        resolve({
          data: {
            score: randomScore,
            feedback: randomScore < 5 
              ? "Code needs improvement in efficiency and readability."
              : "Good code quality with room for minor improvements.",
            improvedVersion: randomScore < 5 
              ? `// Improved version using reduce method
const calculateSum = numbers => 
  numbers.reduce((sum, num) => sum + num, 0);`
              : code
          }
        });
      }, 1000));

      const { score: newScore, feedback: newFeedback, improvedVersion } = response.data;
      setScore(newScore);
      setFeedback(newFeedback);
      setImprovedCode(improvedVersion);
      
      // Award points based on score
      const earnedPoints = Math.floor(newScore * 10);
      setPoints(prevPoints => prevPoints + earnedPoints);
    } catch (error) {
      console.error('Error scoring code:', error);
      setFeedback('Error analyzing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseImprovedCode = () => {
    setCode(improvedCode);
    setImprovedCode('');
    setScore(null);
    setFeedback('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Code Quality Scorer</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{points} points</span>
            </div>
            <button
              onClick={handleScoreCode}
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>{loading ? 'Analyzing...' : 'Score Code'}</span>
            </button>
          </div>
        </div>
        
        <div className="h-[300px]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {score !== null && (
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`text-2xl font-bold ${
                score >= 7 ? 'text-green-600' :
                score >= 4 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                Score: {score}/10
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    score >= 7 ? 'bg-green-500' :
                    score >= 4 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
            
            <div className="text-gray-600">{feedback}</div>

            {improvedCode && improvedCode !== code && (
              <div className="mt-4">
                <button
                  onClick={handleUseImprovedCode}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                >
                  <Zap className="w-4 h-4" />
                  <span>Use Improved Version</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}