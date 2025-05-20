import { useState } from "react";

const usePatent = () => {
  const [draftPatent, setDraftPatent] = useState<File | null>(null);
  const [ErrorDraftPatent, setErrorDraftPatent] = useState<boolean>(false);

  const handleDraftPatenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setDraftPatent(file);
      setErrorDraftPatent(false);
    } else {
      setDraftPatent(null);
      setErrorDraftPatent(true);
    }
  };
  return {
    draftPatent,
    handleDraftPatenChange,
    ErrorDraftPatent,
  };
};

export default usePatent;
