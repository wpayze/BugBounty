import { LoginRequest, RegisterRequest } from "@/shared/requestTypes";
import {
  RegisterResponse,
  LoginResponse,
} from "@/shared/responseTypes";
import { User } from "@/shared/types";

class AuthService {
  readonly api_url: string = `${process.env.API_URL}/auth`;

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${this.api_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
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
      throw new Error("Error al iniciar sesión");
    }

    const data = (await response.json()) as LoginResponse;
    return data;
  }

  async verifyToken(token?: string): Promise<User> {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Cookie"] = `accessToken=${token}`;
    }

    const response = await fetch(`${this.api_url}/verify`, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Token Invalido");
    }

    return response.json() as Promise<User>;
  }
}

export default new AuthService();
