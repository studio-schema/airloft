"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedEvents() {
  const events = useQuery(api.events.getFeatured, { limit: 3 });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured <span className="text-gradient">Events</span>
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              Don&apos;t miss out on these incredible upcoming experiences.
            </p>
          </div>
          <Link href="/events">
            <Button variant="ghost" className="group">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        {events === undefined ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-xl bg-background-elevated animate-pulse"
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
          <div className="text-center py-16 glass rounded-xl">
            <div className="text-4xl mb-4">🎈</div>
            <h3 className="text-xl font-semibold text-foreground">
              No Featured Events Yet
            </h3>
            <p className="mt-2 text-foreground-secondary">
              Check back soon for exciting upcoming events!
            </p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button variant="primary">Inquire About Events</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
