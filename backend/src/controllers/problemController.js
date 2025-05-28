import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  // get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to create a problem",
    });
  }

  try {
    //Loop through each refrence solution for different languages
    //Langauage: Java
    // Code: ...
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      console.log("hi");
      if (!languageId) {
        return res.status(400).json({
          success: false,
          message: `language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      // going to check the user role once again

      const submissionResults = await submitBatch(submissions); // token comming from submitbatch

      const tokens = submissionResults.map((res) => res.token);

      //Polling is basically ungli karna
      const results = await pollBatchResults(tokens);

      // loop through each refrence solution for different language
      for (let i = 0; i < results.length; i++) {
        const result = results[1];
        console.log("Result----", result);

        console.log(
          `TestCase ${
            i + 1
          } and language ${language} ---- result ${JSON.stringify(
            result.status.description
          )}`
        );

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      //save the problem to the database
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: "new problem created",
        problem: newProblem,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "creation of new problem failed",
      error,
    });
  }
};
export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });
    if (!problems) {
      return res.status(404).json({
        error: "No problems found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while Fetching Problems",
    });
  }
};
export const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Message Created Successfully",
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while Fetching Problem by id",
    });
  }
};
export const updateProblem = async (req, res) => {
  //Hint: id
  // id ---> problem (conditon)
  // update
  const { id } = req.params;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update a problem",
    });
  }

  try {
    const existingProblem = await db.problem.findUnique({
      where: { id },
    });

    if (!existingProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    // Optional: re-validate reference solutions
    if (referenceSolutions && testcases) {
      for (const [language, solutionCode] of Object.entries(
        referenceSolutions
      )) {
        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
          return res.status(400).json({
            success: false,
            message: `language ${language} is not supported`,
          });
        }

        const submissions = testcases.map(({ input, output }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((res) => res.token);
        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          if (result.status.id !== 3) {
            return res.status(400).json({
              error: `Testcase ${i + 1} failed for language ${language}`,
            });
          }
        }
      }
    }

    const updatedProblem = await db.problem.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Update Problem Error:", error);
    res.status(500).json({
      success: false,
      message: "Problem update failed",
      error,
    });
  }
};
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    await db.problem.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While deleting the problem",
    });
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: { userId: req.user.id },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems :", error);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};
