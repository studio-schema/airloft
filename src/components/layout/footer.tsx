import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  events: [
    { name: "Sound Baths", href: "/events?type=sound_bath" },
    { name: "DJ Parties", href: "/events?type=dj_party" },
    { name: "Silent Discos", href: "/events?type=silent_disco" },
    { name: "Yoga", href: "/events?type=yoga_seminar" },
    { name: "All Events", href: "/events" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Private Events", href: "/book" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/airloft", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com/airloft", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com/@airloft", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">Airloft</span>
            </Link>
            <p className="mt-4 text-foreground-secondary text-sm">
              Experience events like never before inside a giant hot air balloon venue.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Events
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.events.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="mt-4 text-foreground-secondary text-sm">
              Get notified about new events and exclusive experiences.
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-background-elevated border border-glass-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground-muted text-sm">
            &copy; {new Date().getFullYear()} Airloft. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground-muted hover:text-foreground text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
