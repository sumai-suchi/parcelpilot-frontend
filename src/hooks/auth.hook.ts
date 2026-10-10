import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMe,
  googleAuthLogin,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: googleAuthLogin,
  });
}
