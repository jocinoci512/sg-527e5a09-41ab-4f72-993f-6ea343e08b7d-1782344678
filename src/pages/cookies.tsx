import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import Link from "next/link";

export default function Cookies() {
  return (
    <Layout>
      <SEO 
        title="Cookie Policy - Cipher Trace"
        description="Cipher Trace cookie policy explaining how we use cookies and similar technologies on our website."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-8">
          Cookie Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> June 23, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">1. What Are Cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and improving our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Essential Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are necessary for the website to function properly. They enable basic features like page navigation, secure access to certain areas, and form submissions. The website cannot function properly without these cookies.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies help us understand how visitors interact with our website by collecting anonymous information about:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Pages visited and time spent on each page</li>
              <li>Traffic sources and referral websites</li>
              <li>Geographic location (country/city level)</li>
              <li>Device type and browser information</li>
              <li>Search terms used to find our website</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Functional Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies enable enhanced functionality and personalization, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Remembering your preferences and settings</li>
              <li>Language selection</li>
              <li>Login status (admin dashboard)</li>
              <li>Form auto-fill features</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Marketing Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies track your online activity to help us deliver more relevant content and advertisements. They may be set by us or third-party partners for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Displaying relevant ads on other websites</li>
              <li>Measuring the effectiveness of marketing campaigns</li>
              <li>Building a profile of your interests</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">3. Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use services from trusted third-party providers that may set cookies on your device:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Google Analytics:</strong> Website traffic analysis and visitor behavior tracking</li>
              <li><strong>Social Media Platforms:</strong> Enabling social sharing and tracking engagement</li>
              <li><strong>Content Delivery Networks (CDNs):</strong> Optimizing website performance and loading speed</li>
            </ul>
            <p className="text-muted-foreground">
              These third parties have their own privacy policies governing their use of cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">4. Cookie Duration</h2>
            <p className="text-muted-foreground mb-4">
              Cookies may be stored on your device for different periods:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">5. Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You have several options to manage or disable cookies:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Browser Settings</h3>
            <p className="text-muted-foreground mb-4">
              Most web browsers allow you to control cookies through settings. You can:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Block all cookies</li>
              <li>Accept only first-party cookies</li>
              <li>Delete cookies after closing the browser</li>
              <li>Clear existing cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Browser-Specific Instructions</h3>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site data</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Opt-Out Tools</h3>
            <p className="text-muted-foreground mb-4">
              You can opt out of specific types of tracking:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
              <li><strong>Advertising Cookies:</strong> Visit youronlinechoices.eu or aboutads.info</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">6. Impact of Disabling Cookies</h2>
            <p className="text-muted-foreground mb-4">
              If you choose to disable cookies, some website features may not function properly:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>You may need to re-enter information on subsequent visits</li>
              <li>Form submissions may not work correctly</li>
              <li>Some pages may load more slowly</li>
              <li>You may not be able to access certain secure areas</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">7. Cookie Consent</h2>
            <p className="text-muted-foreground">
              By continuing to use our website, you consent to our use of cookies as described in this policy. Upon your first visit, you will be presented with a cookie consent banner allowing you to accept or customize your cookie preferences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">8. Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Cookie Policy to reflect changes in our practices or for legal compliance. Updates will be posted on this page with a revised &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">9. More Information</h2>
            <p className="text-muted-foreground mb-4">
              For more information about how we handle your data, please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">10. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-foreground mb-2"><strong>Cipher Trace</strong></p>
              <p className="text-muted-foreground mb-1">Email: Support@cipherstraces.com</p>
              <p className="text-muted-foreground mb-1">Phone: +1 (646) 244-0064</p>
              <p className="text-muted-foreground">WhatsApp: +1 (646) 244-0064</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}