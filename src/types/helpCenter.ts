export interface HelpCenterType {
  id: number;
  email: string;
  phoneNumber: string;
  problem: string;
  message: string;
  answer: string | null;
  document: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FormReplyHelpCenter = {
  answer: string;
};

export interface FormCreateHelpCenter {
  email: string;
  phoneNumber: string;
  problem: string;
  message: string;
  document: File | null;
}
