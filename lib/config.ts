export const siteConfig = {
  name: "XeroStop",
  legalName: "XeroStop",
  description:
    "XeroStop is a Riyadh-based enterprise IT consultancy that designs, secures, and automates unified communications, datacenter, network, security, and AI infrastructure.",
  url: "https://xerostop.com",
  ogImage: "/og-image.png",
  tagline: "Engineering What's Next",
  locale: "en_SA",
  logo: {
    iconSmall: "/images/brand/xerostop-icon-68.webp",
    iconLarge: "/images/brand/xerostop-icon-248.webp",
  },
  links: {
    twitter: "https://twitter.com/xerostop",
    linkedin: "https://linkedin.com/company/xerostop",
  },
  twitterHandle: "@xerostop",
  contact: {
    email: "info@xerostop.com",
    phone: "+966597296841",
    phoneDisplay: "+966 59 729 6841",
    address: "8768 Nassr Ibn Sayaar, Al Wizarat District, Riyadh 12622, Saudi Arabia",
    hoursLabel: "Sun–Thu, 9:00 AM – 6:00 PM (AST)",
    postalAddress: {
      streetAddress: "8768 Nassr Ibn Sayaar, Al Wizarat District",
      addressLocality: "Riyadh",
      postalCode: "12622",
      addressCountry: "SA",
    },
    openingHours: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    offices: [
      {
        label: "Riyadh Office (Head Office)",
        address: "8768 Nassr Ibn Sayaar, Al Wizarat District, Riyadh 12622, Saudi Arabia",
        phone: "+966597296841",
        verified: true,
      },
      {
        label: "USA Office",
        // TODO: replace with the real USA office address before launch. Excluded from structured data until `verified` is true.
        address: "123 Technology Drive, Suite 500, San Francisco, CA 94102",
        phone: "+1 3252024054",
        verified: false,
      },
    ],
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    {
      slug: "unified-communications",
      title: "Unified Communications",
      description: "Voice, video, and collaboration solutions for enterprise connectivity",
    },
    {
      slug: "datacenter-solutions",
      title: "Datacenter Solutions",
      description: "Compute, storage, virtualization, and high availability infrastructure",
    },
    {
      slug: "network-solutions",
      title: "Network Solutions",
      description: "Enterprise networking, SD-WAN, and cloud connectivity",
    },
    {
      slug: "security-solutions",
      title: "Security Solutions",
      description: "Zero trust, identity management, and comprehensive security",
    },
    {
      slug: "software-solutions",
      title: "Software Solutions",
      description: "Custom applications, automation, and operational dashboards",
    },
    {
      slug: "ai-solutions",
      title: "AI Solutions",
      description: "AI agents, intelligent analytics, and AIOps monitoring",
    },
    {
      slug: "customer-experience",
      title: "Customer Experience",
      description: "AI-powered contact center and omnichannel engagement",
    },
    {
      slug: "managed-services",
      title: "Managed Services",
      description: "24/7 infrastructure, application, security, and cloud operations",
    },
    {
      slug: "low-current-systems",
      title: "Low Current Systems",
      description: "Structured cabling, fire alarm, public address, and building automation",
    },
  ],
  solutions: [
    {
      slug: "enterprise",
      title: "Enterprise Solutions",
      description: "Large-scale solutions for enterprise clients",
    },
    {
      slug: "smb",
      title: "SMB Solutions",
      description: "Tailored solutions for small and medium businesses",
    },
    {
      slug: "startups",
      title: "Startup Solutions",
      description: "Agile solutions for fast-growing startups",
    },
  ],
}

export type SiteConfig = typeof siteConfig
