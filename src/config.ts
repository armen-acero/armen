// Central place to edit brand + contact details.
export const SITE = {
  url: "https://armenandonian.com",
  // Brand / business name (shown in the logo, nav, footer and SEO).
  brand: "Armen Andonian",
  person: "Armen Andonian",
  role: "AI Automation & Search Visibility Consultant",
  tagline: "Helping businesses grow, scale & automate",
  email: "hello@armenandonian.com",
  // Internal anchor: every "Book" button scrolls to the on-page booking widget.
  bookingUrl: "#book",
  location: "Remote · Worldwide",

  // --- Booking (Cal.com inline embed) ---
  // Your Cal.com booking link in the form "username/event-slug".
  // Find it on the event type's "Copy link" button. Connect Google Calendar +
  // Stripe inside your Cal.com account; no keys live in this site.
  calLink: "armen-andonian-ms9g8r/30min",

  // --- Lead-magnet email capture (scorecard + prompt pack) ---
  // Paste your Kit (ConvertKit) form action URL here to start collecting emails.
  // In Kit: your form -> Embed -> HTML -> copy the URL inside <form action="...">.
  // It looks like "https://app.kit.com/forms/1234567/subscriptions".
  // Leave empty ("") to run in demo mode: the form works visually but stores nothing.
  emailFormAction: "",
} as const;
