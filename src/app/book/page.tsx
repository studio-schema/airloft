"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
  CreditCard,
} from "lucide-react";

type Step = "details" | "contact" | "review";

export default function BookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const eventSlug = searchParams.get("event");

  const [step, setStep] = useState<Step>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    numberOfGuests: 1,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    specialRequests: "",
    companyName: "",
  });

  const event = useQuery(
    api.events.getBySlug,
    eventSlug ? { slug: eventSlug } : "skip"
  );

  const currentUser = useQuery(api.users.getCurrent);
  const createBooking = useMutation(api.bookings.create);

  // Pre-fill contact info from user
  useEffect(() => {
    if (user && userLoaded) {
      setFormData((prev) => ({
        ...prev,
        contactName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        contactEmail: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user, userLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfGuests" ? parseInt(value) || 1 : value,
    }));
  };

  const totalAmount = event ? event.basePrice * formData.numberOfGuests : 0;
  const spotsLeft = event ? event.capacity - event.currentAttendees : 0;

  const handleSubmit = async () => {
    if (!event || !currentUser) return;

    setIsSubmitting(true);

    try {
      // Create booking in Convex
      const bookingId = await createBooking({
        userId: currentUser._id,
        eventId: event._id,
        numberOfGuests: formData.numberOfGuests,
        totalAmount,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        specialRequests: formData.specialRequests || undefined,
        companyName: formData.companyName || undefined,
      });

      // Create Stripe invoice
      const response = await fetch("/api/stripe/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: formData.contactEmail,
          customerName: formData.contactName,
          amount: totalAmount,
          eventTitle: event.title,
          bookingId: bookingId,
          numberOfGuests: formData.numberOfGuests,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setInvoiceUrl(data.invoiceUrl);
        setBookingComplete(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!eventSlug) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-xl mx-auto px-4 text-center py-24">
            <div className="text-6xl mb-4">🎈</div>
            <h1 className="text-2xl font-bold text-foreground">
              No Event Selected
            </h1>
            <p className="mt-2 text-foreground-secondary">
              Please select an event to book.
            </p>
            <Button className="mt-6" onClick={() => router.push("/events")}>
              Browse Events
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (event === undefined) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-1/3 bg-background-secondary rounded" />
              <div className="h-64 bg-background-secondary rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (event === null) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-xl mx-auto px-4 text-center py-24">
            <div className="text-6xl mb-4">🎈</div>
            <h1 className="text-2xl font-bold text-foreground">
              Event Not Found
            </h1>
            <Button className="mt-6" onClick={() => router.push("/events")}>
              Browse Events
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (bookingComplete) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h1>
            <p className="mt-4 text-foreground-secondary">
              We&apos;ve sent an invoice to {formData.contactEmail}. Please complete
              payment to secure your spot.
            </p>

            <Card className="mt-8 p-6 text-left">
              <h3 className="font-semibold text-foreground">{event.title}</h3>
              <p className="text-sm text-foreground-muted mt-1">
                {formatDate(event.date)} at {formatTime(event.startTime)}
              </p>
              <div className="mt-4 pt-4 border-t border-glass-border">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Guests</span>
                  <span className="text-foreground">{formData.numberOfGuests}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-foreground-muted">Total</span>
                  <span className="text-gradient font-bold">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {invoiceUrl && (
                <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Invoice
                  </Button>
                </a>
              )}
              <Button
                variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {(["details", "contact", "review"] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === s
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : (["details", "contact", "review"].indexOf(step) > i)
                        ? "bg-green-500/20 text-green-400"
                        : "bg-background-elevated text-foreground-muted"
                    }`}
                  >
                    {["details", "contact", "review"].indexOf(step) > i ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="text-sm text-foreground-secondary capitalize hidden sm:inline">
                    {s}
                  </span>
                  {i < 2 && (
                    <div className="w-12 h-px bg-glass-border hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 sm:p-8">
                {step === "details" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Booking Details
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">
                        Number of Guests
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              numberOfGuests: Math.max(1, prev.numberOfGuests - 1),
                            }))
                          }
                          className="w-10 h-10 rounded-lg bg-background-elevated border border-glass-border text-foreground hover:bg-white/10 transition-colors"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          name="numberOfGuests"
                          value={formData.numberOfGuests}
                          onChange={handleChange}
                          min={1}
                          max={spotsLeft}
                          className="w-24 text-center"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              numberOfGuests: Math.min(
                                spotsLeft,
                                prev.numberOfGuests + 1
                              ),
                            }))
                          }
                          className="w-10 h-10 rounded-lg bg-background-elevated border border-glass-border text-foreground hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm text-foreground-muted mt-2">
                        {spotsLeft} spots available
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setStep("contact")}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}

                {step === "contact" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Contact Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Email"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Phone"
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Company (optional)"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>

                    <Textarea
                      label="Special Requests (optional)"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, accessibility needs, etc."
                    />

                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        onClick={() => setStep("details")}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setStep("review")}
                        disabled={
                          !formData.contactName ||
                          !formData.contactEmail ||
                          !formData.contactPhone
                        }
                      >
                        Review Booking
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === "review" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Review Your Booking
                    </h2>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-background-elevated">
                        <h3 className="font-medium text-foreground">
                          Event Details
                        </h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {event.title}
                        </p>
                        <p className="text-sm text-foreground-muted">
                          {formatDate(event.date)} at {formatTime(event.startTime)}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-elevated">
                        <h3 className="font-medium text-foreground">
                          Booking Details
                        </h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {formData.numberOfGuests} guest(s)
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-elevated">
                        <h3 className="font-medium text-foreground">
                          Contact Information
                        </h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {formData.contactName}
                        </p>
                        <p className="text-sm text-foreground-muted">
                          {formData.contactEmail}
                        </p>
                        <p className="text-sm text-foreground-muted">
                          {formData.contactPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        onClick={() => setStep("contact")}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Booking
                      </Button>
                    </div>

                    <p className="text-xs text-foreground-muted text-center">
                      An invoice will be sent to your email. Payment is due within 7 days.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Users className="h-4 w-4" />
                    <span>{formData.numberOfGuests} guest(s)</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-glass-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">
                      {formatPrice(event.basePrice)} × {formData.numberOfGuests}
                    </span>
                    <span className="text-foreground">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-gradient">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
