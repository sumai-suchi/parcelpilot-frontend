import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelShipment,
  createShipmentRequest,
  getDeliveryHistory,
  getMyAddresses,
  getMyShipments,
  getShipmentById,
  trackShipment,
} from "@/api/shipment.api";
import type { CreateShipmentPayload } from "@/types/shipment.interface";

export function useCreateShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateShipmentPayload) =>
      createShipmentRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useGetMyAddresses() {
  return useQuery({
    queryKey: ["customer-addresses"],
    queryFn: getMyAddresses,
  });
}

export function useMyShipments(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: ["customer-shipments", params],
    queryFn: () => getMyShipments(params),
  });
}

export function useDeliveryHistory(params?: {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["customer-delivery-history", params],
    queryFn: () => getDeliveryHistory(params),
  });
}

export function useTrackShipment(trackingNumber?: string) {
  return useQuery({
    queryKey: ["shipment-tracking", trackingNumber],
    queryFn: () => trackShipment(trackingNumber!),
    enabled: !!trackingNumber && trackingNumber.trim().length > 3,
  });
}

export function useShipmentDetails(shipmentId?: string) {
  return useQuery({
    queryKey: ["shipment-details", shipmentId],
    queryFn: () => getShipmentById(shipmentId!),
    enabled: !!shipmentId,
  });
}

export function useCancelShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      cancelShipment(id, { reason }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["shipment-details", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["customer-shipments"] });
      queryClient.invalidateQueries({
        queryKey: ["customer-delivery-history"],
      });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}
