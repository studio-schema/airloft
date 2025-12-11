import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    eventType: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let images;

    if (args.featured) {
      images = await ctx.db
        .query("galleryImages")
        .withIndex("by_featured", (q) => q.eq("isFeatured", true))
        .order("asc")
        .collect();
    } else if (args.eventType) {
      images = await ctx.db
        .query("galleryImages")
        .withIndex("by_event_type", (q) =>
          q.eq(
            "eventType",
            args.eventType as
              | "sound_bath"
              | "dj_party"
              | "silent_disco"
              | "yoga_seminar"
              | "meditation_seminar"
              | "album_release"
              | "art_gallery"
              | "corporate_event"
              | "private_event"
          )
        )
        .order("asc")
        .collect();
    } else {
      images = await ctx.db
        .query("galleryImages")
        .order("desc")
        .collect();
    }

    if (args.limit) {
      images = images.slice(0, args.limit);
    }

    return images;
  },
});

export const getByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("galleryImages")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    imageUrl: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    alt: v.string(),
    eventId: v.optional(v.id("events")),
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
    isFeatured: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Get the next sort order if not provided
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const images = await ctx.db.query("galleryImages").collect();
      sortOrder = images.length;
    }

    return await ctx.db.insert("galleryImages", {
      imageUrl: args.imageUrl,
      title: args.title,
      description: args.description,
      alt: args.alt,
      eventId: args.eventId,
      eventType: args.eventType,
      tags: args.tags ?? [],
      isFeatured: args.isFeatured ?? false,
      sortOrder,
      width: args.width,
      height: args.height,
      uploadedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("galleryImages"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    alt: v.optional(v.string()),
    eventId: v.optional(v.id("events")),
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
    isFeatured: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("galleryImages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
