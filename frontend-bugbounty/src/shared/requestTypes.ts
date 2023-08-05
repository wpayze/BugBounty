import { User } from "./types";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AddProjectRequest {
  name: string;
  description: string;
  coverImage: File | null;
};

export type AddUserRequest = Pick<User, "name" | "email" | "password" | "role">;
