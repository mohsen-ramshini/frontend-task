export type LoginFormValues = {
  email: string;     
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


export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}