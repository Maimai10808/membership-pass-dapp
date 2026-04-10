export type Address = `0x${string}`;

export type MembershipPassState = {
  owner: Address | undefined;
  currentUserAddress: Address | undefined;
  isOwner: boolean;
  isCurrentUserMember: boolean;
  memberCount: bigint;
  members: readonly Address[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
};

export type MembershipLookupResult = {
  queryAddress: Address | undefined;
  isMember: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
};

export type ContractWriteState = {
  hash?: Address;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: string | null;
  reset: () => void;
};

export type AddSingleMemberParams = {
  user: Address;
};

export type AddBatchMembersParams = {
  users: Address[];
};

export type RemoveMemberParams = {
  user: Address;
};

export type MembershipPassAdminActions = {
  addSingleMember: (params: AddSingleMemberParams) => Promise<void>;
  addBatchMembers: (params: AddBatchMembersParams) => Promise<void>;
  removeMember: (params: RemoveMemberParams) => Promise<void>;
};

export type MembershipPassDashboardView = {
  ownerLabel: string;
  currentUserLabel: string;
  memberCountLabel: string;
  currentUserMembershipLabel: string;
  networkLabel: string;
  canManageMembers: boolean;
};

export type MembershipPassDashboardModel = {
  wallet: {
    address: Address | undefined;
    isConnected: boolean;
    isWrongChain: boolean;
    isConnecting: boolean;
    isSwitchingChain: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
    switchToTargetChain: () => Promise<void>;
  };
  membershipPass: MembershipPassState;
  adminActions: MembershipPassAdminActions & ContractWriteState;
  view: MembershipPassDashboardView;
};
