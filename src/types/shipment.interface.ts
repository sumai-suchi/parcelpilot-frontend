export interface AddressPayload {
  label?: string;
  addressLine: string;
  city: string;
  area: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface SavedAddress {
  id: string;
  customerId: string;
  label: string | null;
  addressLine: string;
  city: string;
  area: string;
  postalCode: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
}

export type DeliveryType = "STANDARD" | "EXPRESS" | "SAME_DAY";

export interface CreateShipmentPayload {
  pickupAddress?: AddressPayload;
  pickupAddressId?: string;
  deliveryAddress?: AddressPayload;
  deliveryAddressId?: string;
  recipientName?: string;
  recipientPhone?: string;
  parcelType: string;
  weight: number;
  description?: string;
  deliveryType?: DeliveryType | string;
  scheduledPickupAt?: string;
}

export interface CreatedShipmentData {
  id: string;
  trackingNumber: string;
  customerId: string;
  pickupAddressId: string;
  deliveryAddressId: string;
  parcelType: string;
  weight: string | number;
  deliveryType: string;
  deliveryCharge: string | number;
  status: string;
  paymentStatus: string;
  deliveryOtp?: string | null;
  scheduledPickupAt?: string | null;
  description?: string | null;
  createdAt: string;
  pickupAddress?: SavedAddress;
  deliveryAddress?: SavedAddress;
}

export interface StatusHistoryEntry {
  id: string;
  shipmentId: string;
  status: string;
  location?: string | null;
  note?: string | null;
  createdAt: string;
}

export interface HubInfo {
  id: string;
  name: string;
  code: string;
  address?: string | null;
  phone?: string | null;
}

export interface PaymentRecord {
  id: string;
  shipmentId: string;
  amount: string | number;
  currency: string;
  provider: string;
  transactionId?: string | null;
  status: string;
  paidAt?: string | null;
}

export interface ProofOfDeliveryRecord {
  id?: string;
  recipientName?: string | null;
  signatureUrl?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
  createdAt: string;
}

export interface DetailedShipmentData extends CreatedShipmentData {
  updatedAt: string;
  originHub?: HubInfo | null;
  destinationHub?: HubInfo | null;
  payment?: PaymentRecord | null;
  proofOfDelivery?: ProofOfDeliveryRecord | null;
  statusHistory?: StatusHistoryEntry[];
  customer?: {
    id: string;
    user?: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
    };
  };
}

export interface CancelShipmentPayload {
  reason?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
