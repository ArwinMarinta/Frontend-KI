export interface FaqCategoryType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  totalTypeDigunakan: string;
}

export interface FaqType {
  id: number;
  type: string;
  question: string;
  answer: string;
  process: string | null;
  createdAt: string;
  updatedAt: string;
}

export type FaqFormType = {
  question: string;
  answer: string;
};
