"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  steps?: string[];
}

const FAQ_DATA: FaqItem[] = [
  // Category 1: Tracking & Lifecycles
  {
    id: "SYS-TRK-01",
    category: "Tracking & Statuses",
    question:
      "What does 'Consolidated at Sorting Hub' mean in my tracking timeline?",
    answer:
      "This indicates that your parcel has arrived safely at a regional automated sortation facility (e.g. Tejgaon Central or Agrabad Port). The barcode was scanned on the intake conveyor, sorted by optical scanner according to destination district, and staged for nightly linehaul trucking departure.",
  },
  {
    id: "SYS-TRK-02",
    category: "Tracking & Statuses",
    question: "Why hasn't the tracking status updated for the past 6 hours?",
    answer:
      "When a parcel is in long-haul linehaul transit between distant districts (for example, from Dhaka to Rangpur or Sylhet), status updates pause while the vehicle is traversing highways. The next automated scan triggers upon vehicle docking at the destination hub gate.",
  },
  {
    id: "SYS-TRK-03",
    category: "Tracking & Statuses",
    question: "What is the One-Time Delivery Security PIN (OTP)?",
    answer:
      "To prevent package theft or fraudulent doorstep handoffs, ParcelPilot sends a 4-digit cryptographic OTP to the recipient's registered mobile number when the courier begins the final delivery run. Provide this PIN to the courier to complete delivery.",
  },

  // Category 2: COD & Settlements
  {
    id: "SYS-COD-01",
    category: "COD & Settlements",
    question:
      "When are Cash on Delivery (COD) funds deposited into merchant bank accounts?",
    answer:
      "All doorstep cash collections undergo automated hub reconciliation by 20:00 daily. Disbursements are transferred via BEFTN/NPSB bank wire on a T+1 business day schedule (or instant disbursement if linked to verified MFS wallets).",
  },
  {
    id: "SYS-COD-02",
    category: "COD & Settlements",
    question: "How is the 1.0% COD collection fee calculated?",
    answer:
      "The 1% COD fee applies strictly to the collected cash amount. For instance, on a ৳1,500 collection, the COD handling fee is exactly ৳15. Zero fee is charged on pre-paid or cashless digital card shipments.",
  },

  // Category 3: Delivery Attempts & Address Correction
  {
    id: "SYS-DLV-01",
    category: "Address & Attempts",
    question:
      "Can I update the delivery address while the shipment is already in transit?",
    answer:
      "Yes. Senders or merchants can submit an address amendment via their dashboard or by contacting Dispatch Control before the package reaches 'Out for Delivery' status. If the new address belongs to a different hub zone, SLA extends by 24 hours.",
    steps: [
      "Open your shipment details on ParcelPilot dashboard",
      "Click 'Request Destination Revision'",
      "Input new recipient address & confirm phone number",
      "Automated system reroutes parcel at the next hub node",
    ],
  },
  {
    id: "SYS-DLV-02",
    category: "Address & Attempts",
    question:
      "How many delivery attempts does ParcelPilot perform before marking RTO?",
    answer:
      "We provide three (3) guaranteed delivery attempts over consecutive business days. Before marking a parcel as Return-To-Origin (RTO), our dispatch team initiates direct telephonic verification with both customer and merchant.",
  },

  // Category 4: Claims & Insurance
  {
    id: "SYS-CLM-01",
    category: "Claims & Exceptions",
    question: "How do I file a claim for a damaged or missing shipment?",
    answer:
      "If a parcel arrives damaged or fails to reach destination within 7 business days without exception logs, a claim can be lodged immediately under the ParcelPilot Transit Loss Shield.",
    steps: [
      "Navigate to Shipment > File Exception Claim within 48 hours of delivery",
      "Upload high-resolution photographs of outer box and inner item",
      "Submit declared purchase receipt / merchant commercial invoice",
      "Claims review team audits waybill telemetry and disburses reimbursement in 3-5 days",
    ],
  },
  {
    id: "SYS-CLM-02",
    category: "Claims & Exceptions",
    question: "What is the compensation limit for uninsured standard parcels?",
    answer:
      "Standard parcels are insured up to ৳3,000 baseline compensation. For high-value electronics or luxury goods, merchants should enable the Transit Insurance Shield (+৳15) at booking to cover 100% of declared invoice value.",
  },

  // Category 5: Merchant & API Tools
  {
    id: "SYS-API-01",
    category: "Merchant Integrations",
    question: "Does ParcelPilot provide automated REST APIs and Webhooks?",
    answer:
      "Yes. Registered merchants receive full access to our developer suite. You can programmatically generate waybills, print ZPL/PDF thermal barcode labels, and subscribe to webhook events (`shipment.created`, `shipment.out_for_delivery`, `shipment.delivered`, `settlement.paid`).",
  },
];

const CATEGORIES = [
  "All Categories",
  "Tracking & Statuses",
  "COD & Settlements",
  "Address & Attempts",
  "Claims & Exceptions",
  "Merchant Integrations",
];

interface HelpFaqAccordionProps {
  searchQuery: string;
}

export default function HelpFaqAccordion({
  searchQuery,
}: HelpFaqAccordionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openIds, setOpenIds] = useState<string[]>(["SYS-TRK-01"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-border mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-none text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground font-mono text-xs border border-border rounded-none bg-card">
              No articles found matching "{searchQuery}". Try searching for
              "COD", "Tracking", or "Address".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-none border border-border bg-card text-card-foreground overflow-hidden transition-all hover:border-primary/40 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-primary font-bold">{faq.id}</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-muted-foreground">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-none bg-muted/40 border border-border text-muted-foreground transition-transform duration-300 shrink-0 ${
                        isOpen
                          ? "rotate-180 text-primary border-primary/40"
                          : ""
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-border space-y-4 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                      <p>{faq.answer}</p>

                      {faq.steps && (
                        <div className="p-4 rounded-none bg-muted/30 border border-border space-y-2 mt-3">
                          <span className="text-[11px] font-mono font-bold text-primary block uppercase">
                            RECOMMENDED ACTION STEPS:
                          </span>
                          <ol className="space-y-1.5 list-decimal list-inside text-muted-foreground text-xs font-sans">
                            {faq.steps.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
