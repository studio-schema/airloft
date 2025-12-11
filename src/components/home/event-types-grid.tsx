"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EVENT_TYPES, type EventType } from "@/lib/constants";
import {
  Waves,
  Music,
  Headphones,
  Sun,
  Heart,
  Disc,
  Palette,
  Building,
  Lock,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Waves,
  Music,
  Headphones,
  Sun,
  Heart,
  Disc,
  Palette,
  Building,
  Lock,
};

const gradientMap: Record<string, string> = {
  purple: "from-purple-500/20 to-purple-900/20",
  pink: "from-pink-500/20 to-pink-900/20",
  cyan: "from-cyan-500/20 to-cyan-900/20",
  amber: "from-amber-500/20 to-amber-900/20",
  rose: "from-rose-500/20 to-rose-900/20",
  indigo: "from-indigo-500/20 to-indigo-900/20",
  teal: "from-teal-500/20 to-teal-900/20",
  violet: "from-violet-500/20 to-violet-900/20",
  slate: "from-slate-500/20 to-slate-900/20",
};

const colorTextMap: Record<string, string> = {
  purple: "text-purple-400",
  pink: "text-pink-400",
  cyan: "text-cyan-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  indigo: "text-indigo-400",
  teal: "text-teal-400",
  violet: "text-violet-400",
  slate: "text-slate-400",
};

export function EventTypesGrid() {
  const eventTypes = Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Experiences for <span className="text-gradient">Every Vibe</span>
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            From high-energy parties to peaceful wellness sessions, our balloon venue
            transforms to match your perfect experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map(([key, type]) => {
            const Icon = iconMap[type.icon as keyof typeof iconMap];
            const gradient = gradientMap[type.color] || gradientMap.purple;
            const textColor = colorTextMap[type.color] || colorTextMap.purple;

            return (
              <Link key={key} href={`/events?type=${key}`}>
                <Card
                  hover
                  className={`group p-6 h-full bg-gradient-to-br ${gradient} border-glass-border`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-xl bg-background/50 ${textColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight
                      className={`h-5 w-5 ${textColor} opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0`}
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {type.label}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-secondary line-clamp-2">
                    {type.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
