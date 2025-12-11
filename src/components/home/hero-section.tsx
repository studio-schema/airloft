"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-background to-pink-900/20" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-glass-border mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-foreground-secondary">
            Now booking for 2025
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-foreground">Experience Events</span>
          <br />
          <span className="text-gradient">Inside a Giant Balloon</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
          Airloft transforms a massive hot air balloon into an extraordinary 250-person
          venue. From sound baths to DJ parties, experience events like never before.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/events">
            <Button size="lg" className="group">
              Explore Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg" className="group">
              <Play className="mr-2 h-4 w-4" />
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-gradient">250</div>
            <div className="text-sm text-foreground-muted mt-1">Capacity</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">50+</div>
            <div className="text-sm text-foreground-muted mt-1">Events Hosted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">9</div>
            <div className="text-sm text-foreground-muted mt-1">Event Types</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-foreground-muted">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground-muted flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-foreground-muted animate-pulse" />
        </div>
      </div>
    </section>
  );
}
