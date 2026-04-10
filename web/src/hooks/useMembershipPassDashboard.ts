"use client";

import { useMemo } from "react";

import { useWallet } from "@/src/hooks/useWallet";
import { useMembershipPassState } from "@/src/hooks/useMembershipPassState";
import { useMembershipPassAdminActions } from "@/src/hooks/useMembershipPassAdminActions";
import type {
  Address,
  MembershipPassDashboardModel,
  MembershipPassDashboardView,
} from "@/src/types/membership-pass";

function formatAddress(address?: Address) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function useMembershipPassDashboard(): MembershipPassDashboardModel {
  const wallet = useWallet();
  const membershipPass = useMembershipPassState();

  const adminActions = useMembershipPassAdminActions(() => {
    void membershipPass.refetch();
  });

  const view = useMemo<MembershipPassDashboardView>(
    () => ({
      ownerLabel: formatAddress(membershipPass.owner),
      currentUserLabel: formatAddress(wallet.address),
      memberCountLabel: membershipPass.memberCount.toString(),
      currentUserMembershipLabel: membershipPass.isCurrentUserMember
        ? "Member"
        : "Not a member",
      networkLabel: wallet.isConnected
        ? wallet.isWrongChain
          ? "Wrong network"
          : `Chain ${wallet.chainId}`
        : "Disconnected",
      canManageMembers:
        wallet.isConnected && !wallet.isWrongChain && membershipPass.isOwner,
    }),
    [
      membershipPass.owner,
      membershipPass.memberCount,
      membershipPass.isCurrentUserMember,
      membershipPass.isOwner,
      wallet.address,
      wallet.isConnected,
      wallet.isWrongChain,
      wallet.chainId,
    ],
  );

  return {
    wallet: {
      address: wallet.address,
      isConnected: wallet.isConnected,
      isWrongChain: wallet.isWrongChain,
      isConnecting: wallet.isConnecting,
      isSwitchingChain: wallet.isSwitchingChain,
      connect: wallet.connect,
      disconnect: wallet.disconnect,
      switchToTargetChain: wallet.switchToTargetChain,
    },
    membershipPass,
    adminActions,
    view,
  };
}
