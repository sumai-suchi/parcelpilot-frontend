import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHubTransfer,
  getHubShipments,
  getHubTransfers,
  receiveHubTransfer,
} from "@/api/hub.api";
import type {
  CreateHubTransferPayload,
  ReceiveHubTransferPayload,
} from "@/types/hub.interface";

export function useHubTransfers(params?: {
  status?: string;
  fromHubId?: string;
  toHubId?: string;
  hubId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["hub-transfers", params],
    queryFn: () => getHubTransfers(params),
  });
}

export function useCreateHubTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: CreateHubTransferPayload;
    }) => createHubTransfer(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hub-transfers"] });
      queryClient.invalidateQueries({ queryKey: ["hub-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useReceiveHubTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      transferId,
      payload,
    }: {
      transferId: string;
      payload?: ReceiveHubTransferPayload;
    }) => receiveHubTransfer(transferId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hub-transfers"] });
      queryClient.invalidateQueries({ queryKey: ["hub-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useHubShipments(params?: {
  originHubId?: string;
  destinationHubId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["hub-shipments", params],
    queryFn: () => getHubShipments(params),
  });
}
