// import React, { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { LoaderCircle } from "lucide-react";

// import HomePage from "./page/HomePage";
// import LoginPage from "./page/LoginPage";
// import SignupPage from "./page/SignupPage";
// import { useAuthStore } from "./store/useAuthStore";
// import Layout from "./layout/Layout";
// import AdminRoute from "./components/AdminRoute";
// import AddProblem from "./page/AddProblem";
// import ProblemPage from "./page/ProblemPage";

// const App = () => {
//   const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <LoaderCircle className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-start">
//       <Toaster />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route
//             index
//             element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
//           />
//         </Route>

//         <Route
//           path="/login"
//           element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
//         />

//         <Route
//           path="/signup"
//           element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
//         />

//         <Route
//           path="/problem/:id"
//           element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />}
//         />

//         <Route element={<AdminRoute />}>
//           <Route
//             path="/add-problem"
//             element={authUser ? <AddProblem /> : <Navigate to="/" />}
//           />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";
import ProblemPage from "./page/ProblemPage";
import AboutUs from "./page/AboutUs";
import { Profile } from "./page/Profile";
import { Dashboard } from "./components/Dashboard";
import { AccountInfo } from "./components/AccountInfo";
import { UpdateProblem } from "./page/UpdateProblem";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading until auth check is complete
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<AboutUs />} />

        <Route path="/home" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/home"} />}
        />

        <Route
          path="/problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />}
        />
        {/* <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        /> */}
        <Route
          path="/profile/dashboard"
          element={
            authUser ? (
              <Profile profileData={"dashboard"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/profile/account-info"
          element={
            authUser ? (
              <Profile profileData={"account-info"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/home" />}
          />
          <Route
            path="/update-problem"
            element={authUser ? <UpdateProblem /> : <Navigate to="/home" />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
