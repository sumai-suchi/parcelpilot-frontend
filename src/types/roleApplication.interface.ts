export type ApplicationRole =
  | "COURIER"
  | "HUB_MANAGER"
  | "OPERATIONS_MANAGER"
  | "ADMIN";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CreateRoleApplicationPayload {
  desiredRole: ApplicationRole;
  notes?: string;
  experience?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  hubId?: string;
  profilePicture?: string;
}

export interface ReviewRoleApplicationPayload {
  status: ApplicationStatus;
  rejectionReason?: string;
}

export interface ApplicationHub {
  id: string;
  name: string;
  code: string;
  address: string;
  zone?: {
    id: string;
    name: string;
  };
}

export interface RoleApplication {
  id: string;
  userId: string;
  desiredRole: ApplicationRole;
  status: ApplicationStatus;
  notes?: string | null;
  experience?: string | null;
  vehicleType?: string | null;
  vehicleNumber?: string | null;
  hubId?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    profilePicture?: string | null;
    role: string;
  };
  hub?: ApplicationHub | null;
}
