import React, { useEffect, useMemo } from "react";
import Calendar from "./ui/Calender";
import Streaks from "./ui/Streaks";
import { DisplayAttempted } from "./ui/DisplayAttempted";
import { useSubmissionStore } from "../store/useSubmissionStore";

export const Dashboard = () => {
  const {
    isLoading,
    acceptedSubmissions,
    acceptedSubmissionsCount,
    getAllAcceptedSubmissionsByUser,
  } = useSubmissionStore();

  useEffect(() => {
    getAllAcceptedSubmissionsByUser();
  }, []);

  console.log(acceptedSubmissions);

  const problemCounts = useMemo(() => {
    const counts = {
      easy: new Set(),
      medium: new Set(),
      hard: new Set(),
    };
    acceptedSubmissions.forEach((sub) => {
      const difficulty = sub.problem.difficulty;
      if (difficulty === "EASY") {
        counts.easy.add(sub.problemId);
      } else if (difficulty === "MEDIUM") {
        counts.medium.add(sub.problemId);
      } else if (difficulty === "HARD") {
        counts.hard.add(sub.problemId);
      }
    });
    return {
      easy: counts.easy.size,
      medium: counts.medium.size,
      hard: counts.hard.size,
    };
  }, [acceptedSubmissions]);

  return (
    <div>
      {/* Questions Solved */}
      <h1 className="text-3xl font-bold mb-2">Welcome to Your DashBoard</h1>
      <div className="stats bg-base-100 border-base-300 border mt-6">
        <div className="stat">
          <div className="stat-title">
            <span className="text-purple-700">Total</span> Questions Solved
          </div>
          <div className="stat-value text-purple-700">
            {acceptedSubmissionsCount || 0}
          </div>
        </div>

        {/* Easy Questions */}
        <div className="stat">
          <div className="stat-title">
            <span className="text-green-600">Easy</span> Questions Solved
          </div>
          <div className="stat-value text-green-600">
            {problemCounts.easy || 0}
          </div>
        </div>

        {/* Medium Questions Solved */}

        <div className="stat">
          <div className="stat-title">
            <span className=" text-yellow-500">Medium</span> Questions Solved
          </div>
          <div className="stat-value text-yellow-500">
            {" "}
            {problemCounts.medium || 0}
          </div>
        </div>

        {/* Hard Questions Solved */}
        <div className="stat">
          <div className="stat-title">
            <span className=" text-red-500">Hard</span> Questions Solved
          </div>
          <div className="stat-value text-red-500"> {problemCounts.hard}</div>
        </div>
      </div>

      {/* Calender and Streaks */}

      <div className="flex mt-10 justify-around">
        <Calendar acceptedSubmissions={acceptedSubmissions} />
        <Streaks acceptedSubmissions={acceptedSubmissions} />
      </div>
      <div className="m-10">
        <h2 className="text-xl font-bold">Solved Problems</h2>
        {acceptedSubmissions.map((acceptedSub) => (
          <DisplayAttempted
            key={acceptedSub.problemId}
            problem={acceptedSub.problem.title}
            sourceCode={acceptedSub.sourceCode}
            language={acceptedSub.language}
          />
        ))}
      </div>
    </div>
  );
};
