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
  statementName?: string;
  letterName?: string;
  exampleName?: string;
  exampleCreationUrl?: string | null;
}

export interface FormSubmissionCopyrightError {
  titleInvention: string | null;
  typeCreation: string | null;
  subTypeCreation: string | null;
  countryFirstAnnounced: string | null;
  cityFirstAnnounced: string | null;
  timeFirstAnnounced: string | null;
  briefDescriptionCreation: string | null;
  statementLetter: string | null;
  letterTransferCopyright: string | null;
  exampleCreation: string | null;
}
