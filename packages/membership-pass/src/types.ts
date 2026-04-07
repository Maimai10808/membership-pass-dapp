export type Address = `0x${string}`;

export type MembershipPassDeployment = {
  network: string;
  chainId: number;
  deployer: Address;
  membershipPassAddress: Address;
  createdAt: string;
};

export const EMPTY_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const satisfies Address;
