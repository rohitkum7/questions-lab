import { db } from "../libs/db.js";

export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is missing or invalid" });
    }

    const submission = await db.submission.findMany({
      where: { userId },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submission,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch submissions" });
  }
};

export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const problemId = req.params?.problemId;

    if (!userId || !problemId) {
      return res.status(400).json({
        success: false,
        error: "User ID or Problem ID is missing or invalid",
      });
    }

    const submissions = await db.submission.findMany({
      where: {
        userId,
        problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch submissions" });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params?.problemId;

    if (!problemId) {
      return res
        .status(400)
        .json({ success: false, error: "Problem ID is missing or invalid" });
    }

    const count = await db.submission.count({
      where: { problemId },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      count,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch submissions" });
  }
};
