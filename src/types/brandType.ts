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
  id?: number | null;
  additionalDescriptions: string;
  additionalFiles: File | null;
};
export type FormAdditionalBrandError = {
  additionalDescriptions: string | null;
  additionalFiles: string | null;
};
export type FormSubmissionBrandError = {
  applicationType: string | null;
  brandType: string | null;
  referenceName: string | null;
  elementColor: string | null;
  translate: string | null;
  pronunciation: string | null;
  disclaimer: string | null;
  description: string | null;
  documentType: string | null;
  information: string | null;
  labelBrand: string | null;
  fileUploade?: string | null;
  signature: string | null;
  InformationLetter?: string | null;
  letterStatment?: string | null;
};

export type DetailBrand = {
  labelBrand?: File | null;
  fileUploade?: File | null;
  signature?: File | null;
  InformationLetter: File | null;
  letterStatment?: File | null;
};
