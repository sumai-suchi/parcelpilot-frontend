import apiClient from "@/lib/apiClient";
import type {
  ApplicationHub,
  CreateRoleApplicationPayload,
  ReviewRoleApplicationPayload,
  RoleApplication,
} from "@/types/roleApplication.interface";

export async function applyForRole(payload: CreateRoleApplicationPayload) {
  return apiClient<{
    statusCode: number;
    success: boolean;
    message: string;
    data: RoleApplication;
  }>("/role-applications", {
    method: "POST",
    body: payload,
  });
}

export async function getMyApplications() {
  return apiClient<{
    statusCode: number;
    success: boolean;
    message: string;
    data: RoleApplication[];
  }>("/role-applications/my", {
    method: "GET",
  });
}

export async function getApplicationHubs() {
  return apiClient<{
    statusCode: number;
    success: boolean;
    message: string;
    data: ApplicationHub[];
  }>("/role-applications/hubs", {
    method: "GET",
  });
}

export async function getAllApplications(query?: {
  status?: string;
  desiredRole?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) {
  return apiClient<{
    statusCode: number;
    success: boolean;
    message: string;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: RoleApplication[];
  }>("/role-applications", {
    method: "GET",
    query,
  });
}

export async function reviewRoleApplication(
  id: string,
  payload: ReviewRoleApplicationPayload,
) {
  return apiClient<{
    statusCode: number;
    success: boolean;
    message: string;
    data: RoleApplication;
  }>(`/role-applications/${id}/review`, {
    method: "PATCH",
    body: payload,
  });
}
