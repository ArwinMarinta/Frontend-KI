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
}

export interface Submission {
  id: number;
  submissionTypeId: number;
  patentId: number | null;
  copyrightId: number | null;
  industrialDesignId: number | null;
  brandId: number | null;
  periodId: number | null;
  comments: string | null;
  submissionScheme: string | null;
  createdAt: string;
  updatedAt: string;
  patent: PatentType | null;
  copyright: CopyrightType | null;
  brand: string | null;
  industrialDesign: IndustrialDesignType | null;
  submissionType: TypeSubmission;
  personalDatas: PersonalData[];
  termsConditions: TermsCondition[] | null;
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
  createdAt: string;
  updatedAt: string;
}

export interface CopyrightType {
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
  typeCreation: null;
  subTypeCreation: null;
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
  patentType: string;
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
  typeDesign: string | null;
  subTypeDesign: string | null;
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
  comment: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  revisionFile: [];
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

export type SubmissionBrand = {
  tipePermohonan: string;
  tipeMerek: string;
  namaRefrensiLabel: string;
  unsurWarnaLabel: string;
  terjemahanBahasaAsing: string;
  pengucapanHurufNonLatin: string;
  disclaimer: string;
  deskripsiMerek: string;
  jenisDokumen: string;
  keterangan: string;
  labelMerek: string;
  fileUnggahan: string;
  tandaTanganPermohonan: string;
  suratKeranganUmkm: string;
  suratPernyataanUmkm: string;
  labelBrand: LabelBrand[];
};

export interface FormPersonalData {
  id: number;
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
  ktp: File | null;
  isLeader: boolean;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  twitter: string | null;
  address: string;
  // ktpName: string;
}
