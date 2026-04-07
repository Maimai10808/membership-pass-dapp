"use client";

import { Crown, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

type Props = {
  members: string[];
  owner: string;
  memberCount: number;
};

export function WhitelistListCard({ members, owner, memberCount }: Props) {
  return (
    <Card className="shell-panel rounded-[1.8rem] border-white/10 bg-transparent shadow-xl">
      <CardHeader className="border-b border-white/8 pb-5">
        <div className="section-kicker text-emerald-200/80">
          Contract Roster
        </div>
        <CardTitle className="editorial-display text-3xl text-white">
          Whitelist Members
        </CardTitle>
        <CardDescription className="text-stone-300">
          Current on-chain whitelist list. Total members: {memberCount}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-1">
        {members.length === 0 ? (
          <div className="control-surface rounded-[1.5rem] border-dashed p-6 text-center text-stone-300">
            No whitelisted members yet.
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((member, index) => {
              const memberIsOwner =
                owner && owner.toLowerCase() === member.toLowerCase();

              return (
                <div
                  key={member}
                  className="control-surface flex flex-col gap-4 rounded-[1.4rem] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/12 text-amber-100">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-white">
                        {shortAddress(member)}
                      </div>
                      <div className="truncate font-mono text-sm text-stone-400">
                        {member}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {memberIsOwner ? (
                      <Badge className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-200">
                        <Crown className="mr-1 h-3.5 w-3.5" />
                        Owner
                      </Badge>
                    ) : null}

                    <Badge className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">
                      <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                      Member
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
