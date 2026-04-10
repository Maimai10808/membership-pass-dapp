"use client";

import { useMemo } from "react";
import { useReadContract } from "wagmi";

import { contracts } from "@/src/lib/contracts";
import type {
  Address,
  MembershipLookupResult,
} from "@/src/types/membership-pass";

type UseMembershipPassLookupParams = {
  addressToCheck?: Address;
  enabled?: boolean;
};

export function useMembershipPassLookup({
  addressToCheck,
  enabled = true,
}: UseMembershipPassLookupParams): MembershipLookupResult {
  const result = useReadContract({
    ...contracts.membershipPass,
    functionName: "isMember",
    args: addressToCheck ? [addressToCheck] : undefined,
    query: {
      enabled: Boolean(addressToCheck) && enabled,
      staleTime: 5_000,
    },
  });

  return useMemo(
    () => ({
      queryAddress: addressToCheck,
      isMember: result.data ?? false,
      isLoading: result.isLoading,
      isError: result.isError,
      error: result.error?.message ?? null,
      refetch: result.refetch,
    }),
    [
      addressToCheck,
      result.data,
      result.isLoading,
      result.isError,
      result.error?.message,
      result.refetch,
    ],
  );
}
