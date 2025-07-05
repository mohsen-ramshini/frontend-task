export type LoginFormValues = {
  email: string;      // به جای username
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
};

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
};

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignupResponse {
  message: string;
  access?: string;
  refresh?: string;
}

export interface LogoutResponse {
  detail: string;
}

export const relationships = [
  "Parent",
  "Spouse",
  "Sibling",
  "Child",
  "Friend",
  "Relative",
  "Caregiver",
  "Other",
];
