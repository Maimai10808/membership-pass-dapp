import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type MembershipPassRuntimePanelProps = {
  currentUserLabel: string;
  ownerLabel: string;
  networkLabel: string;
  canManageMembers: boolean;
  isConnected: boolean;
  isWrongChain: boolean;
  onPrimaryAction: () => void;
  onDisconnect: () => void;
};

export function MembershipPassRuntimePanel({
  currentUserLabel,
  ownerLabel,
  networkLabel,
  canManageMembers,
  isConnected,
  isWrongChain,
  onPrimaryAction,
  onDisconnect,
}: MembershipPassRuntimePanelProps) {
  return (
    <Card className="border-slate-200/80 bg-white/82 text-slate-900 shadow-[0_18px_48px_rgba(148,163,184,0.16)]">
      <CardHeader>
        <CardTitle className="text-xl font-black tracking-tight">
          Runtime Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4">
          <p className="text-sm text-slate-500">Current wallet</p>
          <p className="mt-1 font-semibold text-slate-900">{currentUserLabel}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4">
          <p className="text-sm text-slate-500">Contract owner</p>
          <p className="mt-1 font-semibold text-slate-900">{ownerLabel}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4">
          <p className="text-sm text-slate-500">Network</p>
          <p className="mt-1 font-semibold text-slate-900">{networkLabel}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            className={
              canManageMembers
                ? "border-amber-200 bg-amber-100 text-amber-700"
                : "border-slate-200 bg-slate-100 text-slate-600"
            }
          >
            {canManageMembers ? "Admin access" : "Read only"}
          </Badge>

          <Badge
            className={
              isWrongChain
                ? "border-rose-200 bg-rose-100 text-rose-700"
                : "border-teal-200 bg-teal-100 text-teal-700"
            }
          >
            {isWrongChain ? "Wrong network" : "Ready"}
          </Badge>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            onClick={onPrimaryAction}
            className="h-11 flex-1 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white shadow-[0_10px_30px_rgba(14,165,233,0.22)] hover:from-sky-500 hover:via-teal-500 hover:to-emerald-500"
          >
            {!isConnected
              ? "Connect wallet"
              : isWrongChain
                ? "Switch network"
                : "Wallet ready"}
          </Button>

          {isConnected ? (
            <Button
              type="button"
              variant="outline"
              onClick={onDisconnect}
              className="h-11 rounded-2xl border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100"
            >
              Disconnect
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
