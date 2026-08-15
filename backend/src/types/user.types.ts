export interface LoginInput {
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
