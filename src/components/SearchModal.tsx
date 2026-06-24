import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FileText,
  Shield,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Scale,
  Phone,
} from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchablePages = [
  // Services
  {
    title: "Cryptocurrency Fraud Investigation",
    href: "/services/crypto-fraud",
    category: "Services",
    icon: Shield,
    keywords: "crypto bitcoin ethereum scam fraud investigation blockchain",
  },
  {
    title: "All Services",
    href: "/services",
    category: "Services",
    icon: Shield,
    keywords: "services investigation tracing recovery consultation",
  },
  
  // Scam Types
  {
    title: "Pig Butchering Scams",
    href: "/scams/pig-butchering",
    category: "Scam Types",
    icon: AlertTriangle,
    keywords: "pig butchering romance investment fraud fake trading platform",
  },
  {
    title: "All Scam Types",
    href: "/scams",
    category: "Scam Types",
    icon: AlertTriangle,
    keywords: "scams fraud cryptocurrency investment romance forex nft",
  },
  
  // Core Pages
  {
    title: "About Us",
    href: "/about",
    category: "Company",
    icon: FileText,
    keywords: "about company mission vision values team",
  },
  {
    title: "Blog",
    href: "/blog",
    category: "Resources",
    icon: BookOpen,
    keywords: "blog articles news updates fraud prevention",
  },
  {
    title: "FAQ",
    href: "/faq",
    category: "Resources",
    icon: HelpCircle,
    keywords: "faq questions answers help support",
  },
  {
    title: "Contact",
    href: "/contact",
    category: "Support",
    icon: Phone,
    keywords: "contact email phone whatsapp support",
  },
  {
    title: "Start Case Review",
    href: "/case-review",
    category: "Get Started",
    icon: FileText,
    keywords: "case review form submit investigation consultation",
  },
  
  // Legal Pages
  {
    title: "Privacy Policy",
    href: "/privacy",
    category: "Legal",
    icon: Scale,
    keywords: "privacy policy data protection gdpr",
  },
  {
    title: "Terms of Service",
    href: "/terms",
    category: "Legal",
    icon: Scale,
    keywords: "terms service conditions agreement",
  },
  {
    title: "Disclaimer",
    href: "/disclaimer",
    category: "Legal",
    icon: Scale,
    keywords: "disclaimer liability recovery guarantee",
  },
  {
    title: "Cookie Policy",
    href: "/cookies",
    category: "Legal",
    icon: Scale,
    keywords: "cookies policy tracking",
  },
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = useCallback((href: string) => {
    onOpenChange(false);
    router.push(href);
  }, [onOpenChange, router]);

  const filteredPages = searchQuery
    ? searchablePages.filter((page) =>
        `${page.title} ${page.keywords}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchablePages;

  const groupedPages = filteredPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, typeof searchablePages>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search for services, scam types, or pages..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedPages).map(([category, pages]) => (
          <CommandGroup key={category} heading={category}>
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  key={page.href}
                  value={`${page.title} ${page.keywords}`}
                  onSelect={() => handleSelect(page.href)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{page.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}