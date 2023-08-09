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
}

export default BugService;
