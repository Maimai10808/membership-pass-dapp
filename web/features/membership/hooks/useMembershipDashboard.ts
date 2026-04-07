"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Address } from "@membership-pass/contracts";
import {
  addBatchMembers,
  addSingleMember,
  checkMembershipStatus,
  readMembershipSnapshot,
  removeSingleMember,
} from "@/features/membership/services/membership-pass-client";
import { isValidAddress } from "@/features/membership/utils/address";
import { useWalletSession } from "@/features/membership/hooks/useWalletSession";

export function useMembershipDashboard() {
  const wallet = useWalletSession();
  const { account, connected, contract } = wallet;

  const [owner, setOwner] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);

  const [checkAddress, setCheckAddress] = useState("");
  const [checkResult, setCheckResult] = useState<boolean | null>(null);

  const [singleMemberAddress, setSingleMemberAddress] = useState("");
  const [batchMemberAddresses, setBatchMemberAddresses] = useState("");
  const [removeMemberAddress, setRemoveMemberAddress] = useState("");

  const [readLoading, setReadLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState<string | null>(null);

  const [readError, setReadError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [readStatus, setReadStatus] = useState("Ready");
  const [adminStatus, setAdminStatus] = useState("Ready");

  const isOwner = useMemo(() => {
    if (!owner || !account) {
      return false;
    }

    return owner.toLowerCase() === account.toLowerCase();
  }, [owner, account]);

  const refreshMembershipState = useCallback(async () => {
    if (!contract || !account) {
      return;
    }

    try {
      setReadLoading(true);
      setReadError("");
      setReadStatus("Loading membership state...");

      const snapshot = await readMembershipSnapshot(contract, account as Address);

      setOwner(snapshot.owner);
      setMembers(snapshot.members);
      setMemberCount(snapshot.memberCount);
      setIsCurrentUserMember(snapshot.isCurrentUserMember);
      setReadStatus("Membership state loaded");
    } catch (error) {
      console.error(error);
      setReadError(
        error instanceof Error ? error.message : "Failed to load membership state",
      );
      setReadStatus("Refresh failed");
    } finally {
      setReadLoading(false);
    }
  }, [account, contract]);

  const checkMembership = useCallback(async () => {
    if (!contract) {
      return;
    }

    const target = checkAddress.trim();

    if (!isValidAddress(target)) {
      setReadError("Please enter a valid EVM address.");
      setCheckResult(null);
      return;
    }

    try {
      setCheckLoading(true);
      setReadError("");
      setReadStatus("Checking membership...");

      setCheckResult(
        await checkMembershipStatus(contract, target as Address),
      );
      setReadStatus("Membership checked");
    } catch (error) {
      console.error(error);
      setReadError(
        error instanceof Error ? error.message : "Failed to check membership",
      );
      setReadStatus("Check failed");
    } finally {
      setCheckLoading(false);
    }
  }, [checkAddress, contract]);

  const runAdminTransaction = useCallback(
    async (
      mode: "add-single" | "add-batch" | "remove",
      statusText: string,
      action: () => Promise<void>,
    ) => {
      try {
        setAdminError("");
        setAdminLoading(mode);
        setAdminStatus("Waiting for wallet signature...");

        await action();
        setAdminStatus(statusText);
        await refreshMembershipState();
      } catch (error) {
        console.error(error);
        setAdminError(
          error instanceof Error ? error.message : "Admin transaction failed",
        );
        setAdminStatus(`${statusText} failed`);
      } finally {
        setAdminLoading(null);
      }
    },
    [refreshMembershipState],
  );

  const submitAddSingleMember = useCallback(async () => {
    if (!contract) {
      return;
    }

    const target = singleMemberAddress.trim();

    if (!isValidAddress(target)) {
      setAdminError("Please enter a valid member address.");
      return;
    }

    await runAdminTransaction("add-single", "Member added", async () => {
      const tx = await addSingleMember(contract, target as Address);
      setAdminStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setSingleMemberAddress("");
    });
  }, [contract, runAdminTransaction, singleMemberAddress]);

  const submitAddBatchMembers = useCallback(async () => {
    if (!contract) {
      return;
    }

    const addresses = batchMemberAddresses
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (addresses.length === 0) {
      setAdminError("Please enter at least one address.");
      return;
    }

    const invalid = addresses.find((address) => !isValidAddress(address));

    if (invalid) {
      setAdminError(`Invalid address found: ${invalid}`);
      return;
    }

    await runAdminTransaction("add-batch", "Batch members added", async () => {
      const tx = await addBatchMembers(contract, addresses as Address[]);
      setAdminStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setBatchMemberAddresses("");
    });
  }, [batchMemberAddresses, contract, runAdminTransaction]);

  const submitRemoveMember = useCallback(async () => {
    if (!contract) {
      return;
    }

    const target = removeMemberAddress.trim();

    if (!isValidAddress(target)) {
      setAdminError("Please enter a valid member address.");
      return;
    }

    await runAdminTransaction("remove", "Member removed", async () => {
      const tx = await removeSingleMember(contract, target as Address);
      setAdminStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setRemoveMemberAddress("");
    });
  }, [contract, removeMemberAddress, runAdminTransaction]);

  useEffect(() => {
    if (connected) {
      void refreshMembershipState();
    }
  }, [connected, refreshMembershipState]);

  return {
    wallet,
    owner,
    isOwner,
    isCurrentUserMember,
    members,
    memberCount,
    checkAddress,
    setCheckAddress,
    checkResult,
    singleMemberAddress,
    setSingleMemberAddress,
    batchMemberAddresses,
    setBatchMemberAddresses,
    removeMemberAddress,
    setRemoveMemberAddress,
    readLoading,
    checkLoading,
    adminLoading,
    readError,
    adminError,
    readStatus,
    adminStatus,
    refreshMembershipState,
    checkMembership,
    submitAddSingleMember,
    submitAddBatchMembers,
    submitRemoveMember,
  };
}
