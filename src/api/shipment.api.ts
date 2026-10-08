import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateShipmentPayload,
  CreatedShipmentData,
  DetailedShipmentData,
  SavedAddress,
} from "@/types/shipment.interface";

export function createShipmentRequest(
  payload: CreateShipmentPayload,
): Promise<ApiResponse<CreatedShipmentData>> {
  return apiClient("/users/create-shipment-request", {
    method: "POST",
    body: payload,
  });
}

export function getMyAddresses(): Promise<ApiResponse<SavedAddress[]>> {
  return apiClient("/users/address", {
    method: "GET",
  });
}

export function getMyShipments(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<ApiResponse<CreatedShipmentData[]>> {
  return apiClient("/users/shipments", {
    method: "GET",
    query: params,
  });
}

export function getDeliveryHistory(params?: {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<CreatedShipmentData[]>> {
  return apiClient("/users/shipments/history", {
    method: "GET",
    query: params,
  });
}

export function trackShipment(
  trackingNumber: string,
): Promise<ApiResponse<any>> {
  return apiClient(`/users/shipments/track/${trackingNumber}`, {
    method: "GET",
  });
}

export function getShipmentById(
  id: string,
): Promise<ApiResponse<DetailedShipmentData>> {
  return apiClient(`/users/shipments/${id}`, {
    method: "GET",
  });
}

export function cancelShipment(
  id: string,
  payload?: { reason?: string },
): Promise<ApiResponse<any>> {
  return apiClient(`/users/shipments/${id}/cancel`, {
    method: "PATCH",
    body: payload || {},
  });
}
