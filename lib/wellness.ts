export type WellnessService = {
  slug: "reiki-sessions" | "reiki-classes" | "massage" | "healingtouch";
  title: string;
  summary: string;
  details: string[];
  pricing: Array<{ label: string; price: string }>;
  ctaLabel?: string;
  ctaHref?: string;
};

export const wellnessServices: WellnessService[] = [
  {
    slug: "reiki-sessions",
    title: "Reiki Sessions",
    summary: "Experience healing energy in 45-60 minute sessions.",
    details: [
      "Each session is designed to calm your nervous system and support energetic alignment.",
      "Sessions are available online or in person, based on your needs and location.",
    ],
    pricing: [
      { label: "Session range", price: "$60 - $120" },
    ],
  },
  {
    slug: "reiki-classes",
    title: "Reiki Classes",
    summary: "Learn Reiki with guided support from Baba Virtuehearts.",
    details: [
      "You can enroll in Reiki Level 1, Level 2, or Master level training.",
      "Choose a full pathway package to complete all three levels with savings.",
    ],
    pricing: [
      { label: "Level 1", price: "$100" },
      { label: "Level 2", price: "$250" },
      { label: "Master Level", price: "$250" },
      { label: "All 3 Levels Package", price: "$375" },
    ],
    ctaLabel: "Enroll Now",
    ctaHref: "/register",
  },
  {
    slug: "massage",
    title: "Massage Therapy",
    summary: "Restore body and mind with therapeutic massage options.",
    details: [
      "Techniques include Swedish and deep tissue sessions tailored to your comfort.",
      "Great for tension release, circulation support, and post-stress recovery.",
    ],
    pricing: [
      { label: "Single session", price: "$80 / hour" },
      { label: "Package", price: "5 sessions for $350" },
    ],
  },
  {
    slug: "healingtouch",
    title: "Healing Touch",
    summary: "Healing Touch Services that heal your Aura and Energy flow, perfect for anxiety and stress.",
    details: [
      "A therapeutic approach that uses touch to influence the energy system.",
      "Supports physical, emotional, mental, and spiritual health and healing.",
      "Sessions are focused on clearing, aligning, and balancing the energy field.",
    ],
    pricing: [
      { label: "Standard session", price: "$90" },
    ],
  },
];

export const getWellnessServiceBySlug = (slug: string) =>
  wellnessServices.find((service) => service.slug === slug);
