import React, { useState } from "react";

const useDraftSubmission = () => {
  const [draftPatent, setDraftPatent] = useState<File | null>(null);
  const [errorDraftPatent, setErrorDraftPatent] = useState<boolean>(false);

  const handleDraftPatenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] || null;

      if (file) {
        setDraftPatent(file);
        setErrorDraftPatent(false);
      } else {
        setDraftPatent(null);
        setErrorDraftPatent(true);
      }
    }
  };
  return {
    draftPatent,
    handleDraftPatenChange,
    errorDraftPatent,
    setErrorDraftPatent,
  };
};

export default useDraftSubmission;
