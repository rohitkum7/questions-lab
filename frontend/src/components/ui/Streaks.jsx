import React, { useEffect, useState } from "react";
import { format, parseISO, subDays } from "date-fns";

// Utility to convert submissions to date map
const getSolvedDataFromSubmissions = (acceptedSubmissions) => {
  const solvedData = {};

  acceptedSubmissions.forEach((sub) => {
    const dateStr = format(new Date(sub.updatedAt), "yyyy-MM-dd");
    solvedData[dateStr] = (solvedData[dateStr] || 0) + 1;
  });

  return solvedData;
};

const StreakBox = ({ acceptedSubmissions }) => {
  const [highestStreak, setHighestStreak] = useState(0);
  const [todaySolved, setTodaySolved] = useState(0);

  useEffect(() => {
    const solvedData = getSolvedDataFromSubmissions(acceptedSubmissions);

    // 🔥 Compute Highest Streak
    const dates = Object.keys(solvedData).sort();
    let maxStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const prevDate = i > 0 ? new Date(dates[i - 1]) : null;

      if (
        i === 0 ||
        (prevDate &&
          format(subDays(currentDate, 1), "yyyy-MM-dd") ===
            format(prevDate, "yyyy-MM-dd"))
      ) {
        currentStreak = solvedData[dates[i]] > 0 ? currentStreak + 1 : 0;
      } else {
        currentStreak = solvedData[dates[i]] > 0 ? 1 : 0;
      }

      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    }

    setHighestStreak(maxStreak);

    // 📅 Compute Today's Solved
    const todayKey = format(new Date(), "yyyy-MM-dd");
    setTodaySolved(solvedData[todayKey] || 0);
  }, [acceptedSubmissions]);

  return (
    <div className="w-72 border shadow-md rounded-xl p-4 text-sm flex flex-col justify-center align-middle gap-y-3">
      <h2 className="text-lg font-semibold text-center mb-2">
        🔥 Streak's Summary
      </h2>
      <div className=" flex flex-col justify-center py-2">
        <p className="text-xl font-semibold">Highest Streak day(s)</p>
        <p className="text-3xl font-bold mt-2">🔥 {highestStreak}</p>
      </div>
      <div className="flex flex-col justify-center py-2">
        <span className="text-xl font-semibold">Today Solved</span>
        <span className="text-3xl font-bold mt-2"> ⚡ {todaySolved}</span>
      </div>
    </div>
  );
};

export default StreakBox;
