import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmPayment,
  createCheckoutSession,
  createPaymentIntent,
  getPaymentStatus,
  verifyCheckoutSession,
} from "@/api/payment.api";
import type {
  ConfirmPaymentPayload,
  CreatePaymentIntentPayload,
} from "@/types/payment.interface";

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload?: CreatePaymentIntentPayload;
    }) => createPaymentIntent(shipmentId, payload),
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: ConfirmPaymentPayload;
    }) => confirmPayment(shipmentId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payment-status", variables.shipmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["shipment-details", variables.shipmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["customer-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}

export function usePaymentStatus(shipmentId?: string) {
  return useQuery({
    queryKey: ["payment-status", shipmentId],
    queryFn: () => getPaymentStatus(shipmentId!),
    enabled: !!shipmentId,
  });
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload?: CreatePaymentIntentPayload;
    }) => createCheckoutSession(shipmentId, payload),
  });
}

export function useVerifyCheckoutSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      sessionId,
    }: {
      shipmentId: string;
      sessionId: string;
    }) => verifyCheckoutSession(shipmentId, sessionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payment-status", variables.shipmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["shipment-details", variables.shipmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["customer-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["operations-shipments"] });
    },
  });
}
