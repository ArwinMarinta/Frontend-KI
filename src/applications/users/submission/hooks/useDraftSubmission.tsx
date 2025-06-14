import { useState } from "react";

const useDraftSubmission = () => {
  const [draftPatent, setDraftPatent] = useState<File | null>(null);
  const [errorDraftPatent, setErrorDraftPatent] = useState<string | null>(null);

  const handleDraftPatenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] || null;

      if (file) {
        setDraftPatent(file);
        setErrorDraftPatent(null);
      } else {
        setDraftPatent(null);
        setErrorDraftPatent("Draft patent wajib diunggah");
      }
    }
  };

  return {
    draftPatent,
    handleDraftPatenChange,
    errorDraftPatent,
    setErrorDraftPatent,
    setDraftPatent,
  };
};

export default useDraftSubmission;
