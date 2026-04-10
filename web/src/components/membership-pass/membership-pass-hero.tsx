import { Badge } from "../ui/badge";

type MembershipPassHeroProps = {
  networkLabel: string;
  currentUserLabel: string;
  isConnected: boolean;
  isOwner: boolean;
  isMember: boolean;
};

export function MembershipPassHero({
  networkLabel,
  currentUserLabel,
  isConnected,
  isOwner,
  isMember,
}: MembershipPassHeroProps) {
  return (
    <section className="rounded-[36px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(244,250,250,0.9))] p-6 shadow-[0_24px_80px_rgba(148,163,184,0.18)] md:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="border-sky-200 bg-sky-100 text-sky-700">
              Teaching Dashboard
            </Badge>
            <Badge className="border-teal-200 bg-teal-100 text-teal-700">
              Membership Pass
            </Badge>
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-900 md:text-6xl">
            <span className="mt-2 block bg-gradient-to-r from-sky-700 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
              on-chain membership logic.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            This project is a membership whitelist system that allows owners and
            administrators to manage eligible users efficiently. It supports
            multiple whitelist import methods, including single and bulk
            additions, and enables users to quickly check whether they qualify
            for membership access.
          </p>
        </div>

        <div className="min-w-[300px] rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Live Session
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-slate-500">Wallet</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {currentUserLabel}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Network</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {networkLabel}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge
                className={
                  isConnected
                    ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                    : "border-slate-200 bg-slate-100 text-slate-600"
                }
              >
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>

              <Badge
                className={
                  isOwner
                    ? "border-amber-200 bg-amber-100 text-amber-700"
                    : "border-slate-200 bg-slate-100 text-slate-600"
                }
              >
                {isOwner ? "Owner" : "User"}
              </Badge>

              <Badge
                className={
                  isMember
                    ? "border-sky-200 bg-sky-100 text-sky-700"
                    : "border-slate-200 bg-slate-100 text-slate-600"
                }
              >
                {isMember ? "Member" : "Guest"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
