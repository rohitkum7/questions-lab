//Judge0 with docker Desktop

// import axios from "axios";

// export const getJudge0LanguageId = (language) => {
//   const languageMap = {
//     PYTHON: 71,
//     JAVA: 62,
//     JAVASCRIPT: 63,
//   };
//   return languageMap[language.toUpperCase()]; //null
// };

// export const submitBatch = async (submissions) => {
//   const { data } = await axios.post(
//     `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
//     { submissions }
//   );
//   console.log("Submission Result: ", data);

//   return data; // [{token}, {token}, {token}]
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export const pollBatchResults = async (tokens) => {
//   while (true) {
//     const { data } = await axios.get(
//       `${process.env.JUDGE0_API_URL}/submissions/batch`,
//       {
//         params: {
//           tokens: tokens.join(","),
//           base64_encoded: false,
//         },
//       }
//     );

//     const results = data.submissions;

//     const isAllDone = results.every(
//       (r) => r.status.id !== 1 && r.status.id !== 2
//     );

//     if (isAllDone) return results;

//     await sleep(1000);
//   }
// };

// export function getLanguageName(languageId) {
//   const LANGUAGE_NAMES = {
//     74: "TypeScript",
//     63: "JAVASCRIPT",
//     71: "Python",
//     62: "Java",
//   };
//   return LANGUAGE_NAMES[languageId] || "Unknown";
// }

//-------------------------------------------------------------------------------------

//Judge0 with RapidApi integration

import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };
  return languageMap[language.toUpperCase()]; //null
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    }
  );
  // console.log("Submission Result: ", data);

  return data; // [{token}, {token}, {token}]
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST, // e.g. "judge0-ce.p.rapidapi.com"
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
};

export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JAVASCRIPT",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}
