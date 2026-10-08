import type { SavedAddress } from "./shipment.interface";

export type CourierAvailability = "AVAILABLE" | "BUSY" | "OFFLINE";
export type AssignmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface CourierProfile {
  id: string;
  userId: string;
  hubId: string;
  vehicleType: string;
  vehicleNumber: string;
  availabilityStatus: CourierAvailability;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  hub?: {
    id: string;
    name: string;
    code: string;
  };
}

export interface CourierTask {
  id: string;
  shipmentId: string;
  courierId: string;
  status: AssignmentStatus;
  assignedAt: string;
  acceptedAt?: string | null;
  completedAt?: string | null;
  shipment: {
    id: string;
    trackingNumber: string;
    parcelType: string;
    weight: number;
    deliveryType: string;
    status: string;
    deliveryCharge: number;
    paymentStatus: string;
    scheduledPickupAt?: string | null;
    description?: string | null;
    pickupAddress: SavedAddress;
    deliveryAddress: SavedAddress;
    customer?: {
      user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
      };
    };
  };
}

export interface CompleteDeliveryPayload {
  recipientName: string;
  recipientPhone: string;
  otp: string;
  imageUrl?: string;
  signatureUrl?: string;
  notes?: string;
}

export interface DeliveryFailedPayload {
  failureReason: string;
  notes?: string;
}

export interface ReschedulePayload {
  scheduledAt: string;
  reason?: string;
}
