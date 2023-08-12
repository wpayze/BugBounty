import { Bug, ChangeEvent, Project, User, Comment } from "./types";

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface GetBugsResponse {
  _id: string;
  name: string;
  bugCount: number;
  bugs: Bug[];
};

export interface getBugByIdResponse extends Bug {
  comments: Comment[];
  events: ChangeEvent[];
}

export interface getCommentsAndEventsResponse {
  comments: Comment[];
  events: ChangeEvent[];
}