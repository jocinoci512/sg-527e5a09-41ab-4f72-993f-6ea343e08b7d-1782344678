import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <img src="/logo.png" alt="Cipher Trace" className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80">
              Professional fraud investigation, blockchain intelligence, and recovery consultation services.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Services</Link></li>
              <li><Link href="/scams" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Scam Types</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Disclaimer</Link></li>
              <li><Link href="/cookies" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-primary-foreground/80">
                <span className="font-medium">Email:</span><br />
                <a href="mailto:Support@cipherstraces.com" className="hover:text-primary-foreground transition-colors">
                  Support@cipherstraces.com
                </a>
              </li>
              <li className="text-primary-foreground/80">
                <span className="font-medium">Phone:</span><br />
                <a href="tel:+16462440064" className="hover:text-primary-foreground transition-colors">
                  +1 (646) 244-0064
                </a>
              </li>
              <li className="text-primary-foreground/80">
                <span className="font-medium">WhatsApp:</span><br />
                <a href="https://wa.me/16462440064" className="hover:text-primary-foreground transition-colors">
                  +1 (646) 244-0064
                </a>
              </li>
            </ul>
            
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <div className="text-xs text-primary-foreground/70 space-y-4">
            <p className="font-semibold text-primary-foreground/90">
              Important Disclaimer:
            </p>
            <p>
              Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
            </p>
            <p className="text-center pt-4">
              © {currentYear} Cipher Trace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}