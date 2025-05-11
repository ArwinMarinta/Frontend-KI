import { useState } from "react";

const useSubmissionType = () => {
  const [error, setError] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submissionType, setSubmissionType] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value;
    setSubmissionType(value);

    if (value.trim() === "") {
      setError(true); // Menandakan bahwa input kosong
    } else {
      setError(false); // Menandakan bahwa input valid
    }
  };

  const handlePrevStep2 = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep2 = () => {
    if (submissionType.trim() === "") {
      setError(true);
      return;
    }

    if (currentStep < 3 && !error) {
      setCurrentStep(currentStep + 1);
    }
  };

  return {
    submissionType,
    setSubmissionType,
    handleChange,
    error,
    currentStep,
    setCurrentStep,
    handleNextStep2,
    handlePrevStep2,
    setError,
  };
};

export default useSubmissionType;
