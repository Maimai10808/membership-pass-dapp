"use client";

import { Crown, Shield, ShieldOff, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { shortAddress } from "@/features/membership/utils/address";

type Props = {
  account: string;
  owner: string;
  isOwner: boolean;
  isCurrentUserMember: boolean;
};

export function UserStatusCard({
  account,
  owner,
  isOwner,
  isCurrentUserMember,
}: Props) {
  return (
    <Card className="shell-panel rounded-[1.8rem] border-white/10 bg-transparent shadow-xl">
      <CardHeader className="relative border-b border-white/8 pb-5">
        <div className="section-kicker text-amber-200/75">
          Wallet Identity
        </div>
        <CardTitle className="editorial-display text-3xl text-white">
          Current Wallet Status
        </CardTitle>
        <CardDescription className="text-stone-300">
          Role and membership state for the connected address.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        <div className="control-surface rounded-[1.4rem] p-4">
          <div className="mb-1 text-sm text-stone-400">Connected Wallet</div>
          <div className="flex items-start gap-3 text-stone-100">
            <div className="data-chip rounded-xl p-2">
              <UserRound className="h-4 w-4 text-stone-300" />
            </div>
            <span className="break-all font-mono text-sm leading-6">{account || "-"}</span>
          </div>
        </div>

        <div className="control-surface rounded-[1.4rem] p-4">
          <div className="mb-1 text-sm text-stone-400">Owner</div>
          <div className="flex items-center gap-3 text-stone-100">
            <div className="rounded-xl bg-amber-300/10 p-2">
              <Crown className="h-4 w-4 text-amber-300" />
            </div>
            <span className="break-all font-mono text-sm leading-6">
              {owner ? shortAddress(owner) : "-"}
            </span>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
          <div className="mb-3 text-sm text-stone-400">Permission Snapshot</div>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={
                isOwner
                  ? "rounded-full bg-amber-500/15 px-3 py-1 text-amber-200"
                  : "rounded-full bg-slate-500/15 px-3 py-1 text-slate-200"
              }
            >
              {isOwner ? "You are the owner" : "You are not the owner"}
            </Badge>

            <Badge
              className={
                isCurrentUserMember
                  ? "rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200"
                  : "rounded-full bg-rose-500/15 px-3 py-1 text-rose-200"
              }
            >
              {isCurrentUserMember ? (
                <>
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  Whitelisted
                </>
              ) : (
                <>
                  <ShieldOff className="mr-1 h-3.5 w-3.5" />
                  Not Whitelisted
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
