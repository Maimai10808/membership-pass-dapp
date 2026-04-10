"use client";

import { useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";

import { contracts } from "@/src/lib/contracts";
import type { Address, MembershipPassState } from "@/src/types/membership-pass";

const EMPTY_STATE: MembershipPassState = {
  owner: undefined,
  currentUserAddress: undefined,
  isOwner: false,
  isCurrentUserMember: false,
  memberCount: BigInt(0),
  members: [],
  isLoading: true,
  isError: false,
  error: null,
  refetch: async () => undefined,
};

export function useMembershipPassState(): MembershipPassState {
  const { address } = useAccount();

  const result = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...contracts.membershipPass,
        functionName: "owner",
      },
      {
        ...contracts.membershipPass,
        functionName: "getMemberCount",
      },
      {
        ...contracts.membershipPass,
        functionName: "getMembers",
      },
      ...(address
        ? [
            {
              ...contracts.membershipPass,
              functionName: "isMember",
              args: [address],
            },
          ]
        : []),
    ],
    query: {
      staleTime: 5_000,
      refetchInterval: 10_000,
    },
  });

  return useMemo(() => {
    if (!result.data) {
      return {
        ...EMPTY_STATE,
        currentUserAddress: address,
        isLoading: result.isLoading,
        isError: result.isError,
        error: result.error?.message ?? null,
        refetch: result.refetch,
      };
    }

    const [owner, memberCount, members, isCurrentUserMember] = result.data as [
      Address,
      bigint,
      readonly Address[],
      boolean?,
    ];

    return {
      owner,
      currentUserAddress: address,
      isOwner: Boolean(
        address && owner.toLowerCase() === address.toLowerCase(),
      ),
      isCurrentUserMember: isCurrentUserMember ?? false,
      memberCount,
      members,
      isLoading: result.isLoading,
      isError: result.isError,
      error: result.error?.message ?? null,
      refetch: result.refetch,
    };
  }, [
    address,
    result.data,
    result.isLoading,
    result.isError,
    result.error?.message,
    result.refetch,
  ]);
}
