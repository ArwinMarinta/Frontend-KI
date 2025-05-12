export interface CopyrightType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type FormCopyright = {
  title: string;
};

export interface SubCopyrightType {
  id: number;
  title: string;
  typeCreationId: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmissionCopyright {
  titleInvention: string;
  typeCreation: number | null;
  subTypeCreation: number | null;
  countryFirstAnnounced: string;
  cityFirstAnnounced: string;
  timeFirstAnnounced: string;
  briefDescriptionCreation: string;
  statementLetter: File | null;
  letterTransferCopyright: File | null;
  exampleCreation: File | null;
}

export interface FormSubmissionCopyrightError {
  titleInvention: boolean;
  typeCreation: boolean;
  subTypeCreation: boolean;
  countryFirstAnnounced: boolean;
  cityFirstAnnounced: boolean;
  timeFirstAnnounced: boolean;
  briefDescriptionCreation: boolean;
  statementLetter: boolean;
  letterTransferCopyright: boolean;
  exampleCreation: boolean;
}
