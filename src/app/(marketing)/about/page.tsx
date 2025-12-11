import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Wind,
  Volume2,
  Users,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";

const timeline = [
  {
    year: "2021",
    title: "The Spark",
    description:
      "The idea was born at a music festival when our founder wondered: what if we could create an intimate venue experience at scale?",
  },
  {
    year: "2022",
    title: "First Inflation",
    description:
      "After months of engineering and safety testing, we successfully inflated our first balloon venue, hosting a private sound bath for 50 guests.",
  },
  {
    year: "2023",
    title: "Festival Debut",
    description:
      "Airloft made its public debut at Outside Lands, hosting 8 sold-out events over the festival weekend.",
  },
  {
    year: "2024",
    title: "Expanding Horizons",
    description:
      "We grew to host over 50 events, from silent discos to corporate gatherings, serving 10,000+ guests.",
  },
  {
    year: "2025",
    title: "The Future",
    description:
      "Now booking for our most ambitious year yet, with plans for multiple venues and international events.",
  },
];

const stats = [
  { value: "50+", label: "Events Hosted" },
  { value: "10K+", label: "Happy Guests" },
  { value: "250", label: "Max Capacity" },
  { value: "9", label: "Event Types" },
];

const howItWorks = [
  {
    step: 1,
    icon: Wind,
    title: "Cold Air Inflation",
    description:
      "Industrial fans fill the balloon envelope with ambient air, creating a safe, fully breathable environment. No hot air means no fire risk and consistent climate control.",
  },
  {
    step: 2,
    icon: Volume2,
    title: "Acoustic Engineering",
    description:
      "The curved fabric walls create incredible natural acoustics. We enhance this with a professional sound system positioned for 360° audio immersion.",
  },
  {
    step: 3,
    icon: Sparkles,
    title: "Visual Canvas",
    description:
      "The balloon's interior fabric serves as a massive projection surface. We map visuals across the curved walls for a truly immersive experience.",
  },
  {
    step: 4,
    icon: Users,
    title: "Intimate Scale",
    description:
      "At 250 capacity, we've found the sweet spot between intimate gathering and significant event. Every guest feels connected to the experience.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              The Story Behind
              <br />
              <span className="text-gradient">Airloft</span>
            </h1>
            <p className="mt-6 text-xl text-foreground-secondary max-w-2xl mx-auto">
              We transform a massive hot air balloon into the world&apos;s most unique
              event venue, creating unforgettable experiences for up to 250 guests.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="mt-2 text-foreground-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                How the <span className="text-gradient">Magic</span> Happens
              </h2>
              <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
                The science and artistry behind our unique balloon venue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {howItWorks.map((item) => (
                <Card key={item.step} className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-primary font-medium">
                        Step {item.step}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mt-1">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-foreground-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our <span className="text-gradient">Journey</span>
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-glass-border md:left-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transform -translate-x-1/2 md:left-1/2" />

                    {/* Content */}
                    <div
                      className={`ml-16 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                      }`}
                    >
                      <Card className="p-6 inline-block text-left">
                        <div className="text-2xl font-bold text-gradient">
                          {item.year}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mt-2">
                          {item.title}
                        </h3>
                        <p className="text-foreground-secondary mt-2">
                          {item.description}
                        </p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 text-primary mx-auto mb-8 opacity-50" />
            <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed">
              &ldquo;Airloft created an experience unlike anything we&apos;ve seen in 15
              years of festival production. The balloon venue was the talk of the
              entire event.&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="font-semibold text-foreground">Sarah Chen</div>
              <div className="text-foreground-muted">
                Creative Director, Outside Lands
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Experience <span className="text-gradient">Airloft</span>?
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              Whether you want to attend a public event or create your own private
              experience, we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events">
                <Button size="lg" className="group">
                  Browse Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
