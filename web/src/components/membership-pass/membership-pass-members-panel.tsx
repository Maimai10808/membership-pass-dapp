import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type MembershipPassMembersPanelProps = {
  members: readonly `0x${string}`[];
};

function formatAddress(address: `0x${string}`) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function MembershipPassMembersPanel({
  members,
}: MembershipPassMembersPanelProps) {
  return (
    <Card className="border-slate-200/80 bg-white/82 text-slate-900 shadow-[0_18px_48px_rgba(148,163,184,0.16)]">
      <CardHeader>
        <CardTitle className="text-xl font-black tracking-tight">
          Whitelisted Members
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!members.length ? (
          <p className="text-sm text-slate-500">No members yet.</p>
        ) : (
          <ul className="space-y-3">
            {members.map((member) => (
              <li
                key={member}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm"
              >
                <span className="font-semibold text-slate-900">
                  {formatAddress(member)}
                </span>
                <span className="text-slate-500">{member}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
