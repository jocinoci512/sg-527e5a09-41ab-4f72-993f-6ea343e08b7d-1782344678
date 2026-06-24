import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is Cipher Trace?",
          answer: "Cipher Trace is a professional fraud investigation and blockchain intelligence firm specializing in cryptocurrency scams, investment fraud, romance scams, and digital asset recovery consultation. We help victims, businesses, attorneys, and law enforcement agencies investigate financial fraud and trace stolen assets."
        },
        {
          question: "What services does Cipher Trace provide?",
          answer: "We provide comprehensive fraud investigation services including blockchain transaction tracing, cryptocurrency scam investigation, digital asset recovery consultation, forensic analysis, intelligence gathering, evidence documentation, and expert witness services for legal proceedings."
        },
        {
          question: "How long does a fraud investigation take?",
          answer: "Investigation timelines vary significantly based on case complexity, available evidence, blockchain activity, and cooperation from involved parties. Simple cases may take 2-4 weeks, while complex international fraud cases can take several months. We provide timeline estimates during the initial case review."
        },
        {
          question: "Do you guarantee recovery of stolen funds?",
          answer: "No. Recovery outcomes cannot be guaranteed and vary significantly depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances. We provide honest assessments of recovery probability during case review."
        }
      ]
    },
    {
      title: "Cryptocurrency & Blockchain",
      faqs: [
        {
          question: "Can you trace cryptocurrency transactions?",
          answer: "Yes. Our blockchain intelligence team can trace cryptocurrency transactions across major networks including Bitcoin, Ethereum, USDT, and other popular cryptocurrencies. We use professional blockchain analysis tools to track fund movements, identify wallet clusters, and document transaction flows."
        },
        {
          question: "What information do you need to trace crypto transactions?",
          answer: "To begin blockchain tracing, we need the victim's wallet address(es), scammer's wallet address(es) if known, transaction hashes, amounts transferred, dates of transactions, and any communication with the scammer. Screenshots and transaction records are extremely helpful."
        },
        {
          question: "Can stolen cryptocurrency be recovered?",
          answer: "Recovery depends on multiple factors: whether funds remain in traceable wallets, if they were transferred to exchanges where legal action can compel cooperation, jurisdiction of involved parties, and cooperation from financial institutions. Some cases result in successful recovery, while others do not."
        },
        {
          question: "How do you investigate crypto exchange fraud?",
          answer: "Exchange fraud investigations involve analyzing the platform's legitimacy, tracing fund movements, documenting communications, identifying operators, researching regulatory status, and working with law enforcement when criminal activity is confirmed. We provide comprehensive investigation reports for legal proceedings."
        }
      ]
    },
    {
      title: "Investigation Process",
      faqs: [
        {
          question: "How does the investigation process work?",
          answer: "Our process includes: (1) Free case review and consultation, (2) Evidence gathering and analysis, (3) Blockchain tracing and intelligence research, (4) Investigation report preparation, (5) Recovery consultation and legal guidance, (6) Ongoing support throughout legal proceedings if applicable."
        },
        {
          question: "What evidence should I preserve?",
          answer: "Preserve all communications (emails, texts, chat messages), transaction records, screenshots of websites and profiles, wallet addresses, bank statements, wire transfer receipts, account statements, and any documents received from the scammer. Do not delete anything, even if you think it's unimportant."
        },
        {
          question: "Will you work with law enforcement?",
          answer: "Yes. We regularly work with law enforcement agencies worldwide and can provide professional investigation reports, blockchain analysis, and expert consultation to support criminal investigations. We have experience testifying as expert witnesses in fraud cases."
        },
        {
          question: "Can you investigate cases outside the United States?",
          answer: "Yes. We provide global case support and have experience investigating international fraud cases. Our blockchain intelligence capabilities allow us to trace cryptocurrency transactions globally, and we maintain relationships with investigators and legal professionals in multiple jurisdictions."
        }
      ]
    },
    {
      title: "Scam Types & Prevention",
      faqs: [
        {
          question: "What is pig butchering scam?",
          answer: "Pig butchering is a sophisticated romance-investment scam where criminals build long-term relationships with victims through dating apps or social media, gradually introducing fraudulent cryptocurrency investment opportunities. Victims are encouraged to invest increasing amounts before the platform locks their funds and the scammer disappears."
        },
        {
          question: "How can I verify if an investment platform is legitimate?",
          answer: "Check regulatory registrations (SEC, FINRA, FCA, etc.), research company history and leadership, verify physical office locations, read independent reviews, test withdrawal processes with small amounts, be suspicious of guaranteed returns, and consult with financial advisors before investing significant funds."
        },
        {
          question: "What are warning signs of cryptocurrency scams?",
          answer: "Red flags include: guaranteed high returns, pressure to invest quickly, requests for upfront fees, inability to withdraw funds, unprofessional websites, anonymous operators, lack of regulatory registration, requirement to recruit others, promises of \"insider\" opportunities, and resistance to video calls or in-person meetings."
        },
        {
          question: "I think I'm being scammed. What should I do immediately?",
          answer: "Stop all communication and payments immediately. Do not send any additional funds, fees, or taxes. Preserve all evidence including screenshots, messages, and transaction records. Report to local law enforcement and relevant regulatory agencies. Contact our team for a free case review to assess investigation and recovery options."
        }
      ]
    },
    {
      title: "Costs & Payment",
      faqs: [
        {
          question: "How much do investigation services cost?",
          answer: "Costs vary based on case complexity, required investigation scope, blockchain analysis depth, and time investment. We provide transparent pricing estimates during the initial case review. Simple investigations may cost $2,500-$5,000, while complex international cases can range from $10,000-$25,000 or more."
        },
        {
          question: "Do you charge upfront fees?",
          answer: "Yes. Professional investigation services require upfront engagement fees to cover initial investigation costs, blockchain analysis tools, research time, and report preparation. We do not work on contingency or success-fee basis for investigation services."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept wire transfers, credit cards, and cryptocurrency payments. Payment details are provided during engagement after case review. All fees are outlined in written service agreements before work begins."
        },
        {
          question: "Do you offer payment plans?",
          answer: "We may offer payment plans for qualified cases involving significant losses. Payment plan availability depends on case details, investigation scope, and financial circumstances. Discuss payment options during your case review consultation."
        }
      ]
    },
    {
      title: "Legal & Privacy",
      faqs: [
        {
          question: "Is my information kept confidential?",
          answer: "Yes. All case information is protected under strict confidentiality agreements. We handle sensitive investigation details with professional discretion and only share information with authorized personnel, law enforcement when required, or legal counsel as directed by the client."
        },
        {
          question: "Can your investigation reports be used in court?",
          answer: "Yes. Our investigation reports are prepared to professional forensic standards and can be used in civil litigation, criminal proceedings, and regulatory complaints. Our investigators have experience providing expert witness testimony in fraud cases."
        },
        {
          question: "Do you provide legal advice?",
          answer: "No. We are not attorneys and do not provide legal advice. We provide investigation services, blockchain analysis, and recovery consultation. We recommend working with qualified attorneys for legal matters and can provide professional investigation reports to support legal proceedings."
        },
        {
          question: "Will you guarantee recovery or legal outcomes?",
          answer: "No. We cannot guarantee any specific recovery outcomes, legal results, or investigative findings. Our service is professional investigation and consultation. Actual recovery depends on numerous factors outside our control including available evidence, jurisdiction, cooperation from third parties, and legal proceedings."
        }
      ]
    }
  ];

  return (
    <Layout>
      <SEO 
        title="FAQ | Cipher Trace - Fraud Investigation Questions Answered"
        description="Frequently asked questions about cryptocurrency fraud investigation, blockchain tracing, digital asset recovery, and fraud prevention services at Cipher Trace."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Find answers to common questions about our fraud investigation and blockchain intelligence services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border-2 rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our investigation team is available to answer your specific questions and provide a free case review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/case-review">Start Free Case Review</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/16462440064" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
          </p>
        </div>
      </section>
    </Layout>
  );
}