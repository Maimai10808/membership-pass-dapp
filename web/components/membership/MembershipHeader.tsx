"use client";

import {
  ShieldCheck,
  Wallet,
  RefreshCw,
  ChevronRight,
  Orbit,
  ShieldEllipsis,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shortAddress } from "@/features/membership/utils/address";

type Props = {
  connected: boolean;
  account: string;
  walletLoading: boolean;
  networkName: string;
  chainId: number;
  contractAddress: string;
  onConnect: () => void;
  onRefresh: () => void;
};

export function MembershipHeader({
  connected,
  account,
  walletLoading,
  networkName,
  chainId,
  contractAddress,
  onConnect,
  onRefresh,
}: Props) {
  return (
    <section className="shell-panel rounded-[2rem] p-6 md:p-8">
      <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="absolute bottom-[-1rem] right-16 h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <Badge className="w-fit rounded-full border border-amber-200/20 bg-amber-300/12 px-3 py-1 text-amber-100 hover:bg-amber-300/12">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              Membership Protocol · {networkName}
            </Badge>

            <div className="space-y-3">
              <h1 className="editorial-display max-w-4xl text-5xl font-semibold text-white md:text-7xl">
                Curated access with a sharper on-chain control surface.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-stone-300 md:text-lg">
                Built for whitelist checks, owner-run member operations, and wallet-aware
                UI states without the usual demo-grade clutter.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="data-chip rounded-full px-4 py-2 text-sm text-stone-200">
                Owner-gated actions
              </div>
              <div className="data-chip rounded-full px-4 py-2 text-sm text-stone-200">
                Live contract reads
              </div>
              <div className="data-chip rounded-full px-4 py-2 text-sm text-stone-200">
                Wallet-aware UI states
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              onClick={onConnect}
              disabled={walletLoading}
              className="h-12 rounded-[1.1rem] bg-amber-300 px-5 text-base font-semibold text-slate-950 shadow-[0_12px_30px_rgba(251,191,36,0.24)] hover:bg-amber-200"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {connected ? shortAddress(account) : "Connect Wallet"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={onRefresh}
              className="data-chip h-12 rounded-[1.1rem] px-5 text-base text-stone-100 hover:bg-white/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh State
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="control-surface rounded-[1.5rem] p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-stone-400">
              <Orbit className="h-3.5 w-3.5 text-teal-200" />
              Chain ID
            </div>
            <div className="editorial-display mt-3 text-3xl font-semibold text-white">{chainId}</div>
            <p className="mt-1 text-sm text-stone-400">
              Active environment target for wallet switching.
            </p>
          </div>

          <div className="control-surface rounded-[1.5rem] p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-stone-400">
              <ShieldEllipsis className="h-3.5 w-3.5 text-amber-200" />
              Contract
            </div>
            <div className="mt-3 break-all font-mono text-sm leading-6 text-stone-100">
              {contractAddress}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(255,255,255,0.02))] p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-amber-100/80">
              Wallet Status
            </div>
            <div className="editorial-display mt-3 text-3xl font-semibold text-white">
              {connected ? "Connected" : "Disconnected"}
            </div>
            <p className="mt-1 text-sm text-stone-300">
              {connected
                ? "Ready for reads and write operations."
                : "Connect a wallet to unlock live on-chain interactions."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
