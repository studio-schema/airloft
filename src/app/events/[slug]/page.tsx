"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventTypeBadge } from "@/components/events/event-type-badge";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Share2,
  Heart,
  ArrowLeft,
  Check,
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = useQuery(api.events.getBySlug, { slug });

  if (event === undefined) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-[400px] bg-background-secondary rounded-2xl mb-8" />
              <div className="h-8 w-1/3 bg-background-secondary rounded mb-4" />
              <div className="h-4 w-2/3 bg-background-secondary rounded" />
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
            <div className="text-6xl mb-4">🎈</div>
            <h1 className="text-2xl font-bold text-foreground">Event Not Found</h1>
            <p className="mt-2 text-foreground-secondary">
              This event doesn&apos;t exist or has been removed.
            </p>
            <Link href="/events" className="mt-6 inline-block">
              <Button>Browse All Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const spotsLeft = event.capacity - event.currentAttendees;
  const isSoldOut = spotsLeft <= 0;

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] bg-background-secondary">
          {event.heroImageUrl ? (
            <Image
              src={event.heroImageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-orange-900/50 flex items-center justify-center">
              <span className="text-8xl opacity-30">🎈</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-24 left-4 sm:left-8">
            <Link href="/events">
              <Button variant="glass" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Section */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <EventTypeBadge eventType={event.eventType} />
                    <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
                      {event.title}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">{spotsLeft} spots left</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm">Airloft Venue</span>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  About This Event
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground-secondary whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              </Card>

              {/* Artists */}
              {event.artists && event.artists.length > 0 && (
                <Card className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Featured Artists
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {event.artists.map((artist, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background-elevated"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {artist.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {artist.name}
                          </p>
                          {artist.role && (
                            <p className="text-sm text-foreground-muted">
                              {artist.role}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Amenities */}
              {event.amenities && event.amenities.length > 0 && (
                <Card className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    What&apos;s Included
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {event.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-foreground-secondary">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gradient">
                      {formatPrice(event.basePrice)}
                    </div>
                    <p className="text-foreground-muted">per person</p>
                  </div>

                  {isSoldOut ? (
                    <Button disabled className="w-full" size="lg">
                      Sold Out
                    </Button>
                  ) : (
                    <Link href={`/book?event=${event.slug}`}>
                      <Button className="w-full" size="lg">
                        Book Now
                      </Button>
                    </Link>
                  )}

                  <div className="mt-6 pt-6 border-t border-glass-border space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Availability</span>
                      <span className="text-foreground">
                        {spotsLeft} of {event.capacity} spots
                      </span>
                    </div>
                    <div className="w-full bg-background-elevated rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{
                          width: `${((event.capacity - spotsLeft) / event.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-foreground-muted text-center">
                    Free cancellation up to 48 hours before the event
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
