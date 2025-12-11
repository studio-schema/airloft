import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Create the booking
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    // Update event attendee count
    const event = await ctx.db.get(args.eventId);
    if (event) {
      await ctx.db.patch(args.eventId, {
        currentAttendees: event.currentAttendees + args.numberOfGuests,
        updatedAt: now,
      });
    }

    return bookingId;
  },
});

export const getById = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) return null;

    const event = await ctx.db.get(booking.eventId);
    const user = await ctx.db.get(booking.userId);

    return {
      ...booking,
      event,
      user,
    };
  },
});

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // Fetch associated events
    const bookingsWithEvents = await Promise.all(
      bookings.map(async (booking) => {
        const event = await ctx.db.get(booking.eventId);
        return { ...booking, event };
      })
    );

    return bookingsWithEvents;
  },
});

export const listByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .order("desc")
      .collect();

    // Fetch associated users
    const bookingsWithUsers = await Promise.all(
      bookings.map(async (booking) => {
        const user = await ctx.db.get(booking.userId);
        return { ...booking, user };
      })
    );

    return bookingsWithUsers;
  },
});

export const listAll = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let bookings;

    if (args.status) {
      bookings = await ctx.db
        .query("bookings")
        .withIndex("by_status", (q) =>
          q.eq(
            "status",
            args.status as
              | "pending"
              | "confirmed"
              | "invoiced"
              | "paid"
              | "cancelled"
              | "completed"
          )
        )
        .order("desc")
        .collect();
    } else {
      bookings = await ctx.db.query("bookings").order("desc").collect();
    }

    if (args.limit) {
      bookings = bookings.slice(0, args.limit);
    }

    // Fetch associated events and users
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const event = await ctx.db.get(booking.eventId);
        const user = await ctx.db.get(booking.userId);
        return { ...booking, event, user };
      })
    );

    return bookingsWithDetails;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("invoiced"),
      v.literal("paid"),
      v.literal("cancelled"),
      v.literal("completed")
    ),
    stripeInvoiceId: v.optional(v.string()),
    stripeInvoiceUrl: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, status, ...stripeData } = args;
    const now = Date.now();

    const updates: Record<string, unknown> = {
      status,
      updatedAt: now,
      ...stripeData,
    };

    if (status === "invoiced") {
      updates.invoiceSentAt = now;
    } else if (status === "paid") {
      updates.paidAt = now;
    } else if (status === "cancelled") {
      updates.cancelledAt = now;

      // Return tickets to availability
      const booking = await ctx.db.get(id);
      if (booking) {
        const event = await ctx.db.get(booking.eventId);
        if (event) {
          await ctx.db.patch(booking.eventId, {
            currentAttendees: Math.max(
              0,
              event.currentAttendees - booking.numberOfGuests
            ),
            updatedAt: now,
          });
        }
      }
    }

    await ctx.db.patch(id, updates);
  },
});

export const cancel = mutation({
  args: {
    id: v.id("bookings"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Update booking status
    await ctx.db.patch(args.id, {
      status: "cancelled",
      cancelledAt: now,
      cancellationReason: args.reason,
      updatedAt: now,
    });

    // Return tickets to availability
    const event = await ctx.db.get(booking.eventId);
    if (event) {
      await ctx.db.patch(booking.eventId, {
        currentAttendees: Math.max(
          0,
          event.currentAttendees - booking.numberOfGuests
        ),
        updatedAt: now,
      });
    }
  },
});
