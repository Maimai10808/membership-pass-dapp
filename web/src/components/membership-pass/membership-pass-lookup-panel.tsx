import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

type MembershipPassLookupPanelProps = {
  lookupAddress: string;
  onLookupAddressChange: (value: string) => void;
  lookupAddressLabel: string;
  lookupResultLabel: string;
  lookupError: string | null;
};

export function MembershipPassLookupPanel({
  lookupAddress,
  onLookupAddressChange,
  lookupAddressLabel,
  lookupResultLabel,
  lookupError,
}: MembershipPassLookupPanelProps) {
  return (
    <Card className="border-slate-200/80 bg-white/82 text-slate-900 shadow-[0_18px_48px_rgba(148,163,184,0.16)]">
      <CardHeader>
        <CardTitle className="text-xl font-black tracking-tight">
          Address Lookup
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm leading-7 text-slate-600">
            Check whether any address currently has membership access.
          </p>
          <Input
            value={lookupAddress}
            onChange={(e) => onLookupAddressChange(e.target.value)}
            placeholder="Enter address to check"
            className="h-11 rounded-2xl border-slate-200 bg-slate-50/90 px-4 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4 text-sm">
          <p>
            <span className="text-slate-500">Lookup address:</span>{" "}
            <span className="font-medium text-slate-900">
              {lookupAddressLabel}
            </span>
          </p>
          <p className="mt-2">
            <span className="text-slate-500">Status:</span>{" "}
            <span className="font-medium text-slate-900">{lookupResultLabel}</span>
          </p>
          <p className="mt-2">
            <span className="text-slate-500">Error:</span>{" "}
            <span className="font-medium text-slate-900">
              {lookupError ?? "None"}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
