export type UserRoleType =
  | "CUSTOMER"
  | "COURIER"
  | "HUB_MANAGER"
  | "OPERATIONS_MANAGER"
  | "ADMIN";

export type UserStatusType = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRoleType;
  status: UserStatusType;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDashboardOverview {
  totalRevenue: number;
  currency: string;
  totalShipments: number;
  shipmentsByStatus: Record<string, number>;
  usersByRole: Record<string, number>;
  infrastructure: {
    activeHubs: number;
    activeZones: number;
  };
  recentActivities: Array<{
    id: string;
    status: string;
    createdAt: string;
    note?: string | null;
    shipment?: {
      id: string;
      trackingNumber: string;
      status: string;
    };
    updater?: {
      id: string;
      name: string;
      role: string;
    };
  }>;
}

export interface UpdateUserStatusPayload {
  status: UserStatusType;
}

export interface CreateHubPayload {
  name: string;
  code: string;
  zoneId: string;
  address: string;
  phone?: string;
}

export interface AdminZoneItem {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    hubs: number;
    pricingRules: number;
  };
}

export interface AdminHubItem {
  id: string;
  name: string;
  code: string;
  zoneId: string;
  address: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  zone?: AdminZoneItem;
  _count?: {
    couriers: number;
    originShipments: number;
    destinationShipments: number;
  };
}
