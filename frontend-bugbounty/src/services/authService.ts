import { LoginRequest, RegisterRequest } from "@/shared/requestTypes";
import {
  RegisterResponse,
  LoginResponse,
  VerifyTokenResponse,
} from "@/shared/responseTypes";

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
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = (await response.json()) as LoginResponse;
    localStorage.setItem("token", data.accessToken);

    return data;
  }

  async verifyToken(): Promise<VerifyTokenResponse> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${this.api_url}/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      throw new Error("Token no válido");
    }

    return response.json() as Promise<VerifyTokenResponse>;
  }
}

export default new AuthService();
