import { GetBugsResponse, getBugByIdResponse, getCommentsAndEventsResponse } from "@/shared/responseTypes";
import { Bug, Comment, Project } from "@/shared/types";

class CommentService {
  private readonly api_url: string;
  private readonly token: string | undefined;

  constructor(token: string | undefined = "", bugId: string) {
    this.api_url = `${process.env.API_URL}/bugs/${bugId}/comments`;
    this.token = token;
  }

  private getRequestHeaders() {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Cookie"] = `accessToken=${this.token}`;
    }

    return headers;
  }

  async getCommentsAndEvents(): Promise<getCommentsAndEventsResponse> {
    const response = await fetch(this.api_url + "/events", {
      method: "GET",
      credentials: "include",
      headers: this.getRequestHeaders(),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    return (await response.json()) as getCommentsAndEventsResponse;
  }

  async create(content: string): Promise<Comment[]> {
    const response = await fetch(this.api_url, {
      method: "POST",
      credentials: "include",
      headers: this.getRequestHeaders(),
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    return (await response.json()) as Comment[];
  }
}

export default CommentService;
