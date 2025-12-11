import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    eventType: v.optional(v.string()),
    status: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let events;

    if (args.featured) {
      events = await ctx.db
        .query("events")
        .withIndex("by_featured", (q) => q.eq("isFeatured", true))
        .order("asc")
        .collect();
    } else if (args.status) {
      events = await ctx.db
        .query("events")
        .withIndex("by_status", (q) => q.eq("status", args.status as "draft" | "published" | "sold_out" | "cancelled" | "completed"))
        .order("asc")
        .collect();
    } else {
      events = await ctx.db
        .query("events")
        .withIndex("by_date")
        .order("asc")
        .collect();
    }

    // Filter by event type if provided
    if (args.eventType) {
      events = events.filter((e) => e.eventType === args.eventType);
    }

    // Filter to only published by default
    if (!args.status) {
      events = events.filter((e) => e.status === "published");
    }

    // Apply limit
    if (args.limit) {
      events = events.slice(0, args.limit);
    }

    return events;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return event;
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUpcoming = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_status_date", (q) => q.eq("status", "published"))
      .order("asc")
      .collect();

    const upcoming = events.filter((e) => e.date >= now);
    return args.limit ? upcoming.slice(0, args.limit) : upcoming;
  },
});

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .order("asc")
      .collect();

    const published = events.filter((e) => e.status === "published");
    return args.limit ? published.slice(0, args.limit) : published;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    eventType: v.union(
      v.literal("sound_bath"),
      v.literal("dj_party"),
      v.literal("silent_disco"),
      v.literal("yoga_seminar"),
      v.literal("meditation_seminar"),
      v.literal("album_release"),
      v.literal("art_gallery"),
      v.literal("corporate_event"),
      v.literal("private_event")
    ),
    tags: v.array(v.string()),
    date: v.number(),
    startTime: v.string(),
    endTime: v.string(),
    capacity: v.number(),
    basePrice: v.number(),
    heroImageUrl: v.optional(v.string()),
    thumbnailImageUrl: v.optional(v.string()),
    galleryImageUrls: v.optional(v.array(v.string())),
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
    amenities: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("events", {
      ...args,
      galleryImageUrls: args.galleryImageUrls ?? [],
      amenities: args.amenities ?? [],
      isFeatured: args.isFeatured ?? false,
      currentAttendees: 0,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    eventType: v.optional(
      v.union(
        v.literal("sound_bath"),
        v.literal("dj_party"),
        v.literal("silent_disco"),
        v.literal("yoga_seminar"),
        v.literal("meditation_seminar"),
        v.literal("album_release"),
        v.literal("art_gallery"),
        v.literal("corporate_event"),
        v.literal("private_event")
      )
    ),
    tags: v.optional(v.array(v.string())),
    date: v.optional(v.number()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    capacity: v.optional(v.number()),
    basePrice: v.optional(v.number()),
    heroImageUrl: v.optional(v.string()),
    thumbnailImageUrl: v.optional(v.string()),
    galleryImageUrls: v.optional(v.array(v.string())),
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
    amenities: v.optional(v.array(v.string())),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("published"),
        v.literal("sold_out"),
        v.literal("cancelled"),
        v.literal("completed")
      )
    ),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
