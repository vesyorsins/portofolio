import { NavLink, SocialLink } from "@/types/portfolio";
import { GithubIcon, LinkedinIcon, TwitterIcon, DiscordIcon } from "@/components/ui/Icons";

export const navLinks: NavLink[] = [
  { name: "Overview", href: "#hero", id: "hero" },
  { name: "Awards", href: "#awards", id: "awards" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Stack", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    handle: "@vesyorsins",
    url: "https://github.com",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    handle: "in/vesyorsins",
    url: "https://linkedin.com",
    icon: LinkedinIcon,
  },
  {
    name: "Twitter / X",
    handle: "@vesyorsins",
    url: "https://twitter.com",
    icon: TwitterIcon,
  },
  {
    name: "Discord",
    handle: "vesyorsins#0001",
    url: "https://discord.com",
    icon: DiscordIcon,
  },
];
