"use client";

import { Badge } from "@/components/ui/badge";
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

interface EventTypeBadgeProps {
  eventType: EventType;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export function EventTypeBadge({
  eventType,
  size = "md",
  showIcon = true,
}: EventTypeBadgeProps) {
  const typeInfo = EVENT_TYPES[eventType];
  const Icon = iconMap[typeInfo.icon as keyof typeof iconMap];

  return (
    <Badge variant={colorVariants[typeInfo.color] || "purple"} size={size}>
      {showIcon && Icon && <Icon className="h-3.5 w-3.5 mr-1" />}
      {typeInfo.label}
    </Badge>
  );
}
