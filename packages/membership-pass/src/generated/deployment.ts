import type { MembershipPassDeployment } from "../types";

const envChainId = process.env.NEXT_PUBLIC_CHAIN_ID;
const envNetwork = process.env.NEXT_PUBLIC_NETWORK_NAME;
const envMembershipPassAddress =
  process.env.NEXT_PUBLIC_MEMBERSHIP_PASS_ADDRESS;

export const membershipPassDeployment: MembershipPassDeployment = {
  network: envNetwork ?? "localhost",
  chainId: envChainId ? Number(envChainId) : 31337,
  deployer: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  membershipPassAddress:
    (envMembershipPassAddress as `0x${string}` | undefined) ??
    "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
  createdAt: "2026-04-06T08:54:48.883Z",
};
