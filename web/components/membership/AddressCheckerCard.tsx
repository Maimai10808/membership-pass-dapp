"use client";

import { Loader2, Search, ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Props = {
  checkAddress: string;
  setCheckAddress: (value: string) => void;
  checkResult: boolean | null;
  checkLoading: boolean;
  onCheck: () => void;
};

export function AddressCheckerCard({
  checkAddress,
  setCheckAddress,
  checkResult,
  checkLoading,
  onCheck,
}: Props) {
  return (
    <Card className="shell-panel rounded-[1.8rem] border-white/10 bg-transparent shadow-xl">
      <CardHeader className="border-b border-white/8 pb-5">
        <div className="section-kicker text-sky-200/80">
          Public Query
        </div>
        <CardTitle className="editorial-display text-3xl text-white">
          Address Checker
        </CardTitle>
        <CardDescription className="text-stone-300">
          Query whether any wallet address is currently whitelisted.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <Input
            value={checkAddress}
            onChange={(e) => setCheckAddress(e.target.value)}
            placeholder="Paste an EVM address, for example 0xabc..."
            className="control-surface h-12 rounded-[1.15rem] px-4 font-mono text-sm text-white placeholder:text-stone-500"
          />

          <Button
            onClick={onCheck}
            disabled={checkLoading}
            className="h-12 rounded-[1.15rem] bg-sky-400 px-5 text-base font-semibold text-slate-950 hover:bg-sky-300"
          >
            {checkLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Address
              </>
            )}
          </Button>
        </div>

        {checkResult !== null ? (
          <div className="control-surface rounded-[1.4rem] p-4">
            <div className="mb-2 text-sm text-stone-400">Query Result</div>
            <Badge
              className={
                checkResult
                  ? "rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200"
                  : "rounded-full bg-rose-500/15 px-3 py-1 text-rose-200"
              }
            >
              {checkResult ? (
                <>
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                  Eligible / Whitelisted
                </>
              ) : (
                <>
                  <ShieldX className="mr-1 h-3.5 w-3.5" />
                  Not Eligible
                </>
              )}
            </Badge>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
