"use client";

import { Loader2, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

type Props = {
  isOwner: boolean;
  singleMemberAddress: string;
  setSingleMemberAddress: (value: string) => void;
  batchMemberAddresses: string;
  setBatchMemberAddresses: (value: string) => void;
  removeMemberAddress: string;
  setRemoveMemberAddress: (value: string) => void;
  adminLoading: string | null;
  onAddSingle: () => void;
  onAddBatch: () => void;
  onRemove: () => void;
};

export function AdminPanel({
  isOwner,
  singleMemberAddress,
  setSingleMemberAddress,
  batchMemberAddresses,
  setBatchMemberAddresses,
  removeMemberAddress,
  setRemoveMemberAddress,
  adminLoading,
  onAddSingle,
  onAddBatch,
  onRemove,
}: Props) {
  return (
    <Card className="shell-panel rounded-[1.8rem] border-white/10 bg-transparent shadow-xl">
      <CardHeader className="border-b border-white/8 pb-5">
        <div className="section-kicker text-rose-200/75">
          Admin Console
        </div>
        <CardTitle className="editorial-display text-3xl text-white">
          Admin Panel
        </CardTitle>
        <CardDescription className="text-stone-300">
          Owner-only membership management tools.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-1">
        {!isOwner ? (
          <div className="control-surface rounded-[1.5rem] border-dashed p-6 text-center text-stone-300">
            Only the owner can use the admin actions.
          </div>
        ) : (
          <>
            <div className="control-surface rounded-[1.5rem] p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Add Single Member
                  </h3>
                  <p className="text-sm text-stone-400">
                    Add one wallet address to the whitelist.
                  </p>
                </div>
                <Input
                  value={singleMemberAddress}
                  onChange={(e) => setSingleMemberAddress(e.target.value)}
                  placeholder="0x..."
                  className="control-surface h-12 rounded-[1.15rem] px-4 font-mono text-sm text-white placeholder:text-stone-500"
                />
                <Button
                  onClick={onAddSingle}
                  disabled={adminLoading !== null}
                  className="h-12 rounded-[1.15rem] bg-amber-300 px-5 text-base font-semibold text-slate-950 hover:bg-amber-200"
                >
                  {adminLoading === "add-single" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Member
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="control-surface rounded-[1.5rem] p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Batch Add Members
                  </h3>
                  <p className="text-sm text-stone-400">
                    Paste multiple addresses separated by commas or new lines.
                  </p>
                </div>
                <Textarea
                  value={batchMemberAddresses}
                  onChange={(e) => setBatchMemberAddresses(e.target.value)}
                  placeholder={`0x123...\n0x456...\n0x789...`}
                  className="control-surface min-h-36 rounded-[1.15rem] px-4 font-mono text-sm text-white placeholder:text-stone-500"
                />
                <Button
                  onClick={onAddBatch}
                  disabled={adminLoading !== null}
                  className="h-12 rounded-[1.15rem] bg-teal-300 px-5 text-base font-semibold text-slate-950 hover:bg-teal-200"
                >
                  {adminLoading === "add-batch" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Batch...
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Add Batch
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="control-surface rounded-[1.5rem] p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Remove Member
                  </h3>
                  <p className="text-sm text-stone-400">
                    Remove one address from the whitelist.
                  </p>
                </div>
                <Input
                  value={removeMemberAddress}
                  onChange={(e) => setRemoveMemberAddress(e.target.value)}
                  placeholder="0x..."
                  className="control-surface h-12 rounded-[1.15rem] px-4 font-mono text-sm text-white placeholder:text-stone-500"
                />
                <Button
                  onClick={onRemove}
                  disabled={adminLoading !== null}
                  variant="destructive"
                  className="h-12 rounded-[1.15rem] border border-rose-400/20 bg-rose-500/15 px-5 text-base text-rose-100 hover:bg-rose-500/25"
                >
                  {adminLoading === "remove" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Member
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
