import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    companyName: v.optional(v.string()),
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
    preferredDate: v.optional(v.number()),
    estimatedGuests: v.optional(v.number()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    let userId;

    if (identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .unique();
      userId = user?._id;
    }

    return await ctx.db.insert("inquiries", {
      ...args,
      userId,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const list = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let inquiries;

    if (args.status) {
      inquiries = await ctx.db
        .query("inquiries")
        .withIndex("by_status", (q) =>
          q.eq(
            "status",
            args.status as "new" | "contacted" | "converted" | "closed"
          )
        )
        .order("desc")
        .collect();
    } else {
      inquiries = await ctx.db.query("inquiries").order("desc").collect();
    }

    if (args.limit) {
      inquiries = inquiries.slice(0, args.limit);
    }

    return inquiries;
  },
});

export const getById = query({
  args: { id: v.id("inquiries") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("converted"),
      v.literal("closed")
    ),
    adminNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, status, adminNotes } = args;
    const now = Date.now();

    const updates: Record<string, unknown> = {
      status,
      updatedAt: now,
    };

    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    if (status === "contacted") {
      updates.respondedAt = now;
    }

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("inquiries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
