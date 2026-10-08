export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface CreatePaymentIntentPayload {
  currency?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  trackingNumber: string;
  publishableKey?: string;
}

export interface ConfirmPaymentPayload {
  paymentIntentId: string;
  paymentMethodId?: string;
}

export interface PaymentStatusData {
  id: string;
  shipmentId: string;
  amount: number;
  currency: string;
  provider: string;
  transactionId?: string;
  status: PaymentStatus;
  paidAt?: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
  amount: number;
  currency: string;
  trackingNumber: string;
}

export interface VerifyCheckoutSessionResponse {
  paid: boolean;
  status: string;
  transactionId?: string;
  shipment?: any;
}
