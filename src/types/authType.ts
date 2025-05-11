export interface FormChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FormChangePasswordErros {
  password: boolean;
  newPassword: string | null;
  confirmPassword: string | null;
}
