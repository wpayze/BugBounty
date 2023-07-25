import { LoginRequest, RegisterRequest } from "@/shared/requestTypes";
import { RegisterResponse, LoginResponse } from "@/shared/responseTypes";
import { User } from "@/shared/types";

class AuthService {
  private readonly api_url: string;

  constructor(private token: string = "") {
    this.api_url = `${process.env.API_URL}/auth`;
    this.token = token;
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${this.api_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error registering user");
    }

    return response.json() as Promise<RegisterResponse>;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error logging in");
    }

    const data = (await response.json()) as LoginResponse;
    return data;
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(`${this.api_url}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("Error logging out");
    }
  }

  async verifyToken(): Promise<User> {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Cookie"] = `accessToken=${this.token}`;
    }

    const response = await fetch(`${this.api_url}/verify`, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    return response.json() as Promise<User>;
  }
}

export default AuthService;
