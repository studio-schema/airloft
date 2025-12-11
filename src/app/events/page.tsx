"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { EVENT_TYPES, type EventType } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") as EventType | null;
  const [selectedType, setSelectedType] = useState<EventType | null>(initialType);

  const events = useQuery(api.events.list, {
    eventType: selectedType || undefined,
    status: "published",
  });

  const eventTypes = Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][];

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground">
              Upcoming <span className="text-gradient">Events</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary">
              Discover extraordinary experiences inside our balloon venue.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All Events
            </Button>
            {eventTypes.map(([key, type]) => (
              <Button
                key={key}
                variant={selectedType === key ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(key)}
              >
                {type.label}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          {events === undefined ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[400px] rounded-xl bg-background-secondary animate-pulse"
                />
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            // Empty state
            <div className="text-center py-24 glass rounded-xl">
              <div className="text-6xl mb-4">🎈</div>
              <h3 className="text-xl font-semibold text-foreground">
                No Events Found
              </h3>
              <p className="mt-2 text-foreground-secondary max-w-md mx-auto">
                {selectedType
                  ? `There are no ${EVENT_TYPES[selectedType].label.toLowerCase()} events scheduled right now.`
                  : "There are no events scheduled right now. Check back soon!"}
              </p>
              {selectedType && (
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => setSelectedType(null)}
                >
                  View All Events
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
