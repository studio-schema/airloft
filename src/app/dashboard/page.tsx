"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { BOOKING_STATUS, type BookingStatus } from "@/lib/constants";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  Ticket,
  ArrowRight,
} from "lucide-react";

const statusVariants: Record<BookingStatus, "purple" | "cyan" | "amber" | "teal" | "rose" | "slate"> = {
  pending: "amber",
  confirmed: "cyan",
  invoiced: "purple",
  paid: "teal",
  cancelled: "rose",
  completed: "slate",
};

export default function DashboardPage() {
  const currentUser = useQuery(api.users.getCurrent);
  const bookings = useQuery(
    api.bookings.listByUser,
    currentUser ? { userId: currentUser._id } : "skip"
  );

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              My <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-2 text-foreground-secondary">
              Manage your bookings and view your upcoming events.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Ticket className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings?.length ?? 0}
                  </p>
                  <p className="text-sm text-foreground-muted">Total Bookings</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings?.filter(
                      (b) => b.event && b.event.date > Date.now() && b.status !== "cancelled"
                    ).length ?? 0}
                  </p>
                  <p className="text-sm text-foreground-muted">Upcoming Events</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings?.filter((b) => b.status === "invoiced").length ?? 0}
                  </p>
                  <p className="text-sm text-foreground-muted">Pending Payment</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Bookings List */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Your Bookings
            </h2>

            {bookings === undefined ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-background-secondary rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking._id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {booking.event?.title ?? "Event"}
                          </h3>
                          <Badge
                            variant={statusVariants[booking.status as BookingStatus]}
                            size="sm"
                          >
                            {BOOKING_STATUS[booking.status as BookingStatus]?.label}
                          </Badge>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-foreground-muted">
                          {booking.event && (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(booking.event.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatTime(booking.event.startTime)}
                              </div>
                            </>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {booking.numberOfGuests} guest(s)
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gradient">
                            {formatPrice(booking.totalAmount)}
                          </p>
                          {booking.status === "invoiced" && booking.stripeInvoiceUrl && (
                            <a
                              href={booking.stripeInvoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Pay Invoice
                            </a>
                          )}
                        </div>
                        {booking.event && (
                          <Link href={`/events/${booking.event.slug}`}>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-5xl mb-4">🎈</div>
                <h3 className="text-xl font-semibold text-foreground">
                  No Bookings Yet
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  Browse our events and book your first experience!
                </p>
                <Link href="/events" className="mt-6 inline-block">
                  <Button>
                    Explore Events
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
