import { PeriodType, YearsType } from "./fundingType";
import { User } from "./userType";

export interface Review {
  id: number;
  userId: number;
  reviewerId: number | null;
  submissionId: number;
  centralStatus: string;
  reviewStatus: string;
  createdAt: string;
  updatedAt: string;
  user: User | null;
  reviewer: User | null;
  submission: Submission | null;
  progress: SubmissionProgress[];
}

export interface Submission {
  id: number;
  submissionTypeId: number;
  patentId: number | null;
  copyrightId: number | null;
  industrialDesignId: number | null;
  brandId: number | null;
  periodId: number | null;
  period: YearsType | null;
  group: PeriodType | null;
  submissionScheme: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  payment: Payment | null;
  patent: PatentType | null;
  copyright: SubmissionCopyrightType | null;
  brand: SubmissionBrand | null;
  industrialDesign: IndustrialDesignType | null;
  submissionType: TypeSubmission;
  personalDatas: PersonalData[];
  termsConditions: TermsCondition[] | null;
}

export interface Payment {
  id: number;
  userId: number;
  submissionId: number;
  billingCode: string | null;
  proofPayment: string;
  paymentStatus: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DetailSubmissionType {
  id: number;
  userId: number;
  reviewerId: null;
  submissionId: number;
  centralStatus: string;
  reviewStatus: string;
  createdAt: string;
  updatedAt: string;
  user: User | null;
  submission: Submission;
}

interface TypeSubmission {
  id: number;
  title: string;
  isPublish: boolean;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

export interface PersonalData {
  id: number;
  submissionId: number;
  name: string;
  email: string;
  institution: string;
  work: string;
  nationalState: string;
  countryResidence: string;
  province: string;
  city: string;
  subdistrict: string;
  ward: string;
  postalCode: string;
  phoneNumber: string;
  ktp: string | null;
  isLeader: boolean;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  twitter: string | null;
  address: string;
  ktpName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionCopyrightType {
  id: number;
  titleInvention: string;
  typeCreationId: number | null;
  subTypeCreationId: number | null;
  countryFirstAnnounced: string;
  cityFirstAnnounced: string;
  timeFirstAnnounced: string;
  briefDescriptionCreation: string;
  statementLetter: string | null;
  letterTransferCopyright: string | null;
  exampleCreation: string | null;
  createdAt: string;
  updatedAt: string;
  typeCreation: TypeCreation | null;
  subTypeCreation: SubTypeCreation | null;
}

export interface PatentType {
  id: number;
  draftPatentApplicationFile: string;
  entirePatentDocument: string | null;
  inventionTitle: string | null;
  patentTypeId: number | null;
  numberClaims: number | null;
  description: string | null;
  abstract: string | null;
  claim: string | null;
  inventionImage: string | null;
  statementInventionOwnership: string | null;
  letterTransferRightsInvention: string | null;
  letterPassedReviewStage: string | null;
  createdAt: string;
  updatedAt: string;
  patentType: PatentsType | null;
}

export interface IndustrialDesignType {
  id: number;
  draftDesainIndustriApplicationFile: string;
  titleDesign: string | null;
  type: string | null;
  typeDesignId: number | null;
  subtypeDesignId: number | null;
  claim: string | null;
  looksPerspective: string | null;
  frontView: string | null;
  backView: string | null;
  rightSideView: string | null;
  lefttSideView: string | null;
  topView: string | null;
  downView: string | null;
  moreImages: string | null;
  letterTransferDesignRights: string | null;
  designOwnershipLetter: string | null;
  createdAt: string;
  updatedAt: string;
  typeDesign: TypeDesign | null;
  subTypeDesign: SubTypeDesign | null;
}

export interface PersonalData {
  id: number;
  submissionId: number;
  name: string;
  email: string;
  faculty: string | null;
  studyProgram: string | null;
  institution: string;
  work: string;
  nationalState: string;
  countryResidence: string;
  province: string;
  city: string;
  subdistrict: string;
  ward: string;
  postalCode: string;
  phoneNumber: string;
  ktp: string | null;
  isLeader: boolean;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  twitter: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionProgress {
  id: number;
  userSubmissionId: number;
  status: string;
  isStatus: boolean;
  comment: string;
  certificateFile: File | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  revisionFile: FileAttachment[] | null;
}
export interface FileAttachment {
  id: number;
  progressId: number;
  fileName: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

interface TermsCondition {
  id: number;
  terms: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabelBrand {
  labelTambahan: string;
  keterangan: string;
  tanggalUnggah: string;
  namaFile: string;
  ukuran: string;
  gambar: string;
}

export type SubmissionPatent = {
  judulCiptaan: string;
  jenisCiptaan: string;
  subJenisCiptaan: string;
  negaraPertamaKali: string;
  kotaPertamaKali: string;
  waktuPertamaKali: string;
  uraianSingkatInvensi: string;
  suratPernyataan: string;
  suratPengalihanHakCipta: string;
  contohCiptaan: string;
};

export interface SubmissionBrand {
  id: number;
  applicationType: string;
  brandTypeId: number;
  referenceName: string;
  elementColor: string;
  translate: string;
  pronunciation: string;
  disclaimer: string;
  description: string;
  documentType: string;
  information: string;
  labelBrand: string | null;
  fileUploade: string | null;
  signature: string | null;
  InformationLetter: string | null;
  letterStatment: string | null;
  createdAt: string;
  updatedAt: string;
  additionalDatas: BrandFile[];
  brandType: BrandType | null;
}

export interface BrandFile {
  id: number;
  brandId: number;
  fileName: string;
  size: string;
  description: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormPersonalData {
  id: number | null;
  name: string;
  email: string;
  faculty: string | null;
  studyProgram: string | null;
  institution: string;
  work: string;
  nationalState: string;
  countryResidence: string;
  province: string;
  city: string;
  subdistrict: string;
  ward: string;
  postalCode: string;
  phoneNumber: string;
  ktp: string | File | null;
  isLeader: boolean;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  twitter: string | null;
  address: string | null;
  ktpName?: string | null;
  uploadKtp?: boolean;
  ktpFileIndex?: number | null;
}

export interface FormUpdateProgress {
  reviewStatus: string;
  comments: string;
  paymentCode: string;
  fileNames: string[];
  files: File[];
  certificateFile: File | null;
}

export interface FormUpdateProgressErrors {
  reviewStatus?: string | null;
  paymentCode?: string | null;
  files?: string | null;
}

export interface FormComplateIndustDesign {
  titleDesign: string;
  type: string;
  typeDesignId: number;
  subtypeDesignId: number;
  claim: string[];
  looksPerspective: File | null;
  frontView: File | null;
  backView: File | null;
  rightSideView: File | null;
  lefttSideView: File | null;
  topView: File | null;
  downView: File | null;
  moreImages: File | null;
  letterTransferDesignRights: File | null;
  designOwnershipLetter: File | null;
  draftDesainIndustriApplicationFile?: File | null;
}

export interface FormDesignSubmissionErrors {
  titleDesign?: string | null;
  type?: string | null;
  typeDesignId?: string | null;
  subtypeDesignId?: string | null;
  claim?: string | null;
  looksPerspective?: string | null;
  frontView?: string | null;
  backView?: string | null;
  rightSideView?: string | null;
  lefttSideView?: string | null;
  topView?: string | null;
  downView?: string | null;
  moreImages?: string | null;
  letterTransferDesignRights?: string | null;
  designOwnershipLetter?: string | null;
}

export interface FormComplatePatenSubmission {
  // entirePatentDocument: File | null;
  inventionTitle: string;
  patentTypeId: number | string | null;
  numberClaims: number | string | null;
  description: File | null;
  abstract: File | null;
  claim: File | null;
  inventionImage: File | null;
  statementInventionOwnership: File | null;
  letterTransferRightsInvention: File | null;
  draftPatentApplicationFile?: File | null;
  inventionName?: string | null;
  statementName?: string | null;
  letterName?: string | null;
}

export interface FormComplatePatenSubmissionErrors {
  // entirePatentDocument?: string | null;
  inventionTitle?: string | null;
  patentTypeId?: string | null;
  numberClaims?: string | null;
  description?: string | null;
  abstract?: string | null;
  claim?: string | null;
  inventionImage?: string | null;
  statementInventionOwnership?: string | null;
  letterTransferRightsInvention?: string | null;
}

export interface TypeCreation {
  id: number;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
}

export interface SubTypeCreation {
  id: number;
  title: string;
  typeCreationId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
}

export type PatentsType = {
  id: number;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
};

export type TypeDesign = {
  id: number;
  title: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  deletedAt: string | null;
};

export type SubTypeDesign = {
  id: number;
  title: string;
  typeDesignId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type PersonalDataError = {
  id?: number | null;
  name: string | null;
  email: string | null;
  faculty: string | null;
  studyProgram: string | null;
  institution: string | null;
  work: string | null;
  nationalState: string | null;
  countryResidence: string | null;
  province: string | null;
  city: string | null;
  subdistrict: string | null;
  ward: string | null;
  postalCode: string | null;
  phoneNumber: string | null;
  ktp?: string | null;
  isLeader?: string | null;
  facebook?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  address: string | null;
};

interface BrandType {
  id: number;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
}
