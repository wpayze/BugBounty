import { User } from "@/shared/types";

class UserService {
  private readonly api_url: string;
  private readonly token: string | undefined;

  constructor(token: string | undefined = "") {
    this.api_url = `${process.env.API_URL}/users`;
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

  async getById(userId: number): Promise<User> {
    try {
      const response = await fetch(`${this.api_url}/${userId}`);
      if (!response.ok) {
        throw new Error(
          `Error getting user with ID ${userId}: ${response.statusText}`
        );
      }
      return (await response.json()) as User;
    } catch (error) {
      throw new Error(
        `Error getting user with ID ${userId}: ${(error as Error).message}`
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const response = await fetch(this.api_url, {
        headers: this.getRequestHeaders(),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error getting all users: ${response.statusText}`);
      }
      return (await response.json()) as User[];
    } catch (error) {
      throw new Error(`Error getting all users: ${(error as Error).message}`);
    }
  }

  async update(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.api_url}/${userId}`, {
        method: "PUT",
        headers: this.getRequestHeaders(),
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(
          `Error updating user with ID ${userId}: ${response.statusText}`
        );
      }
      return (await response.json()) as User;
    } catch (error) {
      throw new Error(
        `Error updating user with ID ${userId}: ${(error as Error).message}`
      );
    }
  }
}

export default UserService;
