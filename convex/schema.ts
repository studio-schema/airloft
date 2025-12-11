import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const eventTypes = v.union(
  v.literal("sound_bath"),
  v.literal("dj_party"),
  v.literal("silent_disco"),
  v.literal("yoga_seminar"),
  v.literal("meditation_seminar"),
  v.literal("album_release"),
  v.literal("art_gallery"),
  v.literal("corporate_event"),
  v.literal("private_event")
);

const bookingStatus = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("invoiced"),
  v.literal("paid"),
  v.literal("cancelled"),
  v.literal("completed")
);

const eventStatus = v.union(
  v.literal("draft"),
  v.literal("published"),
  v.literal("sold_out"),
  v.literal("cancelled"),
  v.literal("completed")
);

export default defineSchema({
  // Users - synced from Clerk
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // Events
  events: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    eventType: eventTypes,
    tags: v.array(v.string()),
    date: v.number(),
    startTime: v.string(),
    endTime: v.string(),
    capacity: v.number(),
    currentAttendees: v.number(),
    basePrice: v.number(),
    heroImageUrl: v.optional(v.string()),
    thumbnailImageUrl: v.optional(v.string()),
    galleryImageUrls: v.array(v.string()),
    artists: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.optional(v.string()),
          imageUrl: v.optional(v.string()),
        })
      )
    ),
    venueSetup: v.optional(v.string()),
    amenities: v.array(v.string()),
    status: eventStatus,
    isFeatured: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_date", ["date"])
    .index("by_status", ["status"])
    .index("by_event_type", ["eventType"])
    .index("by_featured", ["isFeatured", "date"])
    .index("by_status_date", ["status", "date"]),

  // Bookings
  bookings: defineTable({
    userId: v.id("users"),
    eventId: v.id("events"),
    numberOfGuests: v.number(),
    totalAmount: v.number(),
    contactName: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    specialRequests: v.optional(v.string()),
    dietaryRestrictions: v.optional(v.string()),
    companyName: v.optional(v.string()),
    eventPurpose: v.optional(v.string()),
    status: bookingStatus,
    stripeInvoiceId: v.optional(v.string()),
    stripeInvoiceUrl: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    invoiceSentAt: v.optional(v.number()),
    paidAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    cancelledAt: v.optional(v.number()),
    cancellationReason: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_event", ["eventId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"])
    .index("by_stripe_invoice", ["stripeInvoiceId"]),

  // Gallery Images
  galleryImages: defineTable({
    imageUrl: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    alt: v.string(),
    eventId: v.optional(v.id("events")),
    eventType: v.optional(eventTypes),
    tags: v.array(v.string()),
    isFeatured: v.boolean(),
    sortOrder: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    uploadedAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_event_type", ["eventType"])
    .index("by_featured", ["isFeatured", "sortOrder"]),

  // Inquiries
  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    companyName: v.optional(v.string()),
    eventType: v.optional(eventTypes),
    preferredDate: v.optional(v.number()),
    estimatedGuests: v.optional(v.number()),
    message: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("converted"),
      v.literal("closed")
    ),
    adminNotes: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
    respondedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),
});
