"use client";

import { useMemo, useState } from "react";
import { isAddress } from "viem";

import { useMembershipPassDashboard } from "@/src/hooks/useMembershipPassDashboard";
import { useMembershipPassLookup } from "@/src/hooks/useMembershipPassLookup";

function formatAddress(address?: `0x${string}`) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function parseAddressList(value: string): `0x${string}`[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter((item): item is `0x${string}` => Boolean(item) && isAddress(item));
}

export function useMembershipPassDashboardController() {
  const { wallet, membershipPass, adminActions, view } =
    useMembershipPassDashboard();

  const [singleAddress, setSingleAddress] = useState("");
  const [batchAddresses, setBatchAddresses] = useState("");
  const [removeAddress, setRemoveAddress] = useState("");
  const [lookupAddress, setLookupAddress] = useState("");

  const normalizedLookupAddress = useMemo(() => {
    return isAddress(lookupAddress)
      ? (lookupAddress as `0x${string}`)
      : undefined;
  }, [lookupAddress]);

  const lookup = useMembershipPassLookup({
    addressToCheck: normalizedLookupAddress,
    enabled: Boolean(normalizedLookupAddress),
  });

  const handlePrimaryWalletAction = async () => {
    if (!wallet.isConnected) {
      await wallet.connect();
      return;
    }

    if (wallet.isWrongChain) {
      await wallet.switchToTargetChain();
    }
  };

  const handleAddSingle = async () => {
    if (!isAddress(singleAddress)) return;

    await adminActions.addSingleMember({
      user: singleAddress as `0x${string}`,
    });

    setSingleAddress("");
  };

  const handleAddBatch = async () => {
    const users = parseAddressList(batchAddresses);
    if (!users.length) return;

    await adminActions.addBatchMembers({ users });
    setBatchAddresses("");
  };

  const handleRemove = async () => {
    if (!isAddress(removeAddress)) return;

    await adminActions.removeMember({
      user: removeAddress as `0x${string}`,
    });

    setRemoveAddress("");
  };

  const lookupAddressLabel = normalizedLookupAddress
    ? formatAddress(normalizedLookupAddress)
    : "Invalid or empty";

  const lookupResultLabel = normalizedLookupAddress
    ? lookup.isLoading
      ? "Loading..."
      : lookup.isMember
        ? "Eligible / Member"
        : "Not eligible"
    : "-";

  return {
    wallet,
    membershipPass,
    adminActions,
    view,

    form: {
      singleAddress,
      batchAddresses,
      removeAddress,
      lookupAddress,
      setSingleAddress,
      setBatchAddresses,
      setRemoveAddress,
      setLookupAddress,
    },

    lookup: {
      ...lookup,
      normalizedLookupAddress,
      lookupAddressLabel,
      lookupResultLabel,
    },

    actions: {
      handlePrimaryWalletAction,
      handleAddSingle,
      handleAddBatch,
      handleRemove,
    },
  };
}
