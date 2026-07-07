export interface RegisterUserInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
