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
  const [goodPoints, setgoodPoints] = useState<string[]>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [improvedCode, setImprovedCode] = useState<string>('');
  const [points, setPoints] = useState(0);

  const handleScoreCode = async () => {
    setLoading(true);
    try {
      // Prepare the code to be sent with \n for newlines
      const formattedCode = code.replace(/\n/g, '\\n').replace(/"/g, '\\"');
      const payload = JSON.stringify({ code: formattedCode });

      // Make API call to backend
      const response = await fetch("http://localhost:8000/grade-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text(); // Get the raw text response
      const parsedResult = parseFeedback(result);




      setScore(parsedResult.score);
      setgoodPoints(parsedResult.goodPoints);
      setIssues(parsedResult.issues);
      setSuggestions(parsedResult.suggestions);
      setImprovedCode(parsedResult.improvedCode);
      setPoints((prevPoints) => prevPoints + parsedResult.score * 10);

    } catch (error) {
      console.error("Error scoring code:", error);
    } finally {
      setLoading(false);
    }
  };

  function parseFeedback(text: string) {
    const extractSection = (section: string) => {
      const regex = new RegExp(`${section}:[\\s\\S]*?(?=\\n\\n\\w|$)`, "g");
      const match = text.match(regex);
      return match
        ? match[0]
          .replace(`${section}:`, "")
          .trim()
          .split("\n")
          .map(line => line.replace(/^-|\*/g, "").trim())
        : [];
    };

    const score = parseInt(text.match(/Score: (\d+)/)?.[1] ?? "", 10);
    const improvedCode = text.match(/Improved Code:\n```javascript\n([\s\S]*?)```/)?.[1].trim() ?? "";

    return {
      score,
      goodPoints: extractSection("Good Points"),
      issues: extractSection("Issues"),
      suggestions: extractSection("Suggestions"),
      improvedCode,
      changes: extractSection("Changes made on Improved code")
    };
  }


  const handleUseImprovedCode = () => {
    setCode(improvedCode);
    setImprovedCode("");
    setScore(null);
    setgoodPoints([]);
    setIssues([]);
    setSuggestions([]);
  };

  const formatContent = (content: string[]) => {
    return content.map((line, index) => {
      if (line.startsWith('*')) {
        return (
          <div key={index} className="flex items-start ml-4 mb-1">
            <span className="mr-2">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.endsWith(':')) {
        return (
          <div key={index} className="font-bold text-gray-800 mt-4 mb-2">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="mb-1">
          {line}
        </div>
      );
    });
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
              <div className={`text-2xl font-bold ${score >= 7 ? 'text-green-600' :
                score >= 4 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                Score: {score}/10
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${score >= 7 ? 'bg-green-500' :
                    score >= 4 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>

            <div className="text-gray-600">
              <strong>Good Points:</strong>
              <ul className="list-disc list-inside">
                {formatContent(goodPoints).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="text-gray-600">
              <strong>Issues:</strong>
              <ul className="list-disc list-inside">
                {formatContent(issues).map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>

            <div className="text-gray-600">
              <strong>Suggestions:</strong>
              <ul className="list-disc list-inside">
                {formatContent(suggestions).map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
            {improvedCode && improvedCode !== code && (
              <div className="mt-4">
                <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-x-auto">
                  {improvedCode}
                </pre>
                <button
                  onClick={handleUseImprovedCode}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mt-2"
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