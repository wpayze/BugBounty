import AuthService from "@/services/authService";
import BugService from "@/services/bugService";
import ProjectService from "@/services/projectService";
import UserService from "@/services/userService";
import { cookies } from "next/headers";

const getToken = () => {
  const nextCookies = cookies();
  return nextCookies.get("accessToken");
};

export function initUserService(): UserService {
  const token = getToken();
  return new UserService(token?.value);
}

export function initAuthService(): AuthService {
  const token = getToken();
  return new AuthService(token?.value);
}

export function initProjectService(): ProjectService {
  const token = getToken();
  return new ProjectService(token?.value);
}

export function initBugService(): BugService {
  const token = getToken();
  return new BugService(token?.value);
}