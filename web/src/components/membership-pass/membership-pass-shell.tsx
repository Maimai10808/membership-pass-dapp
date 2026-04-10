import type { ReactNode } from "react";

type MembershipPassShellProps = {
  children: ReactNode;
};

export function MembershipPassShell({ children }: MembershipPassShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-sky-200/60 blur-[120px]" />
        <div className="absolute right-[-6%] top-[6%] h-[24rem] w-[24rem] rounded-full bg-teal-200/55 blur-[120px]" />
        <div className="absolute bottom-[-12%] left-[26%] h-[22rem] w-[22rem] rounded-full bg-amber-200/50 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),transparent_26%),linear-gradient(90deg,rgba(15,118,110,0.04),transparent_30%,rgba(14,165,233,0.04)_70%,transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {children}
      </div>
    </main>
  );
}
