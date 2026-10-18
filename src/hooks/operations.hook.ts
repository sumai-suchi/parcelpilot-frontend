import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignHubAndCourier,
  getCouriers,
  getHubs,
  getOperationsShipmentDetails,
  getOperationsShipments,
  rejectShipment,
  updateShipmentDelivered,
  updateShipmentOutForDelivery,
} from "@/api";
import type {
  AssignHubAndCourierPayload,
  OperationsShipmentsQuery,
  RejectShipmentPayload,
  UpdateDeliveredPayload,
  UpdateOutForDeliveryPayload,
} from "@/types/operations.interface";

export function useOperationsShipments(query?: OperationsShipmentsQuery) {
  return useQuery({
    queryKey: ["operations-shipments", query],
    queryFn: () => getOperationsShipments(query),
  });
}

export function useOperationsShipmentDetails(id: string) {
  return useQuery({
    queryKey: ["operations-shipment-details", id],
    queryFn: () => getOperationsShipmentDetails(id),
    enabled: Boolean(id),
  });
}

export function useOperationsHubs() {
  return useQuery({
    queryKey: ["operations-hubs"],
    queryFn: getHubs,
  });
}

export function useOperationsCouriers() {
  return useQuery({
    queryKey: ["operations-couriers"],
    queryFn: getCouriers,
  });
}

export function useAssignHubAndCourier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: AssignHubAndCourierPayload;
    }) => assignHubAndCourier(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useRejectShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: RejectShipmentPayload;
    }) => rejectShipment(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useUpdateShipmentDelivered() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload?: UpdateDeliveredPayload;
    }) => updateShipmentDelivered(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useUpdateShipmentOutForDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload?: UpdateOutForDeliveryPayload;
    }) => updateShipmentOutForDelivery(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}
