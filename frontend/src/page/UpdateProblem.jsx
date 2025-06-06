import React from "react";
import UpdateProblemForm from "../components/UpdateProblemForm";
import { useNavigate, useLocation } from "react-router-dom";
export const UpdateProblem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { problemId, initialData } = location.state || {};
  const onSuccess = (updatedData) => {
    navigate("/home");
    console.log("Problem updated:", updatedData);
  };
  return (
    <div>
      <UpdateProblemForm
        problemId={problemId}
        initialData={initialData}
        onSuccess={onSuccess}
      />
    </div>
  );
};
