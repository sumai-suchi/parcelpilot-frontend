import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptAssignment,
  completeDelivery,
  deliverToOriginHub,
  getCourierProfile,
  getCourierTasks,
  pickupShipment,
  recordDeliveryFailed,
  rejectAssignment,
  rescheduleDelivery,
  startDelivery,
  updateCourierAvailability,
} from "@/api/courier.api";
import type {
  CompleteDeliveryPayload,
  CourierAvailability,
  DeliveryFailedPayload,
  ReschedulePayload,
} from "@/types/courier.interface";

export function useCourierProfile() {
  return useQuery({
    queryKey: ["courier-profile"],
    queryFn: getCourierProfile,
  });
}

export function useUpdateCourierAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (availabilityStatus: CourierAvailability) =>
      updateCourierAvailability(availabilityStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-profile"] });
      queryClient.invalidateQueries({ queryKey: ["operations-couriers"] });
    },
  });
}

export function useCourierTasks(params?: {
  status?: string;
  shipmentStatus?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["courier-tasks", params],
    queryFn: () => getCourierTasks(params),
  });
}

export function useAcceptAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) => acceptAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useRejectAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      assignmentId,
      reason,
    }: {
      assignmentId: string;
      reason?: string;
    }) => rejectAssignment(assignmentId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function usePickupShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      note,
    }: {
      shipmentId: string;
      note?: string;
    }) => pickupShipment(shipmentId, { note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useDeliverToHub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      note,
    }: {
      shipmentId: string;
      note?: string;
    }) => deliverToOriginHub(shipmentId, { note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useStartDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      note,
    }: {
      shipmentId: string;
      note?: string;
    }) => startDelivery(shipmentId, { note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useCompleteDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: CompleteDeliveryPayload;
    }) => completeDelivery(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useRecordDeliveryFailed() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: DeliveryFailedPayload;
    }) => recordDeliveryFailed(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function useRescheduleDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: ReschedulePayload;
    }) => rescheduleDelivery(shipmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}
