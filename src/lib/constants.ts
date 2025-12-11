export const EVENT_TYPES = {
  sound_bath: {
    label: "Sound Bath",
    icon: "Waves",
    color: "purple",
    description: "Immersive sound healing experiences with crystal bowls and gongs",
  },
  dj_party: {
    label: "DJ Party",
    icon: "Music",
    color: "pink",
    description: "High-energy dance nights with world-class DJs",
  },
  silent_disco: {
    label: "Silent Disco",
    icon: "Headphones",
    color: "cyan",
    description: "Dance to your own beat with wireless headphones",
  },
  yoga_seminar: {
    label: "Yoga",
    icon: "Sun",
    color: "amber",
    description: "Rejuvenating yoga sessions in a unique setting",
  },
  meditation_seminar: {
    label: "Meditation",
    icon: "Heart",
    color: "indigo",
    description: "Guided meditation and mindfulness practices",
  },
  album_release: {
    label: "Album Release",
    icon: "Disc",
    color: "rose",
    description: "Exclusive album launch parties and listening sessions",
  },
  art_gallery: {
    label: "Art Gallery",
    icon: "Palette",
    color: "teal",
    description: "Immersive art exhibitions and installations",
  },
  corporate_event: {
    label: "Corporate",
    icon: "Building",
    color: "slate",
    description: "Unique corporate events and team experiences",
  },
  private_event: {
    label: "Private Event",
    icon: "Lock",
    color: "violet",
    description: "Exclusive private bookings for special occasions",
  },
} as const;

export type EventType = keyof typeof EVENT_TYPES;

export const BOOKING_STATUS = {
  pending: { label: "Pending", color: "yellow" },
  confirmed: { label: "Confirmed", color: "blue" },
  invoiced: { label: "Invoiced", color: "purple" },
  paid: { label: "Paid", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
  completed: { label: "Completed", color: "gray" },
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUS;

export const VENUE_CAPACITY = 250;

export const SITE_CONFIG = {
  name: "Airloft",
  tagline: "Experience Events Inside a Giant Balloon",
  description:
    "Airloft transforms a massive hot air balloon into an extraordinary 250-person event venue. From sound baths to DJ parties, experience events like never before.",
  url: "https://airloft.events",
  socialLinks: {
    instagram: "https://instagram.com/airloft",
    twitter: "https://twitter.com/airloft",
    tiktok: "https://tiktok.com/@airloft",
  },
};
