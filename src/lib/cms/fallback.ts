import type { CmsNavLink, CmsTeamMember, SiteSettings } from "@/lib/cms/public";

/** Local copy of the current public site. Used only when the CMS is unavailable. */
export const fallbackSettings: SiteSettings = {
  site_name: "Tipple Works Co.",
  phone: "+91 9136291606",
  phone_href: "tel:+919810035669",
  email: "srishti.bhatia@tippeworks.com",
  about_email: "srishti.bhatia@tippleworks.com",
  careers_email: "rohandhirwani@tippleworks.com",
  admin_email: "admin@tippleworks.com",
  address: "Mumbai, India",
  instagram: "https://www.instagram.com/tippleworksco",
  instagram_handle: "@tippleworksco",
  instagram_floating: "https://www.instagram.com/tippleworksco/",
  instagram_contact: "https://instagram.com",
  linkedin: "https://www.linkedin.com/company/tippleworksco",
  linkedin_floating: "https://in.linkedin.com/company/tippleworksco",
  footer_copy: "© 2025 Tipple Works Private Limited. All rights reserved.",
  copyright: "© 2025 Tipple Works Private Limited. All rights reserved.",
};

export const fallbackHeader: CmsNavLink[] = [
  { id: "home", label: "Home", href: "/", placement: "header" },
  { id: "about", label: "About", href: "/about", placement: "header" },
  { id: "work", label: "Work", href: "/work", placement: "header" },
  { id: "services", label: "Services", href: "/services", placement: "header" },
  { id: "contact", label: "Contact", href: "/contact", placement: "header" },
];

export const fallbackFooterNav: CmsNavLink[] = fallbackHeader.map((link) => ({ ...link, id: `footer-${link.id}`, placement: "footer" }));

export const fallbackLegal: CmsNavLink[] = [
  { id: "privacy", label: "Privacy Policy", href: "/privacy-policy", placement: "legal" },
  { id: "terms", label: "Terms of Service", href: "/terms-of-service", placement: "legal" },
];

export const fallbackTeam: CmsTeamMember[] = [
  { id: "rohan", name: "Rohan Dhirwani", role: "Founder & CEO", bio: "", image: "/lovable-uploads/rohandhirwani.png", linkedin: null },
  { id: "srishti", name: "Srishti Bhatia", role: "Co-Founder & Business Head", bio: "", image: "/lovable-uploads/SrishtiBhatia.jpg", linkedin: null },
  { id: "ansh", name: "Ansh Bhatia", role: "Co-Founder & Creative Head", bio: "", image: "/lovable-uploads/AnshBhatia.jpeg", linkedin: null },
];
