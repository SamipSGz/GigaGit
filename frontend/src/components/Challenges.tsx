import React, { useState } from 'react';
import { Code2, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { executeCode } from '../utils/codeExecutor';
import { Challenge } from '../types/challenge';

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target. You may assume that each input would have exactly one solution.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1] (Because nums[0] + nums[1] == 9)"
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  return [];
}`,
      python: `def two_sum(nums, target):
    # Your code here
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    return new int[]{};
}`
    },
    testCases: [
      { input: [[2,7,11,15], 9], output: [0,1] },
      { input: [[3,2,4], 6], output: [1,2] }
    ]
  },
  {
    id: 2,
    title: "Palindrome Number",
    difficulty: "Easy",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      {
        input: "x = 121",
        output: "true (121 reads as 121 from left to right and from right to left)"
      }
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Your code here
  return false;
}`,
      python: `def is_palindrome(x):
    # Your code here
    return False`,
      cpp: `bool isPalindrome(int x) {
    // Your code here
    return false;
}`,
      java: `public boolean isPalindrome(int x) {
    // Your code here
    return false;
}`
    },
    testCases: [
      { input: [121], output: true },
      { input: [-121], output: false },
      { input: [10], output: false }
    ]
  }
];

const languageOptions = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'java', name: 'Java', extension: 'java' }
];

export default function Challenges() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState(challenges[currentChallenge].starterCode[selectedLanguage.id]);
  const [output, setOutput] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleRunCode = () => {
    const result = executeCode(code, selectedLanguage.id, challenges[currentChallenge]);
    setIsSuccess(result.success);
    setOutput(result.output);
  };

  const handleLanguageChange = (language: typeof languageOptions[0]) => {
    setSelectedLanguage(language);
    setCode(challenges[currentChallenge].starterCode[language.id]);
    setOutput('');
    setIsSuccess(null);
  };

  const handleNext = () => {
    const nextIndex = (currentChallenge + 1) % challenges.length;
    setCurrentChallenge(nextIndex);
    setCode(challenges[nextIndex].starterCode[selectedLanguage.id]);
    setOutput('');
    setIsSuccess(null);
  };

  const handlePrevious = () => {
    const prevIndex = currentChallenge === 0 ? challenges.length - 1 : currentChallenge - 1;
    setCurrentChallenge(prevIndex);
    setCode(challenges[prevIndex].starterCode[selectedLanguage.id]);
    setOutput('');
    setIsSuccess(null);
  };

  const challenge = challenges[currentChallenge];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Coding Challenge</h1>
          <p className="text-gray-600 mt-2">Sharpen your skills with daily problems</p>
        </div>
        <Code2 className="w-12 h-12 text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{challenge.title}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
          
          <div className="prose prose-indigo">
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            
            <h3 className="text-lg font-semibold mb-2">Examples:</h3>
            {challenge.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm">Input: {example.input}</p>
                <p className="font-mono text-sm">Output: {example.output}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Code Editor</span>
              </div>
              <select
                value={selectedLanguage.id}
                onChange={(e) => handleLanguageChange(
                  languageOptions.find(lang => lang.id === e.target.value)!
                )}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {languageOptions.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRunCode}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run Code</span>
            </button>
          </div>
          
          <div className="h-[400px]">
            <Editor
              height="100%"
              defaultLanguage={selectedLanguage.id}
              language={selectedLanguage.id}
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

          {output && (
            <div className={`p-4 ${
              isSuccess === true ? 'bg-green-50 text-green-800' :
              isSuccess === false ? 'bg-red-50 text-red-800' :
              'bg-gray-50 text-gray-800'
            }`}>
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}