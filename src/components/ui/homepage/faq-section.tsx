"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "How do I track my parcel without logging in?",
    answer:
      "Simply enter your unique tracking ID (e.g. PP-894210) into the instant tracking bar at the top of the homepage. You'll see real-time status updates including pickup confirmation, sorting hub arrivals, rider assignment, and final delivery estimation.",
  },
  {
    question: "How does Cash on Delivery (COD) payment work for merchants?",
    answer:
      "When our rider delivers your parcel and collects cash from the customer, the transaction is logged instantly into our system. COD funds are reconciled and transferred to your registered bank account or mobile wallet within 24 hours (excluding national banking holidays).",
  },
  {
    question: "What happens if a recipient is unavailable during delivery?",
    answer:
      "Our delivery heroes attempt delivery up to three consecutive times. If the customer does not answer, the parcel is safely stored at the local regional hub, and our customer support team contacts both the merchant and recipient to reschedule.",
  },
  {
    question: "Are parcels insured against accidental damage or loss?",
    answer:
      "Yes, standard parcels are covered up to ৳5,000 against verified transit damage or loss. For higher-value shipments (like consumer electronics and jewelry), premium transit insurance can be selected during booking.",
  },
  {
    question: "Can I connect ParcelPilot to my Shopify or WooCommerce store?",
    answer:
      "Yes! We provide plug-and-play plugins for WooCommerce, Shopify, and standard REST APIs for custom platforms. Orders are automatically synced, tracking codes are sent to your customers, and shipping labels can be printed directly from your store dashboard.",
  },
  {
    question: "What are the standard weight and size limits for express parcels?",
    answer:
      "Our standard bike fleet carries parcels up to 10 kg and 1.5 cubic feet. For larger cargo, pallets, or commercial inventory over 10 kg, our dedicated freight truck network handles up to 5 tons with liftgate support.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-primary/[0.04] dark:bg-primary/[0.05] text-foreground">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <HelpCircle className="h-3.5 w-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Everything you need to know about our courier network, delivery timelines, and COD procedures.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-4" data-aos="fade-up" data-aos-delay="100">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-zinc-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-transform duration-300 dark:bg-zinc-800 dark:text-zinc-300 ${
                      isOpen ? "rotate-180 bg-orange-500 text-white dark:bg-orange-500 dark:text-white" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
