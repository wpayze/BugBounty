import { User } from "@/shared/types";

class UserService {
  readonly api_url: string = `${process.env.API_URL}/users`;

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
        credentials: "include"
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
        headers: {
          "Content-Type": "application/json",
        },
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

export default new UserService();
