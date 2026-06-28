import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EscrowProtectionCard } from "@/components/cards/EscrowProtectionCard";
import { OrderSummaryCard } from "@/components/cards/OrderSummaryCard";
import { PaymentSuccessCard } from "@/components/cards/PaymentSuccessCard";
import { SessionPaymentDetailsCard } from "@/components/cards/SessionPaymentDetailsCard";
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from "@/components/forms/PaymentMethodSelector";
import type { PaymentStatus } from "@/components/ui/PaymentStatusBadge";

const paymentData = {
  sessionId: "1",
  instructorName: "Sarah Jenkins",
  instructorRole: "Instructor",
  subject: "React State Management",
  duration: "60 Minutes",
  dateTime: "Oct 24, 2026 - 14:00",
  sessionType: "Online",
  sessionMode: "Individual",
  sessionPrice: 500,
  platformFee: 50,
  totalAmount: 550,
  currency: "EGP",
  paymentStatus: "pending" as PaymentStatus,
};

export function PaymentConfirmationPage() {
  const { sessionId = paymentData.sessionId } = useParams();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(paymentData.paymentStatus);
  const [paidMethod, setPaidMethod] = useState<PaymentMethod | null>(null);

  const handlePayNow = () => {
    if (paymentStatus !== "held") {
      setPaymentStatus("held");
      setPaidMethod(selectedMethod);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] px-margin-mobile py-lg md:px-margin-desktop">
      <div className="mx-auto max-w-6xl space-y-lg">
        <Link
          className="inline-flex items-center gap-xs text-body-sm font-medium text-secondary transition hover:text-secondary/80"
          to={`/student/sessions/${sessionId}`}
        >
          <ArrowLeft className="size-4" />
          Back to Session Details
        </Link>

        <header>
          <p className="text-label-md uppercase text-secondary">
            Session #{sessionId}
          </p>
          <h1 className="mt-xs text-headline-lg text-on-surface">Complete Payment</h1>
          <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
            Review session details and select a payment method to confirm your booking.
          </p>
        </header>

        {paymentStatus === "held" ? <PaymentSuccessCard sessionPath={`/student/sessions/${sessionId}`} /> : null}

        <div className="grid gap-lg xl:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]">
          <main className="space-y-lg">
            <SessionPaymentDetailsCard details={paymentData} />
            <EscrowProtectionCard />
            <PaymentMethodSelector
              onSelectMethod={setSelectedMethod}
              selectedMethod={selectedMethod}
            />
            {paidMethod ? (
              <section className="rounded-lg border border-primary/30 bg-primary/10 p-md text-body-sm text-primary">
                Simulated payment completed with{" "}
                {paidMethod === "card"
                  ? "Credit / Debit Card"
                  : paidMethod === "wallet"
                    ? "Platform Wallet"
                    : "Cash Simulation"}
                .
              </section>
            ) : null}
          </main>

          <OrderSummaryCard
            currency={paymentData.currency}
            onPayNow={handlePayNow}
            paymentStatus={paymentStatus}
            platformFee={paymentData.platformFee}
            sessionPrice={paymentData.sessionPrice}
            totalAmount={paymentData.totalAmount}
          />
        </div>
      </div>
    </div>
  );
}
