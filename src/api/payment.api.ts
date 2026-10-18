import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/shipment.interface";
import type {
  ConfirmPaymentPayload,
  CreateCheckoutSessionResponse,
  CreatePaymentIntentPayload,
  CreatePaymentIntentResponse,
  PaymentStatusData,
  VerifyCheckoutSessionResponse,
} from "@/types/payment.interface";

export function createPaymentIntent(
  shipmentId: string,
  payload?: CreatePaymentIntentPayload,
): Promise<ApiResponse<CreatePaymentIntentResponse>> {
  return apiClient(`/payment/create-payment-intent/${shipmentId}`, {
    method: "POST",
    body: payload || {},
  });
}

export function confirmPayment(
  shipmentId: string,
  payload: ConfirmPaymentPayload,
): Promise<ApiResponse<any>> {
  return apiClient(`/payment/confirm/${shipmentId}`, {
    method: "POST",
    body: payload,
  });
}

export function getPaymentStatus(
  shipmentId: string,
): Promise<ApiResponse<PaymentStatusData>> {
  return apiClient(`/payment/status/${shipmentId}`, {
    method: "GET",
  });
}

export function createCheckoutSession(
  shipmentId: string,
  payload?: CreatePaymentIntentPayload,
): Promise<ApiResponse<CreateCheckoutSessionResponse>> {
  return apiClient(`/payment/create-checkout-session/${shipmentId}`, {
    method: "POST",
    body: payload || {},
  });
}

export function verifyCheckoutSession(
  shipmentId: string,
  sessionId: string,
): Promise<ApiResponse<VerifyCheckoutSessionResponse>> {
  return apiClient(`/payment/verify-checkout-session/${shipmentId}`, {
    method: "POST",
    body: { sessionId },
  });
}
