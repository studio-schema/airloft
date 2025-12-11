"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-orange-900/30" />
      <div className="absolute inset-0 bg-background/80" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Ready to Experience
          <br />
          <span className="text-gradient">Something Extraordinary?</span>
        </h2>
        <p className="mt-6 text-lg text-foreground-secondary max-w-2xl mx-auto">
          Whether you&apos;re planning a corporate event, private party, or want to attend
          one of our public experiences, we&apos;d love to hear from you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/events">
            <Button size="lg" className="group w-full sm:w-auto">
              Browse Public Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" />
              Book a Private Event
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-glass-border">
          <p className="text-sm text-foreground-muted mb-4">
            Trusted by brands like
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Coachella", "Outside Lands", "SXSW", "Art Basel", "Burning Man"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-foreground-secondary font-semibold"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
