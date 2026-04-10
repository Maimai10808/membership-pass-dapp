import { ShieldX } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type MembershipPassAdminPanelProps = {
  canManageMembers: boolean;
  singleAddress: string;
  batchAddresses: string;
  removeAddress: string;
  onSingleAddressChange: (value: string) => void;
  onBatchAddressesChange: (value: string) => void;
  onRemoveAddressChange: (value: string) => void;
  onAddSingle: () => void;
  onAddBatch: () => void;
  onRemove: () => void;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  hash?: `0x${string}`;
  error: string | null;
};

export function MembershipPassAdminPanel({
  canManageMembers,
  singleAddress,
  batchAddresses,
  removeAddress,
  onSingleAddressChange,
  onBatchAddressesChange,
  onRemoveAddressChange,
  onAddSingle,
  onAddBatch,
  onRemove,
  isPending,
  isConfirming,
  isConfirmed,
  hash,
  error,
}: MembershipPassAdminPanelProps) {
  const disabled = !canManageMembers || isPending || isConfirming;

  return (
    <div className="relative">
      <Card className="relative overflow-hidden border-slate-200/80 bg-white/82 text-slate-900 shadow-[0_18px_48px_rgba(148,163,184,0.16)]">
        <CardHeader>
          <CardTitle className="text-xl font-black tracking-tight">
            Admin Controls
          </CardTitle>
        </CardHeader>

        <CardContent
          className={`space-y-6 transition-all duration-300 ${
            !canManageMembers
              ? "pointer-events-none select-none blur-[1.5px]"
              : ""
          }`}
          aria-hidden={!canManageMembers}
        >
          <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Add single member
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <Input
                value={singleAddress}
                onChange={(e) => onSingleAddressChange(e.target.value)}
                placeholder="0x..."
                disabled={disabled}
                className="h-11 rounded-2xl border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400"
              />
              <Button
                type="button"
                onClick={onAddSingle}
                disabled={disabled}
                className="h-11 rounded-2xl bg-sky-600 text-white hover:bg-sky-500"
              >
                Add
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Add batch members
            </p>
            <p className="mb-3 text-xs text-slate-500">
              One address per line, or comma-separated.
            </p>
            <div className="space-y-3">
              <Textarea
                value={batchAddresses}
                onChange={(e) => onBatchAddressesChange(e.target.value)}
                placeholder={`0x...\n0x...\n0x...`}
                disabled={disabled}
                className="min-h-32 rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"
              />
              <Button
                type="button"
                onClick={onAddBatch}
                disabled={disabled}
                className="h-11 rounded-2xl bg-teal-600 text-white hover:bg-teal-500"
              >
                Add batch
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Remove member
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <Input
                value={removeAddress}
                onChange={(e) => onRemoveAddressChange(e.target.value)}
                placeholder="0x..."
                disabled={disabled}
                className="h-11 rounded-2xl border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400"
              />
              <Button
                type="button"
                variant="outline"
                onClick={onRemove}
                disabled={disabled}
                className="h-11 rounded-2xl border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
              >
                Remove
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5 text-sm">
            <p>
              <span className="text-slate-500">Pending:</span>{" "}
              <span className="font-medium text-slate-900">
                {isPending ? "Yes" : "No"}
              </span>
            </p>
            <p className="mt-2">
              <span className="text-slate-500">Confirming:</span>{" "}
              <span className="font-medium text-slate-900">
                {isConfirming ? "Yes" : "No"}
              </span>
            </p>
            <p className="mt-2">
              <span className="text-slate-500">Confirmed:</span>{" "}
              <span className="font-medium text-slate-900">
                {isConfirmed ? "Yes" : "No"}
              </span>
            </p>
            <p className="mt-2 break-all">
              <span className="text-slate-500">Transaction:</span>{" "}
              <span className="font-medium text-slate-900">
                {hash ?? "None"}
              </span>
            </p>
            <p className="mt-2 break-all">
              <span className="text-slate-500">Error:</span>{" "}
              <span className="font-medium text-slate-900">
                {error ?? "None"}
              </span>
            </p>
          </div>
        </CardContent>

        {!canManageMembers && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-rose-200 bg-rose-50 shadow-lg">
              <ShieldX className="h-16 w-16 text-rose-600" strokeWidth={2.5} />
            </div>

            <p className="mt-6 text-center text-2xl font-black tracking-tight text-slate-900">
              Admin Access Only
            </p>
            <p className="mt-2 max-w-md text-center text-sm text-slate-600">
              Your connected wallet does not have administrator permission. This
              panel is locked until an authorized admin account is used.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
