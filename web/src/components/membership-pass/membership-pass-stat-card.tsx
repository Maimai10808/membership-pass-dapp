import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

type MembershipPassStatCardProps = {
  label: string;
  value: string;
  icon?: ReactNode;
};

export function MembershipPassStatCard({
  label,
  value,
  icon,
}: MembershipPassStatCardProps) {
  return (
    <Card className="border-slate-200/80 bg-white/80 text-slate-900 shadow-[0_18px_48px_rgba(148,163,184,0.16)]">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-3 text-slate-500">
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
              {icon}
            </div>
          ) : null}
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
            {label}
          </p>
        </div>

        <p className="text-lg font-black tracking-tight text-slate-900 md:text-2xl">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
