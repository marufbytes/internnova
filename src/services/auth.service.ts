import api from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
  role?: "STUDENT" | "ALUMNI" | "HR" | "ADMIN";
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export const authService = {
  // 1. Login API Call
  login: async (credentials: LoginPayload) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // 2. Register API Call
  register: async (userData: RegisterPayload) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // 3. Reset Password API Call
  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  // 4. Logout API Call
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};