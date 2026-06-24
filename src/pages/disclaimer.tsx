import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";

export default function Disclaimer() {
  return (
    <Layout>
      <SEO 
        title="Disclaimer - Cipher Trace"
        description="Important disclaimers regarding Cipher Trace fraud investigation and recovery consultation services."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-8">
          Disclaimer
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> June 23, 2026
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">No Guarantee of Recovery</h2>
            <p className="text-muted-foreground text-lg">
              Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. <strong>Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.</strong>
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">1. Nature of Services</h2>
            <p className="text-muted-foreground mb-4">
              Cipher Trace provides professional investigation and consultation services. We do not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Guarantee recovery of stolen funds or assets</li>
              <li>Promise specific outcomes or results</li>
              <li>Act as legal representatives or attorneys</li>
              <li>Directly retrieve or return stolen cryptocurrency</li>
              <li>Provide financial or investment advice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">2. Investigation Limitations</h2>
            <p className="text-muted-foreground mb-4">
              While we employ advanced forensic techniques and professional methodologies, our investigations face inherent limitations:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>Blockchain Anonymity:</strong> Cryptocurrency transactions can be difficult to trace, especially when perpetrators use mixing services, privacy coins, or complex laundering techniques</li>
              <li><strong>Jurisdiction Challenges:</strong> International fraud cases involve multiple legal jurisdictions with varying levels of cooperation</li>
              <li><strong>Evidence Availability:</strong> Investigation success depends on the quality and completeness of evidence provided</li>
              <li><strong>Third-Party Cooperation:</strong> Exchanges, platforms, and service providers may not respond to information requests</li>
              <li><strong>Perpetrator Sophistication:</strong> Experienced scammers employ advanced techniques to evade detection</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">3. Not Legal or Financial Advice</h2>
            <p className="text-muted-foreground mb-4">
              Information provided by Cipher Trace does not constitute:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Legal advice or representation</li>
              <li>Financial planning or investment guidance</li>
              <li>Tax advice or accounting services</li>
              <li>Regulatory compliance consultation</li>
            </ul>
            <p className="text-muted-foreground">
              We strongly recommend consulting with qualified legal, financial, and tax professionals before making decisions based on investigation findings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">4. Website Content</h2>
            <p className="text-muted-foreground mb-4">
              Content on our website, including blog posts, articles, and case studies:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Is provided for informational and educational purposes only</li>
              <li>Should not be relied upon as professional advice</li>
              <li>May not reflect the most current developments in fraud prevention or blockchain technology</li>
              <li>Represents general information and may not apply to your specific situation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">5. Success Stories and Case Examples</h2>
            <p className="text-muted-foreground mb-4">
              Case examples and success stories presented on our website:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Are anonymized to protect client confidentiality</li>
              <li>Represent specific circumstances and should not be considered typical results</li>
              <li>Do not guarantee similar outcomes in other cases</li>
              <li>May have been achieved through factors beyond our control</li>
            </ul>
            <p className="text-muted-foreground">
              Past performance and investigation results do not predict future outcomes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">6. Third-Party Resources</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites, resources, or services. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Use of third-party resources is at your own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, Cipher Trace shall not be liable for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Decisions made based on information provided on our website or during consultations</li>
              <li>Losses resulting from reliance on investigation findings</li>
              <li>Actions or inactions by law enforcement, exchanges, or other third parties</li>
              <li>Delays in investigation due to circumstances beyond our control</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">8. Professional Opinions</h2>
            <p className="text-muted-foreground">
              Investigation reports and findings represent professional opinions based on available evidence at the time of investigation. These opinions:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>May change as new information becomes available</li>
              <li>Are based on reasonable assumptions and analysis</li>
              <li>Cannot account for all potential variables or future developments</li>
              <li>Should be evaluated in conjunction with other professional advice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">9. Law Enforcement Cooperation</h2>
            <p className="text-muted-foreground">
              While we prepare investigation reports suitable for law enforcement submission, we cannot:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Guarantee that authorities will accept or act on our reports</li>
              <li>Control the timing or outcome of law enforcement investigations</li>
              <li>Compel cooperation from agencies or regulatory bodies</li>
              <li>Guarantee criminal prosecution of perpetrators</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">10. Changes to Disclaimer</h2>
            <p className="text-muted-foreground">
              We reserve the right to update this Disclaimer at any time. Changes will be posted on this page with an updated date. Your continued use of our services constitutes acceptance of any modifications.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">11. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Disclaimer, please contact us:
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