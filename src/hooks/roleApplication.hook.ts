import {
  applyForRole,
  getAllApplications,
  getApplicationHubs,
  getMyApplications,
  reviewRoleApplication,
} from "@/api/roleApplication.api";
import type {
  CreateRoleApplicationPayload,
  ReviewRoleApplicationPayload,
} from "@/types/roleApplication.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApplyForRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRoleApplicationPayload) => applyForRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-role-applications"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useGetMyApplications() {
  return useQuery({
    queryKey: ["my-role-applications"],
    queryFn: getMyApplications,
    retry: 1,
  });
}

export function useGetApplicationHubs() {
  return useQuery({
    queryKey: ["application-hubs"],
    queryFn: getApplicationHubs,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllApplications(query?: {
  status?: string;
  desiredRole?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["admin-role-applications", query],
    queryFn: () => getAllApplications(query),
  });
}

export function useReviewRoleApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ReviewRoleApplicationPayload;
    }) => reviewRoleApplication(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-role-applications"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
      queryClient.invalidateQueries({ queryKey: ["hub-managers"] });
      queryClient.invalidateQueries({ queryKey: ["operations-managers"] });
    },
  });
}
