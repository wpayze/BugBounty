import { GetBugsResponse } from "@/shared/responseTypes";
import { Bug, Project } from "@/shared/types";

class BugService {
  private readonly api_url: string;
  private readonly token: string | undefined;

  constructor(token: string | undefined = "") {
    this.api_url = `${process.env.API_URL}/bugs`;
    this.token = token;
  }

  private getRequestHeaders() {
    const headers: { [key: string]: string } = {};

    if (this.token) {
      headers["Cookie"] = `accessToken=${this.token}`;
    }

    return headers;
  }

  async getAll(): Promise<GetBugsResponse[]> {
    const response = await fetch(this.api_url, {
      credentials: "include",
      headers: this.getRequestHeaders(),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    return (await response.json()) as GetBugsResponse[];
  }

  async create(bug: Partial<Bug>): Promise<GetBugsResponse[]> {
    const formData = new FormData();

    formData.append("title", bug.title || "");
    formData.append("description", bug.description || "");
    formData.append("project", bug.project?.toString() || "");
    formData.append("severity", bug.severity || "");
    formData.append("asignees", JSON.stringify(bug.assignees));

    if (bug.attachments instanceof FileList) {
      for (let index = 0; index < bug.attachments.length; index++) {
        const file = bug.attachments[index];
        formData.append(`attachment${index + 1}`, file);
      }
    }

    const response = await fetch(this.api_url, {
      method: "POST",
      credentials: "include",
      headers: this.getRequestHeaders(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    return (await response.json()) as GetBugsResponse[];
  }
}

export default BugService;
