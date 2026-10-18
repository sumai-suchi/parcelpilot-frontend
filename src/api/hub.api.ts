import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/shipment.interface";
import type {
  CreateHubTransferPayload,
  HubTransferItem,
  ReceiveHubTransferPayload,
} from "@/types/hub.interface";
import type { OperationsShipment } from "@/types/operations.interface";

export function getHubTransfers(params?: {
  status?: string;
  fromHubId?: string;
  toHubId?: string;
  hubId?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<HubTransferItem[]>> {
  return apiClient("/operations-manager/transfers", {
    method: "GET",
    query: params,
  });
}

export function createHubTransfer(
  shipmentId: string,
  payload: CreateHubTransferPayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/operations-manager/shipments/${shipmentId}/transfer`, {
    method: "POST",
    body: payload,
  });
}

export function receiveHubTransfer(
  transferId: string,
  payload?: ReceiveHubTransferPayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/operations-manager/transfers/${transferId}/receive`, {
    method: "PATCH",
    body: payload || {},
  });
}

export function getHubShipments(params?: {
  originHubId?: string;
  destinationHubId?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<OperationsShipment[]>> {
  return apiClient("/operations-manager/shipments", {
    method: "GET",
    query: params,
  });
}
