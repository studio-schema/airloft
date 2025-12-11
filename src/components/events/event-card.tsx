"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EVENT_TYPES, type EventType } from "@/lib/constants";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    eventType: EventType;
    date: number;
    startTime: string;
    endTime: string;
    capacity: number;
    currentAttendees: number;
    basePrice: number;
    thumbnailImageUrl?: string;
    heroImageUrl?: string;
  };
}

const colorVariants: Record<string, "purple" | "pink" | "cyan" | "amber" | "rose" | "indigo" | "teal" | "violet" | "slate"> = {
  purple: "purple",
  pink: "pink",
  cyan: "cyan",
  amber: "amber",
  rose: "rose",
  indigo: "indigo",
  teal: "teal",
  violet: "violet",
  slate: "slate",
};

export function EventCard({ event }: EventCardProps) {
  const eventTypeInfo = EVENT_TYPES[event.eventType];
  const spotsLeft = event.capacity - event.currentAttendees;
  const isSoldOut = spotsLeft <= 0;
  const isLowAvailability = spotsLeft > 0 && spotsLeft <= 20;

  return (
    <Card hover className="group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {event.thumbnailImageUrl || event.heroImageUrl ? (
          <Image
            src={event.thumbnailImageUrl || event.heroImageUrl || ""}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
            <span className="text-4xl opacity-50">🎈</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge variant={colorVariants[eventTypeInfo.color] || "purple"} size="sm">
            {eventTypeInfo.label}
          </Badge>

          {isSoldOut ? (
            <Badge variant="rose" size="sm">
              Sold Out
            </Badge>
          ) : isLowAvailability ? (
            <Badge variant="amber" size="sm">
              {spotsLeft} spots left
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-gradient transition-all">
          {event.title}
        </h3>

        <p className="mt-2 text-sm text-foreground-secondary line-clamp-2">
          {event.shortDescription}
        </p>

        {/* Event Details */}
        <div className="mt-4 space-y-2 text-sm text-foreground-muted">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{spotsLeft > 0 ? `${spotsLeft} spots available` : "Sold out"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-glass-border">
          <div>
            <span className="text-lg font-bold text-gradient">
              {formatPrice(event.basePrice)}
            </span>
            <span className="text-sm text-foreground-muted"> / person</span>
          </div>

          <Link href={`/events/${event.slug}`}>
            <Button variant="primary" size="sm" disabled={isSoldOut}>
              {isSoldOut ? "Sold Out" : "View Event"}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
