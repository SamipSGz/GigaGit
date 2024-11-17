import { Challenge } from '../types/challenge';

interface ExecutionResult {
  success: boolean;
  output: string;
}

export const executeCode = (code: string, language: string, challenge: Challenge): ExecutionResult => {
  try {
    switch (language) {
      case 'javascript':
        return executeJavaScript(code, challenge);
      case 'python':
        return executePython(code, challenge);
      case 'cpp':
        return executeCpp(code, challenge);
      case 'java':
        return executeJava(code, challenge);
      default:
        throw new Error('Unsupported language');
    }
  } catch (error) {
    return {
      success: false,
      output: `Error: ${error.message}`
    };
  }
};

const executeJavaScript = (code: string, challenge: Challenge): ExecutionResult => {
  const fn = new Function('return ' + code)();
  const results = challenge.testCases.map((test, index) => {
    try {
      const result = fn(...test.input);
      const passed = JSON.stringify(result) === JSON.stringify(test.output);
      return {
        passed,
        input: test.input,
        expected: test.output,
        actual: result,
        index
      };
    } catch (error) {
      return {
        passed: false,
        input: test.input,
        expected: test.output,
        actual: error.message,
        index
      };
    }
  });

  const success = results.every(r => r.passed);
  let output = '';

  if (success) {
    output = '✅ All test cases passed!\n\n';
    results.forEach(result => {
      output += `Test Case ${result.index + 1}:\n`;
      output += `Input: ${JSON.stringify(result.input)}\n`;
      output += `Output: ${JSON.stringify(result.actual)}\n\n`;
    });
  } else {
    output = '❌ Some test cases failed:\n\n';
    results.forEach(result => {
      output += `Test Case ${result.index + 1}: ${result.passed ? '✅ Passed' : '❌ Failed'}\n`;
      output += `Input: ${JSON.stringify(result.input)}\n`;
      output += `Expected: ${JSON.stringify(result.expected)}\n`;
      output += `Actual: ${JSON.stringify(result.actual)}\n\n`;
    });
  }

  return { success, output };
};

const executePython = (code: string, challenge: Challenge): ExecutionResult => {
  // Simulate Python execution with test cases
  const pythonToJS = (code: string): string => {
    // Basic Python to JavaScript conversion for simple functions
    return code
      .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'function $1($2) {')
      .replace(/return\s+(.+)/g, 'return $1;')
      .replace(/\s{4}/g, '  ')
      .replace(/elif/g, 'else if')
      .replace(/:/g, ' {')
      .replace(/True/g, 'true')
      .replace(/False/g, 'false')
      .replace(/None/g, 'null');
  };

  try {
    const jsCode = pythonToJS(code);
    return executeJavaScript(jsCode, challenge);
  } catch (error) {
    return {
      success: false,
      output: `Python Syntax Error: ${error.message}`
    };
  }
};

const executeCpp = (code: string, challenge: Challenge): ExecutionResult => {
  // Simulate C++ execution with test cases
  const cppToJS = (code: string): string => {
    // Basic C++ to JavaScript conversion for simple functions
    return code
      .replace(/vector<\w+>/g, 'Array')
      .replace(/int\s+(\w+)\s*\((.*?)\)/g, 'function $1($2)')
      .replace(/bool\s+(\w+)\s*\((.*?)\)/g, 'function $1($2)')
      .replace(/return\s+(.+);/g, 'return $1;')
      .replace(/true/g, 'true')
      .replace(/false/g, 'false');
  };

  try {
    const jsCode = cppToJS(code);
    return executeJavaScript(jsCode, challenge);
  } catch (error) {
    return {
      success: false,
      output: `C++ Syntax Error: ${error.message}`
    };
  }
};

const executeJava = (code: string, challenge: Challenge): ExecutionResult => {
  // Simulate Java execution with test cases
  const javaToJS = (code: string): string => {
    // Basic Java to JavaScript conversion for simple functions
    return code
      .replace(/public\s+(static\s+)?(\w+)\s+(\w+)\s*\((.*?)\)/g, 'function $3($4)')
      .replace(/int\[\]/g, 'Array')
      .replace(/boolean/g, 'bool')
      .replace(/return\s+(.+);/g, 'return $1;')
      .replace(/true/g, 'true')
      .replace(/false/g, 'false');
  };

  try {
    const jsCode = javaToJS(code);
    return executeJavaScript(jsCode, challenge);
  } catch (error) {
    return {
      success: false,
      output: `Java Syntax Error: ${error.message}`
    };
  }
};