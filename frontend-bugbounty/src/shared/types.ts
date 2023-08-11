import { GetBugsResponse } from "./responseTypes";

export interface User {
  _id: string;
  _v: number;
  name: string;
  email: string;
  password: string;
  company: string | Company;
  role: "admin" | "dev" | "project manager" | "tester";
  profileImage: string;
}

export interface Bug {
  _id: string;
  _v: number;
  customId: number;
  title: string;
  description: string;
  status: "open" | "in progress" | "closed";
  severity: "low" | "medium" | "high" | "critical";
  creator: string | User;
  project: string | Project;
  assignees: Array<string | User>;
  attachments: Array<string | Attachment | File> | number;
}

export interface Company {
  _id: string;
  _v: number;
  name: string;
  description: string;
  users: Array<string | User>;
  profileImage: string;
  location: string;
  founded: Date;
  industry: string;
}

export interface Comment {
  _id: string;
  _v: number;
  content: string;
  creator: string | User;
  bug: string | Bug;
  attachments: Array<Attachment>;
}

export interface ChangeEvent {
  _id: string;
  _v: number;
  type: "creation" | "modification" | "comment" | "assignment";
  user: string | User;
  bug: string | Bug;
  timestamp: Date;
  details: string;
}

export interface Attachment {
  _id: string;
  _v: number;
  url: string;
  name: string;
  type: string;
}

export interface Project {
  _id: string;
  _v: number;
  name: string;
  description: string;
  creator: User | string;
  coverImage: string;
  attachments: Array<string | Attachment>;
  assignees: Array<string | User>;
}

export type ModalType = "create" | "update";
export type ModalName = "createUserModal" | "editUserModal" | "createProjectModal" | "editProjectModal" | "createBugModal" | "editBugModal";
export type EditFormData = {
  user: User | null;
  project: Project | null;
  bug: Bug | null;
  bugProject: GetBugsResponse | null;
  users: User[] | null;
};
