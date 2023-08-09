import { Bug, Project, User } from "./types";

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface GetBugsResponse {
  project: Project;
  bugs: Bug[];
};