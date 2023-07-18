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
  creator: string | User;
  project: string | Project;
  assignees: Array<string | User>;
  attachments: Array<string | Attachment>;
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
  creator: string | User;
  coverImage: string;
  attachments: Array<string | Attachment>;
  assignees: Array<string | User>;
}
