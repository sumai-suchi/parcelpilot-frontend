import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/shipment.interface";
import type {
  AssignHubAndCourierPayload,
  Courier,
  Hub,
  OperationsShipment,
  OperationsShipmentsQuery,
  RejectShipmentPayload,
} from "@/types/operations.interface";

export function getOperationsShipments(
  query?: OperationsShipmentsQuery,
): Promise<{
  success: boolean;
  statusCode: number;
  message: string;
  data: OperationsShipment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const cleanParams: Record<string, any> = {};
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    }
  }

  return apiClient("/operations-manager/shipments", {
    method: "GET",
    params: cleanParams,
  });
}

export function getOperationsShipmentDetails(
  id: string,
): Promise<ApiResponse<OperationsShipment>> {
  return apiClient(`/operations-manager/shipments/${id}`, {
    method: "GET",
  });
}

export function assignHubAndCourier(
  shipmentId: string,
  payload: AssignHubAndCourierPayload,
): Promise<ApiResponse<OperationsShipment>> {
  return apiClient(`/operations-manager/shipments/${shipmentId}/assign`, {
    method: "PATCH",
    body: payload,
  });
}

export function rejectShipment(
  shipmentId: string,
  payload: RejectShipmentPayload,
): Promise<ApiResponse<OperationsShipment>> {
  return apiClient(`/operations-manager/shipments/${shipmentId}/reject`, {
    method: "PATCH",
    body: payload,
  });
}

export function getHubs(): Promise<ApiResponse<Hub[]>> {
  return apiClient("/operations-manager/hubs", {
    method: "GET",
  });
}

export function getCouriers(): Promise<{
  success: boolean;
  statusCode: number;
  message: string;
  data: Courier[];
}> {
  return apiClient("/operations-manager/couriers", {
    method: "GET",
  });
}

export function updateShipmentDelivered(
  shipmentId: string,
  payload?: { note?: string },
): Promise<ApiResponse<OperationsShipment>> {
  return apiClient(`/operations-manager/shipments/${shipmentId}/delivered`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function updateShipmentOutForDelivery(
  shipmentId: string,
  payload?: { courierId?: string; note?: string },
): Promise<ApiResponse<OperationsShipment>> {
  return apiClient(
    `/operations-manager/shipments/${shipmentId}/out-for-delivery`,
    {
      method: "PATCH",
      body: payload || {},
    },
  );
}
