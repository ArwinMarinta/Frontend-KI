export type User = {
  id: number;
  firebase_uid: string | null;
  email: string | null;
  fullname: string | null;
  image: string | null;
  password: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studyProgram: string | null;
  institution: string | null;
  isVerified: boolean;
  role: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface User2 {
  id: number;
  email: string;
  fullname: string;
  image: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studyProgram: string | null;
  role: "superAdmin" | "admin" | "user" | "reviewer";
}

export interface User3 {
  fullname: string;
  phoneNumber: string;
  faculty: string;
  studyProgram: string;
}

export type UserForm = {
  fullname: string;
  email: string;
  role: string;
  faculty: string;
  studyProgram: string;
  institution: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type FormUserErrors = {
  fullname: string | null;
  email: string | null;
  role: string | null;
  // faculty: boolean;
  // studyProgram: boolean;
  // institution: boolean;
  // phoneNumber: boolean;
  password: string | null;
  confirmPassword: string | null;
};

export type UpdateProfileErrors = {
  fullname: string | null;
  faculty: string | null;
  studyProgram: string | null;
  // institution: string | null;
  phoneNumber: string | null;
};
