import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/ThemeSwitch";

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scamsOpen, setScamsOpen] = useState(false);

  const services = [
    { name: "Cryptocurrency Fraud Investigation", href: "/services/crypto-fraud" },
    { name: "Blockchain Transaction Tracing", href: "/services/blockchain-tracing" },
    { name: "Digital Asset Recovery Consultation", href: "/services/asset-recovery" },
    { name: "Investment Scam Investigation", href: "/services/investment-scams" },
    { name: "Romance Scam Investigation", href: "/services/romance-scams" },
    { name: "Forex Scam Investigation", href: "/services/forex-scams" },
  ];

  const scamTypes = [
    { name: "Cryptocurrency Scams", href: "/scams/cryptocurrency" },
    { name: "Investment Scams", href: "/scams/investment" },
    { name: "Romance Scams", href: "/scams/romance" },
    { name: "Forex Scams", href: "/scams/forex" },
    { name: "Pig Butchering Scams", href: "/scams/pig-butchering" },
    { name: "NFT Scams", href: "/scams/nft" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <img className="h-12 w-auto" src="/logo.png" alt="Cipher Trace" />
          </Link>
        </div>
        
        <div className="flex lg:hidden gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/about" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            About
          </Link>
          
          <div className="relative group">
            <button
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            
            {servicesOpen && (
              <div
                className="absolute left-0 top-full mt-3 w-screen max-w-md rounded-xl bg-background shadow-lg ring-1 ring-border p-4"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="grid grid-cols-1 gap-2">
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative group">
            <button
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => setScamsOpen(true)}
              onMouseLeave={() => setScamsOpen(false)}
            >
              Scam Types
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            
            {scamsOpen && (
              <div
                className="absolute left-0 top-full mt-3 w-screen max-w-md rounded-xl bg-background shadow-lg ring-1 ring-border p-4"
                onMouseEnter={() => setScamsOpen(true)}
                onMouseLeave={() => setScamsOpen(false)}
              >
                <div className="grid grid-cols-1 gap-2">
                  {scamTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Link href="/blog" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          
          <Link href="/faq" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
          
          <Link href="/contact" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onSearchClick}
            className="gap-2"
          >
            <Search className="h-4 w-4" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <ThemeSwitch />
          <Button asChild size="lg" className="font-semibold">
            <Link href="/case-review">Start Free Case Review</Link>
          </Button>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-6 pt-2">
            <Link
              href="/about"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground px-3">Services</div>
              {services.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm leading-7 text-foreground hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground px-3">Scam Types</div>
              {scamTypes.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm leading-7 text-foreground hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <Link
              href="/blog"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            
            <Link
              href="/faq"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            
            <Link
              href="/contact"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 flex items-center gap-2">
              <ThemeSwitch />
              <Button asChild className="flex-1 font-semibold" size="lg">
                <Link href="/case-review">Start Free Case Review</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}