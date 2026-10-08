import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/shipment.interface";
import type {
  CompleteDeliveryPayload,
  CourierAvailability,
  CourierProfile,
  CourierTask,
  DeliveryFailedPayload,
  ReschedulePayload,
} from "@/types/courier.interface";

export function getCourierProfile(): Promise<ApiResponse<CourierProfile>> {
  return apiClient("/courier/me", {
    method: "GET",
  });
}

export function updateCourierAvailability(
  availabilityStatus: CourierAvailability,
): Promise<ApiResponse<CourierProfile>> {
  return apiClient("/courier/availability", {
    method: "PATCH",
    body: { availabilityStatus },
  });
}

export function getCourierTasks(params?: {
  status?: string;
  shipmentStatus?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<CourierTask[]>> {
  return apiClient("/courier/tasks", {
    method: "GET",
    query: params,
  });
}

export function getCourierTaskById(
  taskId: string,
): Promise<ApiResponse<CourierTask>> {
  return apiClient(`/courier/tasks/${taskId}`, {
    method: "GET",
  });
}

export function acceptAssignment(
  assignmentId: string,
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/assignments/${assignmentId}/accept`, {
    method: "PATCH",
  });
}

export function rejectAssignment(
  assignmentId: string,
  payload?: { reason?: string },
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/assignments/${assignmentId}/reject`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function pickupShipment(
  shipmentId: string,
  payload?: { note?: string },
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/pickup`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function deliverToOriginHub(
  shipmentId: string,
  payload?: { note?: string },
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/deliver-to-hub`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function startDelivery(
  shipmentId: string,
  payload?: { note?: string },
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/out-for-delivery`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function completeDelivery(
  shipmentId: string,
  payload: CompleteDeliveryPayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/deliver`, {
    method: "PATCH",
    body: payload,
  });
}

export function recordDeliveryFailed(
  shipmentId: string,
  payload: DeliveryFailedPayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/delivery-failed`, {
    method: "PATCH",
    body: payload,
  });
}

export function rescheduleDelivery(
  shipmentId: string,
  payload: ReschedulePayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/courier/shipments/${shipmentId}/reschedule`, {
    method: "PATCH",
    body: payload,
  });
}
