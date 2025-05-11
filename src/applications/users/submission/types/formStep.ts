export type FormStepProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export type SubmissionProps = {
  submissionType: string;
};

export type Form3Type = FormStepProps & SubmissionProps;
