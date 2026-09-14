/**
 * Single source of truth for branding + nav.
 * Swap logo files in /public and edit the strings below - no component
 * ever hardcodes the site name, logo path, or nav items
 */
export const siteConfig = {
  name: "UniFind",
  tagline: "Campus marketplace for BU students",
  logo: {
    light: "/logo.svg", // put light-mode logo here
    dark: "/logo-dark.svg", // put dark-mode logo here
    favicon: "/icons/favicon.ico",
  },
  nav: {
    primary: [
      { label: "Home", href: "/", icon: "Home" as const },
      { label: "Wishlist", href: "/wishlist", icon: "Heart" as const },
      { label: "Shop", href: "/shop", icon: "Store" as const },
      { label: "Messages", href: "/messages", icon: "MessageCircle" as const },
      { label: "Profile", href: "/profile", icon: "User" as const },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
