import {
  membershipPassAbi,
  membershipPassAddress,
  deploymentMeta,
} from "@generated/contracts";

export const contracts = {
  membershipPass: {
    address: membershipPassAddress,
    abi: membershipPassAbi,
  },
  deployment: deploymentMeta,
} as const;

export const targetChainId = deploymentMeta.chainId;
