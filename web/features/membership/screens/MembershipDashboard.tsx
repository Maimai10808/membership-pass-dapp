"use client";

import { useEffect, useState } from "react";
import { Activity, BadgeCheck, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { membershipPassDeployment } from "@membership-pass/contracts";
import { AddressCheckerCard } from "@/components/membership/AddressCheckerCard";
import { AdminPanel } from "@/components/membership/AdminPanel";
import { MembershipHeader } from "@/components/membership/MembershipHeader";
import { UserStatusCard } from "@/components/membership/UserStatusCard";
import { WhitelistListCard } from "@/components/membership/WhitelistListCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMembershipDashboard } from "@/features/membership/hooks/useMembershipDashboard";

export function MembershipDashboard() {
  const membership = useMembershipDashboard();
  const wallet = membership.wallet;
  const [activeTab, setActiveTab] = useState<"checker" | "members" | "admin">(
    "checker",
  );

  useEffect(() => {
    if (wallet.walletError) toast.error(wallet.walletError);
  }, [wallet.walletError]);

  useEffect(() => {
    if (membership.readError) toast.error(membership.readError);
  }, [membership.readError]);

  useEffect(() => {
    if (membership.adminError) toast.error(membership.adminError);
  }, [membership.adminError]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-6 lg:px-8">
      <div className="glow-orb absolute left-[-5rem] top-20 h-36 w-36 rounded-full bg-amber-300/30" />
      <div className="glow-orb absolute right-[-3rem] top-52 h-40 w-40 rounded-full bg-emerald-300/18" />
      <div className="mesh-grid pointer-events-none absolute inset-x-0 top-0 h-[34rem]" />
      <div className="pointer-events-none absolute inset-x-4 top-6 h-px dashboard-stripe md:inset-x-6 lg:inset-x-8" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <MembershipHeader
            connected={wallet.connected}
            account={wallet.account}
            walletLoading={wallet.walletLoading}
            networkName={membershipPassDeployment.network}
            chainId={membershipPassDeployment.chainId}
            contractAddress={membershipPassDeployment.membershipPassAddress}
            onConnect={() => void wallet.connectWallet()}
            onRefresh={() => void membership.refreshMembershipState()}
          />

          <div className="shell-panel rounded-[2rem] p-5">
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="section-kicker text-amber-200/80">
                    System Pulse
                  </div>
                  <div className="editorial-display mt-2 text-3xl font-semibold text-white">
                    Membership Operations
                  </div>
                </div>
                <div className="data-chip rounded-2xl p-3 text-amber-200">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="control-surface rounded-[1.4rem] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400">
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
                    Members
                  </div>
                  <div className="editorial-display mt-3 text-4xl font-semibold text-white">
                    {membership.memberCount}
                  </div>
                  <p className="mt-1 text-sm text-stone-400">
                    Live count from the contract state.
                  </p>
                </div>

                <div className="control-surface rounded-[1.4rem] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400">
                    <Crown className="h-3.5 w-3.5 text-amber-300" />
                    Owner Role
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    {membership.isOwner ? "Active on this wallet" : "Read-only mode"}
                  </div>
                  <p className="mt-1 text-sm text-stone-400">
                    Admin write actions are gated at the UI and contract layer.
                  </p>
                </div>

                <div className="control-surface rounded-[1.4rem] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400">
                    <Activity className="h-3.5 w-3.5 text-sky-300" />
                    Network
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white capitalize">
                    {membershipPassDeployment.network}
                  </div>
                  <p className="mt-1 text-sm text-stone-400">
                    Chain ID {membershipPassDeployment.chainId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-6">
            <UserStatusCard
              account={wallet.account}
              owner={membership.owner}
              isOwner={membership.isOwner}
              isCurrentUserMember={membership.isCurrentUserMember}
            />

            <Alert className="shell-panel rounded-[1.75rem] border-white/10 bg-transparent text-slate-100">
              <AlertTitle className="text-white">Status</AlertTitle>
              <AlertDescription className="text-stone-300">
                {membership.adminStatus !== "Ready"
                  ? membership.adminStatus
                  : membership.readStatus !== "Ready"
                    ? membership.readStatus
                    : wallet.walletStatus}
              </AlertDescription>
            </Alert>
          </div>

          <section className="w-full">
            <div className="shell-panel flex h-auto w-full justify-start gap-2 rounded-[1.5rem] border-white/10 bg-transparent p-2 text-stone-200">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "checker"}
                data-state={activeTab === "checker" ? "active" : "inactive"}
                onClick={() => setActiveTab("checker")}
                className={`inline-flex flex-1 items-center justify-center rounded-[1rem] px-4 py-2.5 text-sm transition-colors ${
                  activeTab === "checker"
                    ? "bg-amber-300 text-slate-950"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Address Checker
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "members"}
                data-state={activeTab === "members" ? "active" : "inactive"}
                onClick={() => setActiveTab("members")}
                className={`inline-flex flex-1 items-center justify-center rounded-[1rem] px-4 py-2.5 text-sm transition-colors ${
                  activeTab === "members"
                    ? "bg-amber-300 text-slate-950"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Whitelist List
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "admin"}
                data-state={activeTab === "admin" ? "active" : "inactive"}
                onClick={() => setActiveTab("admin")}
                className={`inline-flex flex-1 items-center justify-center rounded-[1rem] px-4 py-2.5 text-sm transition-colors ${
                  activeTab === "admin"
                    ? "bg-amber-300 text-slate-950"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Admin Panel
              </button>
            </div>

            <div className="mt-4">
              {activeTab === "checker" ? (
              <AddressCheckerCard
                checkAddress={membership.checkAddress}
                setCheckAddress={membership.setCheckAddress}
                checkResult={membership.checkResult}
                checkLoading={membership.checkLoading}
                onCheck={() => void membership.checkMembership()}
              />
              ) : null}

              {activeTab === "members" ? (
              <WhitelistListCard
                members={membership.members}
                owner={membership.owner}
                memberCount={membership.memberCount}
              />
              ) : null}

              {activeTab === "admin" ? (
              <AdminPanel
                isOwner={membership.isOwner}
                singleMemberAddress={membership.singleMemberAddress}
                setSingleMemberAddress={membership.setSingleMemberAddress}
                batchMemberAddresses={membership.batchMemberAddresses}
                setBatchMemberAddresses={membership.setBatchMemberAddresses}
                removeMemberAddress={membership.removeMemberAddress}
                setRemoveMemberAddress={membership.setRemoveMemberAddress}
                adminLoading={membership.adminLoading}
                onAddSingle={() => void membership.submitAddSingleMember()}
                onAddBatch={() => void membership.submitAddBatchMembers()}
                onRemove={() => void membership.submitRemoveMember()}
              />
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
