import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import Link from "next/link";

export default function Privacy() {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy - Cipher Trace"
        description="Cipher Trace privacy policy outlining how we collect, use, and protect your personal information during fraud investigations."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> June 23, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Cipher Trace (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website cipherstraces.com and use our fraud investigation services.
            </p>
            <p className="text-muted-foreground">
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Personal Information</h3>
            <p className="text-muted-foreground mb-4">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Submit a case review or consultation request</li>
              <li>Contact us via email, phone, or WhatsApp</li>
              <li>Subscribe to our newsletter or blog</li>
              <li>Fill out forms on our website</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              This information may include: name, email address, phone number, country, description of fraud incident, transaction records, wallet addresses, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Case Investigation Data</h3>
            <p className="text-muted-foreground mb-4">
              When conducting fraud investigations, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Cryptocurrency wallet addresses and transaction histories</li>
              <li>Communication logs with alleged scammers</li>
              <li>Screenshots and documentation of fraudulent activities</li>
              <li>Banking and financial records related to the fraud</li>
              <li>Digital evidence and forensic data</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Conduct fraud investigations and blockchain analysis</li>
              <li>Provide recovery consultation services</li>
              <li>Communicate with you about your case</li>
              <li>Prepare investigation reports and evidence packages</li>
              <li>Coordinate with law enforcement and legal authorities</li>
              <li>Improve our services and website functionality</li>
              <li>Send newsletters and educational content (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">4. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Law Enforcement</h3>
            <p className="text-muted-foreground mb-4">
              We may share your information with law enforcement agencies, regulatory authorities, or legal professionals when:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>You explicitly consent to such sharing</li>
              <li>Required by law or legal process</li>
              <li>Necessary to support criminal investigations</li>
              <li>Part of a coordinated recovery effort</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Service Providers</h3>
            <p className="text-muted-foreground mb-4">
              We may share your information with trusted third-party service providers who assist us in operating our business, conducting investigations, or servicing you, provided they agree to keep this information confidential.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">We Do Not Sell Your Information</h3>
            <p className="text-muted-foreground">
              Cipher Trace does not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement enterprise-grade security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>End-to-end encryption for sensitive data transmission</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Confidentiality agreements with all team members</li>
            </ul>
            <p className="text-muted-foreground">
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but maintain industry best practices.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">6. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Fulfill the purposes outlined in this privacy policy</li>
              <li>Complete active investigations and provide reports</li>
              <li>Comply with legal obligations and potential litigation</li>
              <li>Support ongoing recovery efforts</li>
            </ul>
            <p className="text-muted-foreground">
              Case files may be retained for up to 7 years after case closure for legal and regulatory compliance purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">7. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your information (subject to legal obligations)</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise these rights, contact us at Support@cipherstraces.com.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              Our website uses cookies and similar tracking technologies to enhance user experience and analyze website traffic. For detailed information, please see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">9. International Data Transfers</h2>
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">10. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">11. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with an updated &quot;Last Updated&quot; date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">12. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
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