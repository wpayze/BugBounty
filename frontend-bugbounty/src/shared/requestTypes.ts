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

export type AddUserRequest = Pick<User, "name" | "email" | "password" | "role">;