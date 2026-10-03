import apiClient from "@/lib/apiClient";
import type {
  LoginPayload,
  RegistrationPayload,
  VerifyAccountPayload,
} from "@/types/auth.interface";

export function userRegistration(payload: RegistrationPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient(`/auth/verify-email`, { method: "POST", body: payload });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export async function getMe() {
  try {
    return await apiClient("/auth/me");
  } catch (error: any) {
    const status = error?.status ?? error?.statusCode ?? error?.response?.status;
    if (status === 401 || status === 403) {
      return null;
    }
    throw error;
  }
}

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

