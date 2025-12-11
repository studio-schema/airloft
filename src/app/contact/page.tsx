"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EVENT_TYPES, type EventType } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    eventType: "" as EventType | "",
    estimatedGuests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createInquiry = useMutation(api.inquiries.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        companyName: formData.companyName || undefined,
        eventType: formData.eventType || undefined,
        estimatedGuests: formData.estimatedGuests
          ? parseInt(formData.estimatedGuests)
          : undefined,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const eventTypes = Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][];

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Message Sent!
            </h1>
            <p className="mt-4 text-foreground-secondary">
              Thank you for reaching out. We&apos;ll get back to you within 24-48 hours
              to discuss your event.
            </p>
            <Button
              className="mt-8"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  companyName: "",
                  eventType: "",
                  estimatedGuests: "",
                  message: "",
                });
              }}
            >
              Send Another Message
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Ready to create an unforgettable experience? Let&apos;s talk about your
              event.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-foreground-secondary mt-1">
                      hello@airloft.events
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-foreground-secondary mt-1">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-foreground-secondary mt-1">
                      San Francisco Bay Area
                      <br />
                      Available for travel worldwide
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <h3 className="font-semibold text-foreground">
                  Response Time
                </h3>
                <p className="text-foreground-secondary mt-2 text-sm">
                  We typically respond within 24-48 hours. For urgent inquiries,
                  please call us directly.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                    <Input
                      label="Company (if applicable)"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-background-elevated border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select an event type</option>
                        {eventTypes.map(([key, type]) => (
                          <option key={key} value={key}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Estimated Guests"
                      name="estimatedGuests"
                      type="number"
                      min="1"
                      max="250"
                      value={formData.estimatedGuests}
                      onChange={handleChange}
                      placeholder="50-250"
                    />
                  </div>

                  <Textarea
                    label="Tell us about your event"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about your event, preferred dates, location, and any special requirements..."
                    required
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
