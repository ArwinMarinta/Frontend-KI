export interface FormChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FormChangePasswordErros {
  password: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
}
