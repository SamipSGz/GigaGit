export interface Challenge {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: { input: string; output: string }[];
    starterCode: {
      javascript: string;
      python: string;
      cpp: string;
      java: string;
    };
    testCases: { input: any[]; output: any }[];
  }