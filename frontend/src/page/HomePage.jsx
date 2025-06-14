import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader, Loader2 } from "lucide-react";
import { ProblemsTable } from "../components/ProblemsTable";
import { useAuthStore } from "../store/useAuthStore";
import { useActions } from "../store/useAction";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const { refreshTrigger } = useActions();
  const { authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    // Only call getAllProblems when auth is ready
    if (!isCheckingAuth && authUser) {
      // console.log("Auth confirmed, fetching problems...");
      getAllProblems();
    } else if (!isCheckingAuth && !authUser) {
      // console.log("No auth user found");
    }
  }, [getAllProblems, authUser, isCheckingAuth, refreshTrigger]);

  // console.log("Current problems:", problems);

  // Don't render until auth check is complete
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4">
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-primary">QuestionsLab</span>
      </h1>

      <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
        Level up your coding game! Inspired by LeetCode, this platform helps you
        build confidence and crack coding interviews one problem at a time.
      </p>
      {problems.length > 0 ? (
        <ProblemsTable problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          {/* No problems found */}
          <Loader2 className="size-10 animate-spin mx-auto" />
          No problem can withstand the assault of sustained thinking.
        </p>
      )}
    </div>
  );
};

export default HomePage;
