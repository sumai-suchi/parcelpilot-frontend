import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bulkCreateAdminHubs,
  createAdminHub,
  getAdminCouriers,
  getAdminHubs,
  getAdminOverview,
  getAdminPayments,
  getAdminShipments,
  getAdminUsers,
  getAdminZones,
  updateUserStatus,
} from "@/api/admin.api";
import type {
  CreateHubPayload,
  UpdateUserStatusPayload,
} from "@/types/admin.interface";

export function useAdminOverview() {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
  });
}

export function useAdminUsers(params?: {
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsers(params),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserStatusPayload;
    }) => updateUserStatus(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });
}

export function useAdminCouriers() {
  return useQuery({
    queryKey: ["admin-couriers"],
    queryFn: getAdminCouriers,
  });
}

export function useAdminHubs() {
  return useQuery({
    queryKey: ["admin-hubs"],
    queryFn: getAdminHubs,
  });
}

export function useCreateAdminHub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateHubPayload) => createAdminHub(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hubs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });
}

export function useBulkCreateAdminHubs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: any[]) => bulkCreateAdminHubs(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hubs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-zones"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });
}

export function useAdminZones() {
  return useQuery({
    queryKey: ["admin-zones"],
    queryFn: getAdminZones,
  });
}

export function useAdminShipments(params?: any) {
  return useQuery({
    queryKey: ["admin-shipments", params],
    queryFn: () => getAdminShipments(params),
  });
}

export function useAdminPayments(params?: any) {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: () => getAdminPayments(params),
  });
}
