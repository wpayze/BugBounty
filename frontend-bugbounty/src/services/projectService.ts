import { AddProjectRequest } from "@/shared/requestTypes";
import { Project } from "@/shared/types";

class ProjectService {
  private readonly api_url: string;
  private readonly token: string | undefined;

  constructor(token: string | undefined = "") {
    this.api_url = `${process.env.API_URL}/projects`;
    this.token = token;
  }

  private getRequestHeaders() {
    const headers: { [key: string]: string } = {};

    if (this.token) {
      headers["Cookie"] = `accessToken=${this.token}`;
    }

    return headers;
  }

  async getAll(): Promise<Project[]> {
    try {
      const response = await fetch(this.api_url, {
        headers: this.getRequestHeaders(),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return (await response.json()) as Project[];
    } catch (error) {
      throw new Error(
        `Error getting all projects: ${(error as Error).message}`
      );
    }
  }

  async getById(id: number): Promise<Project> {
    try {
      const response = await fetch(`${this.api_url}/${id}`, {
        headers: this.getRequestHeaders(),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return (await response.json()) as Project;
    } catch (error) {
      throw new Error(
        `Error getting project by ID: ${(error as Error).message}`
      );
    }
  }

  async create(project: AddProjectRequest): Promise<Project> {
    try {
      const formData = new FormData();
      formData.append("name", project.name);
      formData.append("description", project.description);

      if (project.coverImage) {
        formData.append("coverImage", project.coverImage);
      }

      const response = await fetch(this.api_url, {
        method: "POST",
        headers: this.getRequestHeaders(),
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return (await response.json()) as Project;
    } catch (error) {
      throw new Error(`Error creating project: ${(error as Error).message}`);
    }
  }

  async update(id: string, project: AddProjectRequest): Promise<Project> {
    try {
      const response = await fetch(`${this.api_url}/${id}`, {
        method: "PUT",
        headers: this.getRequestHeaders(),
        credentials: "include",
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return (await response.json()) as Project;
    } catch (error) {
      throw new Error(`Error updating project: ${(error as Error).message}`);
    }
  }
}

export default ProjectService;
