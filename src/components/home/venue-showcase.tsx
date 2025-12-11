"use client";

import { Card } from "@/components/ui/card";
import { Check, Sparkles, Volume2, Users, Wind } from "lucide-react";

const features = [
  {
    icon: Wind,
    title: "Cold Air Inflation",
    description:
      "Giant fans fill the balloon with cold air, creating a safe, climate-controlled environment.",
  },
  {
    icon: Volume2,
    title: "Perfect Acoustics",
    description:
      "The fabric dome creates incredible acoustics for music and sound experiences.",
  },
  {
    icon: Users,
    title: "250 Capacity",
    description:
      "Spacious enough for large gatherings while maintaining an intimate atmosphere.",
  },
  {
    icon: Sparkles,
    title: "Immersive Visuals",
    description:
      "The curved fabric walls serve as a 360° projection canvas for stunning visuals.",
  },
];

const amenities = [
  "Climate controlled",
  "Professional sound system",
  "LED lighting rig",
  "360° projection mapping",
  "Bar service available",
  "Meditation props",
  "Yoga mats provided",
  "ADA accessible",
];

export function VenueShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            The <span className="text-gradient">Airloft</span> Experience
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            A hot air balloon laid on its side becomes a magical dome venue unlike
            anything you&apos;ve experienced before.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Visual */}
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-orange-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎈</div>
                <p className="text-foreground-secondary">
                  Venue visualization coming soon
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-purple-500/20 blur-2xl" />
            <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-pink-500/20 blur-2xl" />
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              How the Magic Happens
            </h3>
            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.title} className="p-4 flex gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary h-fit">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <Card className="p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Venue Amenities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-foreground-secondary">{amenity}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
