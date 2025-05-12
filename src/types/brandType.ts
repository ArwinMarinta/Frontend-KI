export interface CategoryBrandType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type FormBrand = {
  title: string;
};

export type FormSubmissionBrand = {
  applicationType: string;
  brandType: number | null;
  referenceName: string;
  elementColor: string;
  translate: string;
  pronunciation: string;
  disclaimer: string;
  description: string;
  documentType: string;
  information: string;
  labelBrand: File | null;
  fileUploade: File | null;
  signature: File | null;
  InformationLetter: File | null;
  letterStatment: File | null;
};

export type FormAdditionalBrand = {
  additionalDescriptions: string;
  additionalFiles: File | null;
};
export type FormAdditionalBrandError = {
  additionalDescriptions: boolean;
  additionalFiles: boolean;
};

export type FormSubmissionBrandError = {
  applicationType: boolean;
  brandType: boolean;
  referenceName: boolean;
  elementColor: boolean;
  translate: boolean;
  pronunciation: boolean;
  disclaimer: boolean;
  description: boolean;
  documentType: boolean;
  information: boolean;
  labelBrand: boolean;
  fileUploade: boolean;
  signature: boolean;
  InformationLetter: boolean;
  letterStatment: boolean;
};
