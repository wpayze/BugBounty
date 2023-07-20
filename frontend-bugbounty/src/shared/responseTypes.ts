import { User } from "./types";

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface VerifyTokenResponse {
  message: string;
  user: User;
  isValid: boolean;
}