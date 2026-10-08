import type { SavedAddress } from "./shipment.interface";
import type { CourierAvailability } from "./courier.interface";

export interface Hub {
  id: string;
  name: string;
  code: string;
  address: string;
  city?: string;
  area?: string;
  isActive: boolean;
  zoneId?: string | null;
  zone?: {
    id: string;
    name: string;
    code: string;
  };
  phone?: string | null;
}

export type HubListItem = Hub;

export interface Courier {
  id: string;
  userId: string;
  vehicleType: string;
  vehicleNumber?: string;
  availabilityStatus?: CourierAvailability | string;
  status?: string;
  currentHubId?: string | null;
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

export type CourierListItem = Courier;

export interface OperationsShipment {
  id: string;
  trackingNumber: string;
  customerId: string;
  pickupAddressId: string;
  deliveryAddressId: string;
  originHubId?: string | null;
  destinationHubId?: string | null;
  parcelType: string;
  weight: number | string;
  deliveryType: string;
  deliveryCharge: number | string;
  status:
    | "PENDING_APPROVAL"
    | "CREATED"
    | "COURIER_ASSIGNED"
    | "PICKED_UP"
    | "AT_ORIGIN_HUB"
    | "IN_TRANSIT"
    | "AT_DESTINATION_HUB"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURN_INITIATED"
    | "RETURN_IN_TRANSIT"
    | "RETURNED"
    | string;
  paymentStatus: string;
  deliveryOtp?: string | null;
  scheduledPickupAt?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  pickupAddress?: SavedAddress;
  deliveryAddress?: SavedAddress;
  originHub?: Hub | null;
  destinationHub?: Hub | null;
  customer?: {
    user?: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
    };
  };
  courierAssignments?: {
    id: string;
    courier?: {
      id: string;
      user?: {
        id: string;
        name: string;
        phone: string | null;
      };
    };
    status: string;
  }[];
}

export interface AssignHubAndCourierPayload {
  originHubId: string;
  destinationHubId?: string;
  courierId: string;
  deliveryCharge?: number;
  note?: string;
}

export interface RejectShipmentPayload {
  reason: string;
}

export interface UpdateDeliveredPayload {
  note?: string;
}

export interface UpdateOutForDeliveryPayload {
  courierId?: string;
  note?: string;
}

export interface OperationsShipmentsQuery {
  status?: string;
  searchTerm?: string;
  originHubId?: string;
  destinationHubId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
