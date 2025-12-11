"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { EVENT_TYPES, type EventType } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder images for when there's no data
const placeholderImages = [
  { id: "1", eventType: "dj_party", alt: "DJ Party inside balloon" },
  { id: "2", eventType: "sound_bath", alt: "Sound bath session" },
  { id: "3", eventType: "silent_disco", alt: "Silent disco event" },
  { id: "4", eventType: "yoga_seminar", alt: "Yoga in the balloon" },
  { id: "5", eventType: "meditation_seminar", alt: "Meditation circle" },
  { id: "6", eventType: "art_gallery", alt: "Art exhibition" },
  { id: "7", eventType: "album_release", alt: "Album release party" },
  { id: "8", eventType: "corporate_event", alt: "Corporate gathering" },
  { id: "9", eventType: "dj_party", alt: "Festival vibes" },
  { id: "10", eventType: "sound_bath", alt: "Crystal bowls" },
  { id: "11", eventType: "silent_disco", alt: "Dancing crowd" },
  { id: "12", eventType: "yoga_seminar", alt: "Morning yoga" },
];

export default function GalleryPage() {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = useQuery(api.gallery.list, {
    eventType: selectedType || undefined,
  });

  const eventTypes = Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][];

  // Use placeholder images if no data
  const images = galleryImages && galleryImages.length > 0
    ? galleryImages
    : placeholderImages.filter(img => !selectedType || img.eventType === selectedType);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
    }
  };
  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground">
              Event <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary">
              Explore moments captured from our extraordinary balloon experiences.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All Photos
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

          {/* Gallery Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((image, index) => {
              const heights = ["h-64", "h-80", "h-72", "h-96"];
              const randomHeight = heights[index % heights.length];

              return (
                <div
                  key={image.id || index}
                  className={cn(
                    "relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group",
                    randomHeight
                  )}
                  onClick={() => openLightbox(index)}
                >
                  {/* Placeholder gradient for now */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-orange-900/60 flex items-center justify-center">
                    <span className="text-4xl opacity-30">🎈</span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">{image.alt}</p>
                    {'eventType' in image && (
                      <p className="text-white/60 text-xs mt-1">
                        {EVENT_TYPES[image.eventType as EventType]?.label}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {images.length === 0 && (
            <div className="text-center py-24 glass rounded-xl">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-foreground">
                No Photos Yet
              </h3>
              <p className="mt-2 text-foreground-secondary">
                {selectedType
                  ? `No ${EVENT_TYPES[selectedType].label.toLowerCase()} photos available yet.`
                  : "Gallery photos coming soon!"}
              </p>
              {selectedType && (
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => setSelectedType(null)}
                >
                  View All Photos
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            {/* Image */}
            <div className="max-w-5xl max-h-[80vh] px-16">
              <div className="relative aspect-video bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-orange-900/60 rounded-xl flex items-center justify-center">
                <span className="text-8xl opacity-30">🎈</span>
              </div>
              <p className="text-center text-white/70 mt-4">
                {images[lightboxIndex]?.alt}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
