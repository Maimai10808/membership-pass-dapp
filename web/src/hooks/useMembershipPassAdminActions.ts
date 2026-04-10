"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BaseError } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { contracts } from "@/src/lib/contracts";
import type {
  AddBatchMembersParams,
  AddSingleMemberParams,
  ContractWriteState,
  MembershipPassAdminActions,
  RemoveMemberParams,
} from "@/src/types/membership-pass";

type UseMembershipPassAdminActionsReturn = MembershipPassAdminActions &
  ContractWriteState;

export function useMembershipPassAdminActions(
  onSuccess?: () => void,
): UseMembershipPassAdminActionsReturn {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    data: hash,
    writeContractAsync,
    isPending,
    reset: resetWrite,
  } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: Boolean(hash),
    },
  });

  useEffect(() => {
    if (receipt.isSuccess) {
      onSuccess?.();
    }
  }, [receipt.isSuccess, onSuccess]);

  const normalizeError = useCallback((error: unknown) => {
    if (error instanceof BaseError) {
      return error.shortMessage || error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Transaction failed.";
  }, []);

  const addSingleMember = useCallback(
    async ({ user }: AddSingleMemberParams) => {
      try {
        setSubmitError(null);

        await writeContractAsync({
          ...contracts.membershipPass,
          functionName: "addMember",
          args: [user],
        });
      } catch (error) {
        setSubmitError(normalizeError(error));
        throw error;
      }
    },
    [normalizeError, writeContractAsync],
  );

  const addBatchMembers = useCallback(
    async ({ users }: AddBatchMembersParams) => {
      try {
        setSubmitError(null);

        await writeContractAsync({
          ...contracts.membershipPass,
          functionName: "addMember",
          args: [users],
        });
      } catch (error) {
        setSubmitError(normalizeError(error));
        throw error;
      }
    },
    [normalizeError, writeContractAsync],
  );

  const removeMember = useCallback(
    async ({ user }: RemoveMemberParams) => {
      try {
        setSubmitError(null);

        await writeContractAsync({
          ...contracts.membershipPass,
          functionName: "removeMember",
          args: [user],
        });
      } catch (error) {
        setSubmitError(normalizeError(error));
        throw error;
      }
    },
    [normalizeError, writeContractAsync],
  );

  const reset = useCallback(() => {
    setSubmitError(null);
    resetWrite();
  }, [resetWrite]);

  return useMemo(
    () => ({
      addSingleMember,
      addBatchMembers,
      removeMember,
      hash,
      isPending,
      isConfirming: receipt.isLoading,
      isConfirmed: receipt.isSuccess,
      error: submitError ?? receipt.error?.message ?? null,
      reset,
    }),
    [
      addSingleMember,
      addBatchMembers,
      removeMember,
      hash,
      isPending,
      receipt.isLoading,
      receipt.isSuccess,
      receipt.error?.message,
      submitError,
      reset,
    ],
  );
}
