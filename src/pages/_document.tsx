import { Html, Head, Main, NextScript } from "next/document";
import { SEOElements } from "@/components/SEO";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="mRFK2TdVkKJRRaXGhO-Jzl2ZQUqdAm2u9i0XTV2nlkQ" />
        
        {/* DNS Prefetch & Preconnect for Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        
        {/* Preload Critical Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
          as="style"
          onLoad={(e: any) => {
            if (e.target) e.target.onload = null;
            if (e.target) e.target.rel = 'stylesheet';
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Critical CSS for Above-the-Fold Content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical rendering path optimization */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .hero-section { min-height: 100vh; }
            @media (max-width: 768px) {
              .hero-section { min-height: auto; padding: 2rem 1rem; }
            }
          `
        }} />
        
        {/* SEO Meta Tags */}
        <SEOElements />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cipher Trace",
              "alternateName": "CipherTrace",
              "url": "https://cipherstraces.com",
              "logo": "https://cipherstraces.com/logo.png",
              "description": "Professional fraud investigation, blockchain intelligence, scam tracing, and digital asset recovery consultation services. Trusted by victims, businesses, attorneys, and law enforcement worldwide.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-646-244-0064",
                "contactType": "customer service",
                "email": "Support@cipherstraces.com",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://cipherstraces.com"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
        
        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Cipher Trace",
              "serviceType": ["Blockchain Investigation", "Cryptocurrency Fraud Recovery", "Scam Tracing", "Digital Asset Recovery"],
              "areaServed": "Worldwide",
              "url": "https://cipherstraces.com",
              "priceRange": "Consultation Available"
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
