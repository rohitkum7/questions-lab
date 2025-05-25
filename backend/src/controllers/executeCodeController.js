import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
      req.body;

    const userId = req.user.id;
    //Validate Test Cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: "Invalid or Missing test cases" });
    }

    //2 Prepare each Testcases for judge0 batch submissions

    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    //Send batch of submissions to judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    //4. Poll judge0 for results of all submitted test cases
    const results = await pollBatchResults(tokens);

    console.log("Result--------------");
    console.log(results);

    //Analye test case results
    res.status(200).json({
      success: true,
      message: "Code Executed! Successfully!",
    });
  } catch (error) {}
};
