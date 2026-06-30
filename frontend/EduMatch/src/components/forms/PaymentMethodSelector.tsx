import { CreditCard, Landmark, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "card" | "wallet" | "cash";

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
};

const methods = [
  {
    id: "card",
    title: "Credit / Debit Card",
    subtitle: "Simulated card payment",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "Platform Wallet",
    subtitle: "Balance: 1,250 EGP",
    icon: WalletCards,
  },
  {
    id: "cash",
    title: "Cash Simulation",
    subtitle: "Local development only",
    icon: Landmark,
    badge: "Dev Only",
  },
] satisfies Array<{
  id: PaymentMethod;
  title: string;
  subtitle: string;
  icon: typeof CreditCard;
  badge?: string;
}>;

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Payment Method</h2>
      <div className="mt-md space-y-sm">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = selectedMethod === method.id;

          return (
            <button
              className={cn(
                "flex w-full items-center gap-md rounded-lg border p-md text-left transition",
                selected
                  ? "border-primary/70 bg-primary/15 shadow-[0_0_26px_rgba(192,193,255,0.08)]"
                  : "border-outline-variant bg-surface-container-low hover:bg-surface-container-high",
              )}
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              type="button"
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-primary bg-primary" : "border-outline",
                )}
              >
                {selected ? <span className="size-2 rounded-full bg-on-primary" /> : null}
              </span>
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-md",
                  selected ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-sm text-body-sm font-medium text-on-surface">
                  {method.title}
                  {method.badge ? (
                    <span className="rounded-full bg-tertiary/15 px-sm py-xs text-label-md uppercase text-tertiary ring-1 ring-tertiary/25">
                      {method.badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-xs block text-body-sm text-on-surface-variant">
                  {method.subtitle}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
