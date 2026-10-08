import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/shipment.interface";
import type {
  AdminDashboardOverview,
  AdminHubItem,
  AdminUserItem,
  AdminZoneItem,
  CreateHubPayload,
  UpdateUserStatusPayload,
} from "@/types/admin.interface";

export function getAdminOverview(): Promise<ApiResponse<AdminDashboardOverview>> {
  return apiClient("/admin/dashboard/overview", {
    method: "GET",
  });
}

export function getAdminUsers(params?: {
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<AdminUserItem[]>> {
  return apiClient("/admin/users", {
    method: "GET",
    query: params,
  });
}

export function updateUserStatus(
  userId: string,
  payload: UpdateUserStatusPayload,
): Promise<ApiResponse<AdminUserItem>> {
  return apiClient(`/users/${userId}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function getAdminCouriers(): Promise<ApiResponse<any[]>> {
  return apiClient("/admin/couriers", {
    method: "GET",
  });
}

export function getAdminHubs(): Promise<ApiResponse<AdminHubItem[]>> {
  return apiClient("/admin/hubs", {
    method: "GET",
  });
}

export function createAdminHub(
  payload: CreateHubPayload,
): Promise<ApiResponse<AdminHubItem>> {
  return apiClient("/admin/hubs", {
    method: "POST",
    body: payload,
  });
}

export function bulkCreateAdminHubs(items: any[]): Promise<ApiResponse<any>> {
  return apiClient("/admin/hubs/bulk", {
    method: "POST",
    body: items,
  });
}

export function getAdminZones(): Promise<ApiResponse<AdminZoneItem[]>> {
  return apiClient("/admin/zones", {
    method: "GET",
  });
}

export function getAdminShipments(params?: any): Promise<ApiResponse<any[]>> {
  return apiClient("/admin/shipments", {
    method: "GET",
    query: params,
  });
}

export function getAdminPayments(params?: any): Promise<ApiResponse<any[]>> {
  return apiClient("/admin/payments", {
    method: "GET",
    query: params,
  });
}
