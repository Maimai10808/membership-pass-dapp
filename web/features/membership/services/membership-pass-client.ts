"use client";

import {
  BrowserProvider,
  Contract,
  isAddress,
  type ContractTransactionResponse,
} from "ethers";
import {
  membershipPassAbi,
  membershipPassDeployment,
  type Address,
} from "@membership-pass/contracts";

const DEPLOYMENT_ERROR =
  "MembershipPass contract is not deployed on the connected chain. Start the local Hardhat node, redeploy the contract, and make sure MetaMask is connected to the same localhost network.";

async function assertMembershipPassDeployment(
  provider: BrowserProvider,
  contractAddress: Address,
) {
  if (!isAddress(contractAddress)) {
    throw new Error(
      "MembershipPass contract address is invalid. Check your deployment config.",
    );
  }

  const code = await provider.getCode(contractAddress);

  if (code === "0x") {
    throw new Error(DEPLOYMENT_ERROR);
  }
}

function normalizeMembershipError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Membership contract request failed.");
  }

  const message = error.message.toLowerCase();

  if (
    "code" in error &&
    (error as { code?: string }).code === "BAD_DATA"
  ) {
    return new Error(DEPLOYMENT_ERROR);
  }

  if (
    message.includes("could not decode result data") ||
    message.includes("execution reverted")
  ) {
    return new Error(DEPLOYMENT_ERROR);
  }

  return error;
}

export async function createMembershipPassContract(
  provider: BrowserProvider,
  signerAddress?: Address,
) {
  await assertMembershipPassDeployment(
    provider,
    membershipPassDeployment.membershipPassAddress,
  );

  if (signerAddress) {
    return new Contract(
      membershipPassDeployment.membershipPassAddress,
      membershipPassAbi,
      await provider.getSigner(signerAddress),
    );
  }

  return new Contract(
    membershipPassDeployment.membershipPassAddress,
    membershipPassAbi,
    provider,
  );
}

export async function readMembershipSnapshot(
  contract: Contract,
  account: Address,
) {
  try {
    const [owner, isCurrentUserMember, members, memberCount] = await Promise.all([
      contract.owner() as Promise<Address>,
      contract.isMember(account) as Promise<boolean>,
      contract.getMembers() as Promise<Address[]>,
      contract.getMemberCount() as Promise<bigint>,
    ]);

    return {
      owner,
      isCurrentUserMember,
      members,
      memberCount: Number(memberCount),
    };
  } catch (error) {
    throw normalizeMembershipError(error);
  }
}

export async function checkMembershipStatus(
  contract: Contract,
  address: Address,
) {
  try {
    return (await contract.isMember(address)) as boolean;
  } catch (error) {
    throw normalizeMembershipError(error);
  }
}

export async function addSingleMember(contract: Contract, address: Address) {
  try {
    return (await contract["addMember(address)"](
      address,
    )) as ContractTransactionResponse;
  } catch (error) {
    throw normalizeMembershipError(error);
  }
}

export async function addBatchMembers(contract: Contract, addresses: Address[]) {
  try {
    return (await contract["addMember(address[])"](
      addresses,
    )) as ContractTransactionResponse;
  } catch (error) {
    throw normalizeMembershipError(error);
  }
}

export async function removeSingleMember(contract: Contract, address: Address) {
  try {
    return (await contract.removeMember(address)) as ContractTransactionResponse;
  } catch (error) {
    throw normalizeMembershipError(error);
  }
}
