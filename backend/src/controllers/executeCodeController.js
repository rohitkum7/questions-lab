// import { db } from "../libs/db.js";
// import {
//   getLanguageName,
//   pollBatchResults,
//   submitBatch,
// } from "../libs/judge0.lib.js";

// export const executeCode = async (req, res) => {
//   try {
//     const { source_code, language_id, stdin, expected_outputs, problemId } =
//       req.body;

//     const userId = req.user.id;
//     //Validate Test Cases
//     if (
//       !Array.isArray(stdin) ||
//       stdin.length === 0 ||
//       !Array.isArray(expected_outputs) ||
//       expected_outputs.length !== stdin.length
//     ) {
//       return res.status(400).json({ error: "Invalid or Missing test cases" });
//     }

//     //2 Prepare each Testcases for judge0 batch submissions

//     const submissions = stdin.map((input) => ({
//       source_code,
//       language_id,
//       stdin: input,
//     }));

//     //3. Send batch of submissions to judge0
//     const submitResponse = await submitBatch(submissions);

//     const tokens = submitResponse.map((res) => res.token);

//     //4. Poll judge0 for results of all submitted test cases
//     const results = await pollBatchResults(tokens);

//     // console.log("Result--------------");
//     // console.log(results);

//     //Analye test case results
//     let allPassed = true;
//     const detailedResults = results.map((result, i) => {
//       const stdout = result.stdout?.trim();
//       const expected_output = expected_outputs[i]?.trim();
//       const passed = stdout === expected_output;

//       if (!passed) allPassed = false;

//       return {
//         testCase: i + 1,
//         passed,
//         stdout,
//         expected: expected_output,
//         stderr: result.stderr || null,
//         compile_output: result.compile_output || null,
//         status: result.status.description,
//         memory: result.memory ? `${result.memory} KB` : undefined,
//         time: result.time ? `${result.time} s` : undefined,
//       };

//       // console.log(`Testcase #${i + 1}`);
//       // console.log(`Input ${stdin[i]}`);
//       // console.log(`Expected Output for testcase ${expected_output}`);
//       // console.log(`Actual output ${stdout}`);

//       // console.log(`Matched ${passed}`);
//     });

//     // console.log(detailedResults);

//     //Store submission summary
//     const submission = await db.submission.create({
//       data: {
//         userId,
//         problemId,
//         sourceCode: source_code,
//         language: getLanguageName(language_id),
//         stdin: stdin.join("\n"),
//         stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
//         stderr: detailedResults.some((r) => r.stderr)
//           ? JSON.stringify(detailedResults.map((r) => r.stderr))
//           : null,
//         compileOutput: detailedResults.some((r) => r.compile_output)
//           ? JSON.stringify(detailedResults.map((r) => r.compile_output))
//           : null,
//         status: allPassed ? "Accepted" : "Wrong Answer",
//         memory: detailedResults.some((r) => r.memory)
//           ? JSON.stringify(detailedResults.map((r) => r.memory))
//           : null,
//         time: detailedResults.some((r) => r.time)
//           ? JSON.stringify(detailedResults.map((r) => r.time))
//           : null,
//       },
//     });

//     //If all passed = true mark problem solved for the current user
//     if (allPassed) {
//       await db.problemSolved.upsert({
//         where: {
//           userId_problemId: {
//             userId,
//             problemId,
//           },
//         },
//         update: {},
//         create: {
//           userId,
//           problemId,
//         },
//       });
//     }

//     //8. Save individual test case results
//     const testCaseResults = detailedResults.map((result) => ({
//       submissionId: submission.id,
//       testCase: result.testCase,
//       passed: result.passed,
//       stdout: result.stdout,
//       expected: result.expected,
//       stderr: result.stderr,
//       compileOutput: result.compile_output,
//       status: result.status,
//       memory: result.memory,
//       time: result.time,
//     }));

//     await db.testCaseResult.createMany({
//       data: testCaseResults,
//     });

//     const submissionWithTestCase = await db.submission.findUnique({
//       where: {
//         id: submission.id,
//       },
//       include: {
//         testCases: true,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Code Executed! Successfully!",
//       submission: submissionWithTestCase,
//     });
//   } catch (error) {
//     console.error("Error executing code:", error.message);
//     res.status(500).json({ error: "Failed to submit code" });
//   }
// };

// ---------------------------------------------------------------------------------------------------------------------------

// import { db } from "../libs/db.js";
// import {
//   getLanguageName,
//   pollBatchResults,
//   submitBatch,
// } from "../libs/judge0.lib.js";

// // Function to run code without saving to database
// export const runCode = async (req, res) => {
//   try {
//     const { source_code, language_id, stdin, expected_outputs } = req.body;

//     // Validate Test Cases
//     if (
//       !Array.isArray(stdin) ||
//       stdin.length === 0 ||
//       !Array.isArray(expected_outputs) ||
//       expected_outputs.length !== stdin.length
//     ) {
//       return res.status(400).json({ error: "Invalid or Missing test cases" });
//     }

//     // Execute code and get results
//     const executionResults = await executeCodeLogic(
//       source_code,
//       language_id,
//       stdin,
//       expected_outputs
//     );

//     // Mark problem as solved if all test cases passed
//     if (executionResults.allPassed) {
//       console.log("Success");
//     }

//     res.status(200).json({
//       success: true,
//       message: "Code executed successfully!",
//       results: executionResults,
//     });
//   } catch (error) {
//     console.error("Error running code:", error.message);
//     res.status(500).json({ error: "Failed to run code" });
//   }
// };

// // Function to submit code (run + save to database)
// export const submitCode = async (req, res) => {
//   try {
//     const { source_code, language_id, stdin, expected_outputs, problemId } =
//       req.body;
//     const userId = req.user.id;

//     // Validate Test Cases
//     if (
//       !Array.isArray(stdin) ||
//       stdin.length === 0 ||
//       !Array.isArray(expected_outputs) ||
//       expected_outputs.length !== stdin.length
//     ) {
//       return res.status(400).json({ error: "Invalid or Missing test cases" });
//     }

//     // Execute code and get results
//     const executionResults = await executeCodeLogic(
//       source_code,
//       language_id,
//       stdin,
//       expected_outputs
//     );

//     // Save submission to database
//     const submission = await saveSubmission(
//       userId,
//       problemId,
//       source_code,
//       language_id,
//       stdin,
//       executionResults
//     );

//     // Mark problem as solved if all test cases passed
//     if (executionResults.allPassed) {
//       await markProblemSolved(userId, problemId);
//     }

//     // Get submission with test cases
//     const submissionWithTestCase = await db.submission.findUnique({
//       where: { id: submission.id },
//       include: { testCases: true },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Code submitted successfully!",
//       submission: submissionWithTestCase,
//     });
//   } catch (error) {
//     console.error("Error submitting code:", error.message);
//     res.status(500).json({ error: "Failed to submit code" });
//   }
// };

// // Core logic for executing code (shared between run and submit)
// const executeCodeLogic = async (
//   source_code,
//   language_id,
//   stdin,
//   expected_outputs
// ) => {
//   // Prepare each test case for judge0 batch submissions
//   const submissions = stdin.map((input) => ({
//     source_code,
//     language_id,
//     stdin: input,
//   }));

//   // Send batch of submissions to judge0
//   const submitResponse = await submitBatch(submissions);
//   const tokens = submitResponse.map((res) => res.token);

//   // Poll judge0 for results of all submitted test cases
//   const results = await pollBatchResults(tokens);

//   // Analyze test case results
//   let allPassed = true;
//   const detailedResults = results.map((result, i) => {
//     const stdout = result.stdout?.trim();
//     const expected_output = expected_outputs[i]?.trim();
//     const passed = stdout === expected_output;

//     if (!passed) allPassed = false;

//     return {
//       testCase: i + 1,
//       passed,
//       stdout,
//       expected: expected_output,
//       stderr: result.stderr || null,
//       compile_output: result.compile_output || null,
//       status: result.status.description,
//       memory: result.memory ? `${result.memory} KB` : undefined,
//       time: result.time ? `${result.time} s` : undefined,
//     };
//   });

//   return {
//     allPassed,
//     detailedResults,
//   };
// };

// // Helper function to save submission to database
// const saveSubmission = async (
//   userId,
//   problemId,
//   source_code,
//   language_id,
//   stdin,
//   executionResults
// ) => {
//   const { allPassed, detailedResults } = executionResults;

//   // Store submission summary
//   const submission = await db.submission.create({
//     data: {
//       userId,
//       problemId,
//       sourceCode: source_code,
//       language: getLanguageName(language_id),
//       stdin: stdin.join("\n"),
//       stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
//       stderr: detailedResults.some((r) => r.stderr)
//         ? JSON.stringify(detailedResults.map((r) => r.stderr))
//         : null,
//       compileOutput: detailedResults.some((r) => r.compile_output)
//         ? JSON.stringify(detailedResults.map((r) => r.compile_output))
//         : null,
//       status: allPassed ? "Accepted" : "Wrong Answer",
//       memory: detailedResults.some((r) => r.memory)
//         ? JSON.stringify(detailedResults.map((r) => r.memory))
//         : null,
//       time: detailedResults.some((r) => r.time)
//         ? JSON.stringify(detailedResults.map((r) => r.time))
//         : null,
//     },
//   });

//   // Save individual test case results
//   const testCaseResults = detailedResults.map((result) => ({
//     submissionId: submission.id,
//     testCase: result.testCase,
//     passed: result.passed,
//     stdout: result.stdout,
//     expected: result.expected,
//     stderr: result.stderr,
//     compileOutput: result.compile_output,
//     status: result.status,
//     memory: result.memory,
//     time: result.time,
//   }));

//   await db.testCaseResult.createMany({
//     data: testCaseResults,
//   });

//   return submission;
// };

// // Helper function to mark problem as solved
// const markProblemSolved = async (userId, problemId) => {
//   await db.problemSolved.upsert({
//     where: {
//       userId_problemId: {
//         userId,
//         problemId,
//       },
//     },
//     update: {},
//     create: {
//       userId,
//       problemId,
//     },
//   });
// };

// // Legacy function name for backward compatibility
// export const executeCode = submitCode;

//-----------------------------------------------------------------------------------------------------------------
import { db } from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

// Function to run code without saving to database (shows all test results)
export const runCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs } = req.body;

    // Validate Test Cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: "Invalid or Missing test cases" });
    }

    // Execute code and get results
    const executionResults = await executeCodeLogic(
      source_code,
      language_id,
      stdin,
      expected_outputs
    );

    res.status(200).json({
      success: true,
      message: executionResults.allPassed
        ? "All test cases passed!"
        : `${executionResults.passedCount}/${executionResults.totalCount} test cases passed`,
      results: {
        allPassed: executionResults.allPassed,
        passedCount: executionResults.passedCount,
        totalCount: executionResults.totalCount,
        testCases: executionResults.detailedResults,
      },
    });

    console.log(executionResults.detailedResults);
  } catch (error) {
    console.error("Error running code:", error.message);
    res.status(500).json({ error: "Failed to run code" });
  }
};

// Function to submit code (run + save to database)
export const submitCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
      req.body;
    const userId = req.user.id;

    // Validate Test Cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: "Invalid or Missing test cases" });
    }

    // Execute code and get results (same as runCode)
    const executionResults = await executeCodeLogic(
      source_code,
      language_id,
      stdin,
      expected_outputs
    );

    // Save submission to database
    const submission = await saveSubmission(
      userId,
      problemId,
      source_code,
      language_id,
      stdin,
      executionResults
    );

    // Mark problem as solved if all test cases passed
    if (executionResults.allPassed) {
      await markProblemSolved(userId, problemId);
    }

    // Get submission with test cases
    const submissionWithTestCase = await db.submission.findUnique({
      where: { id: submission.id },
      include: { testCases: true },
    });

    res.status(200).json({
      success: true,
      message: executionResults.allPassed
        ? "Code submitted successfully! All test cases passed!"
        : "Code submitted successfully!",
      submission: submissionWithTestCase,
      results: {
        allPassed: executionResults.allPassed,
        passedCount: executionResults.passedCount,
        totalCount: executionResults.totalCount,
        testCases: executionResults.detailedResults,
      },
    });
  } catch (error) {
    console.error("Error submitting code:", error.message);
    res.status(500).json({ error: "Failed to submit code" });
  }
};

// Core logic for executing code (shared between run and submit)
const executeCodeLogic = async (
  source_code,
  language_id,
  stdin,
  expected_outputs
) => {
  // Prepare each test case for judge0 batch submissions
  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));

  // Send batch of submissions to judge0
  const submitResponse = await submitBatch(submissions);
  const tokens = submitResponse.map((res) => res.token);

  // Poll judge0 for results of all submitted test cases
  const results = await pollBatchResults(tokens);

  // Analyze test case results
  let allPassed = true;
  let passedCount = 0;
  const detailedResults = results.map((result, i) => {
    const stdout = result.stdout?.trim();
    const expected_output = expected_outputs[i]?.trim();
    const passed = stdout === expected_output;

    if (passed) {
      passedCount++;
    } else {
      allPassed = false;
    }

    return {
      testCase: i + 1,
      input: stdin[i],
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      compile_output: result.compile_output || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  return {
    allPassed,
    passedCount,
    totalCount: stdin.length,
    detailedResults,
  };
};

// Helper function to save submission to database
const saveSubmission = async (
  userId,
  problemId,
  source_code,
  language_id,
  stdin,
  executionResults
) => {
  const { allPassed, detailedResults } = executionResults;

  // Store submission summary
  const submission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
      stderr: detailedResults.some((r) => r.stderr)
        ? JSON.stringify(detailedResults.map((r) => r.stderr))
        : null,
      compileOutput: detailedResults.some((r) => r.compile_output)
        ? JSON.stringify(detailedResults.map((r) => r.compile_output))
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailedResults.some((r) => r.memory)
        ? JSON.stringify(detailedResults.map((r) => r.memory))
        : null,
      time: detailedResults.some((r) => r.time)
        ? JSON.stringify(detailedResults.map((r) => r.time))
        : null,
    },
  });

  // Save individual test case results
  const testCaseResults = detailedResults.map((result) => ({
    submissionId: submission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));

  await db.testCaseResult.createMany({
    data: testCaseResults,
  });

  return submission;
};

// Helper function to mark problem as solved
const markProblemSolved = async (userId, problemId) => {
  await db.problemSolved.upsert({
    where: {
      userId_problemId: {
        userId,
        problemId,
      },
    },
    update: {},
    create: {
      userId,
      problemId,
    },
  });
};
