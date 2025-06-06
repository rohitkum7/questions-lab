// import { create } from "zustand";
// import { axiosInstance } from "../libs/axios";
// import toast from "react-hot-toast";

// export const useExecutionStore = create((set) => ({
//   isExecuting: false,
//   submission: null,
//   executeCode: async (
//     source_code,
//     language_id,
//     stdin,
//     expected_outputs,
//     problemId
//   ) => {
//     try {
//       set({ isExecuting: true });
//       console.log(
//         "Submission",
//         JSON.stringify({
//           source_code,
//           language_id,
//           stdin,
//           expected_outputs,
//           problemId,
//         })
//       );

//       const res = await axiosInstance.post("/execute-code", {
//         source_code,
//         language_id,
//         stdin,
//         expected_outputs,
//         problemId,
//       });
//       set({ submission: res.data.submission });
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error in executing code", error);
//       toast.error("Error executing code");
//     } finally {
//       set({ isExecuting: false });
//     }
//   },
// }));

// ---------------------------------------------------------------

// import { create } from "zustand";
// import { axiosInstance } from "../libs/axios";
// import toast from "react-hot-toast";

// export const useExecutionStore = create((set) => ({
//   // State
//   isExecuting: false,
//   runResults: null,
//   submission: null,

//   // Run code without saving to database
//   runCode: async (source_code, language_id, stdin, expected_outputs) => {
//     try {
//       set({ isExecuting: true, runResults: null });
//       console.log(
//         "Running Code",
//         JSON.stringify({
//           source_code,
//           language_id,
//           stdin,
//           expected_outputs,
//         })
//       );

//       const res = await axiosInstance.post("/execute-code/", {
//         source_code,
//         language_id,
//         stdin,
//         expected_outputs,
//       });

//       set({ runResults: res.data.results });
//       toast.success(res.data.message);
//       return res.data.results;
//     } catch (error) {
//       console.error("Error in running code", error);
//       toast.error("Error running code");
//       throw error;
//     } finally {
//       set({ isExecuting: false });
//     }
//   },

//   // Submit code (run + save to database)
//   submitCode: async (
//     source_code,
//     language_id,
//     stdin,
//     expected_outputs,
//     problemId
//   ) => {
//     try {
//       set({ isExecuting: true, submission: null });
//       console.log(
//         "Submitting Code",
//         JSON.stringify({
//           source_code,
//           language_id,
//           stdin,
//           expected_outputs,
//           problemId,
//         })
//       );

//       const res = await axiosInstance.post("/execute-code/submit", {
//         source_code,
//         language_id,
//         stdin,
//         expected_outputs,
//         problemId,
//       });

//       set({ submission: res.data.submission });
//       toast.success(res.data.message);
//       return res.data.submission;
//     } catch (error) {
//       console.error("Error in submitting code", error);
//       toast.error("Error submitting code");
//       throw error;
//     } finally {
//       set({ isExecuting: false });
//     }
//   },

//   // Reset functions
//   // clearRunResults: () => set({ runResults: null }),
//   // clearSubmission: () => set({ submission: null }),
//   // clearAll: () => set({ runResults: null, submission: null }),

//   // Getters
//   isExecuting: false, // Keep for backward compatibility
// }));

//-----------------------------------------------------------------------
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  // State
  isExecuting: false,
  runResults: null,
  submission: null,

  // Run code without saving to database
  runCode: async (source_code, language_id, stdin, expected_outputs) => {
    try {
      set({ isExecuting: true, runResults: null });
      console.log(
        "Running Code",
        JSON.stringify({
          source_code,
          language_id,
          stdin,
          expected_outputs,
        })
      );

      const res = await axiosInstance.post("/execute-code/", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
      });

      set({ runResults: res.data.results });

      // Show success/failure message with test case count
      if (res.data.results.allPassed) {
        toast.success(`All ${res.data.results.totalCount} test cases passed!`);
        toast.success(`Please don't forget to submit the Code!`);
      } else {
        toast.error(
          `❌ ${res.data.results.passedCount}/${res.data.results.totalCount} test cases passed`
        );
      }

      return res.data.results;
    } catch (error) {
      console.error("Error in running code", error);
      toast.error("Error running code");
      throw error;
    } finally {
      set({ isExecuting: false });
    }
  },

  // Submit code (run + save to database)
  submitCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true, submission: null });
      console.log(
        "Submitting Code",
        JSON.stringify({
          source_code,
          language_id,
          stdin,
          expected_outputs,
          problemId,
        })
      );

      const res = await axiosInstance.post("/execute-code/submit", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });

      set({ submission: res.data.submission });

      // Show success message with test results
      if (res.data.results.allPassed) {
        toast.success(
          `Submission successful! All ${res.data.results.totalCount} test cases passed!`
        );
      } else {
        toast.success(
          `Code submitted! ${res.data.results.passedCount}/${res.data.results.totalCount} test cases passed`
        );
      }

      return res.data.submission;
    } catch (error) {
      console.error("Error in submitting code", error);
      toast.error("Error submitting code");
      throw error;
    } finally {
      set({ isExecuting: false });
    }
  },

  // Reset functions
  clearRunResults: () => set({ runResults: null }),
  clearSubmission: () => set({ submission: null }),
  clearAll: () => set({ runResults: null, submission: null }),
}));
