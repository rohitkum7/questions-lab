import React, { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  isFuture,
  addMonths,
  subMonths,
} from "date-fns";

const getSolvedDataFromSubmissions = (submissions = []) => {
  const map = {};
  for (const sub of submissions) {
    const dateStr = format(new Date(sub.updatedAt), "yyyy-MM-dd");
    map[dateStr] = (map[dateStr] || 0) + 1;
  }
  return map;
};

const getEmoji = (count = 0) => {
  if (count === 0) return "😢";
  if (count === 1) return "😁";
  return "🥳";
};

const Calendar = ({ acceptedSubmissions = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const solvedData = useMemo(
    () => getSolvedDataFromSubmissions(acceptedSubmissions),
    [acceptedSubmissions]
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  }, [currentMonth]);

  const monthLabel = format(currentMonth, "MMMM yyyy");

  const goToMonth = (offset) => {
    setCurrentMonth((prev) => addMonths(prev, offset));
  };

  return (
    <div className="w-[300px] border rounded-lg shadow-lg p-3 z-10">
      {/* Month Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => goToMonth(-1)}
          className="text-lg px-2 hover:text-primary"
        >
          ←
        </button>
        <h3 className="text-center font-semibold text-base">{monthLabel}</h3>
        <button
          onClick={() => goToMonth(1)}
          className="text-lg px-2 hover:text-primary"
        >
          →
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <div key={d} className="font-bold text-gray-600">
            {d}
          </div>
        ))}

        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const isFutureDate = isFuture(day);
          const isCurrentDay = isToday(day);
          const count = solvedData[dateKey] || 0;

          return (
            <div
              key={dateKey}
              className={`rounded flex flex-col items-center justify-center h-10 text-[10px] ${
                isCurrentDay ? "bg-primary text-white" : "bg-base-200"
              }`}
            >
              <span>{format(day, "d")}</span>
              <span>{!isFutureDate ? getEmoji(count) : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
