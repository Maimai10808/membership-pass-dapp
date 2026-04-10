"use client";

import { ShieldCheck, Users, Crown, Wallet } from "lucide-react";

import { useMembershipPassDashboardController } from "@/src/hooks/useMembershipPassDashboardController";

import { MembershipPassShell } from "@/src/components/membership-pass/membership-pass-shell";
import { MembershipPassHero } from "@/src/components/membership-pass/membership-pass-hero";
import { MembershipPassStatCard } from "@/src/components/membership-pass/membership-pass-stat-card";
import { MembershipPassRuntimePanel } from "@/src/components/membership-pass/membership-pass-runtime-panel";
import { MembershipPassLookupPanel } from "@/src/components/membership-pass/membership-pass-lookup-panel";
import { MembershipPassAdminPanel } from "@/src/components/membership-pass/membership-pass-admin-panel";
import { MembershipPassMembersPanel } from "@/src/components/membership-pass/membership-pass-members-panel";

export function MembershipPassDashboard() {
  const { wallet, membershipPass, adminActions, view, form, lookup, actions } =
    useMembershipPassDashboardController();

  return (
    <MembershipPassShell>
      <div className="space-y-6">
        <MembershipPassHero
          networkLabel={view.networkLabel}
          currentUserLabel={view.currentUserLabel}
          isConnected={wallet.isConnected}
          isOwner={membershipPass.isOwner}
          isMember={membershipPass.isCurrentUserMember}
        />

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Dashboard Summary
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                Membership state at a glance
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MembershipPassStatCard
              label="Current Wallet"
              value={view.currentUserLabel}
              icon={<Wallet className="h-4 w-4" />}
            />
            <MembershipPassStatCard
              label="Contract Owner"
              value={view.ownerLabel}
              icon={<Crown className="h-4 w-4" />}
            />
            <MembershipPassStatCard
              label="Member Count"
              value={view.memberCountLabel}
              icon={<Users className="h-4 w-4" />}
            />
            <MembershipPassStatCard
              label="Current Status"
              value={view.currentUserMembershipLabel}
              icon={<ShieldCheck className="h-4 w-4" />}
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <MembershipPassAdminPanel
              canManageMembers={view.canManageMembers}
              singleAddress={form.singleAddress}
              batchAddresses={form.batchAddresses}
              removeAddress={form.removeAddress}
              onSingleAddressChange={form.setSingleAddress}
              onBatchAddressesChange={form.setBatchAddresses}
              onRemoveAddressChange={form.setRemoveAddress}
              onAddSingle={() => void actions.handleAddSingle()}
              onAddBatch={() => void actions.handleAddBatch()}
              onRemove={() => void actions.handleRemove()}
              isPending={adminActions.isPending}
              isConfirming={adminActions.isConfirming}
              isConfirmed={adminActions.isConfirmed}
              hash={adminActions.hash}
              error={adminActions.error}
            />

            <MembershipPassMembersPanel members={membershipPass.members} />
          </div>

          <div className="space-y-6">
            <MembershipPassLookupPanel
              lookupAddress={form.lookupAddress}
              onLookupAddressChange={form.setLookupAddress}
              lookupAddressLabel={lookup.lookupAddressLabel}
              lookupResultLabel={lookup.lookupResultLabel}
              lookupError={lookup.error}
            />

            <MembershipPassRuntimePanel
              currentUserLabel={view.currentUserLabel}
              ownerLabel={view.ownerLabel}
              networkLabel={view.networkLabel}
              canManageMembers={view.canManageMembers}
              isConnected={wallet.isConnected}
              isWrongChain={wallet.isWrongChain}
              onPrimaryAction={() => void actions.handlePrimaryWalletAction()}
              onDisconnect={() => wallet.disconnect()}
            />
          </div>
        </section>
      </div>
    </MembershipPassShell>
  );
}
