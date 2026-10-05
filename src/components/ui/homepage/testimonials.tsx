"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    name: "Tanzim Ahmed",
    role: "Founder, UrbanStyle Apparel",
    quote:
      "ParcelPilot changed the game for our online store. Our return rate dropped by 18% because their riders actually call customers beforehand, and we get COD money in our bank the very next morning.",
    rating: 5,
    tag: "E-Commerce Merchant",
  },
  {
    name: "Dr. Farhana Yasmin",
    role: "Medical Diagnostics Consultant",
    quote:
      "I needed critical test reports delivered between hospital labs across town. The express rider was polite, tracked via live GPS, and delivered in under 2 hours without a single crease. Outstanding!",
    rating: 5,
    tag: "Individual Shipper",
  },
  {
    name: "Mahmudul Hasan",
    role: "Operations Lead, TechZone Gadgets",
    quote:
      "Shipping high-value smartphones and laptops used to be nerve-wracking. ParcelPilot's transit insurance and tamper-proof security seals give us complete peace of mind across all 64 districts.",
    rating: 5,
    tag: "Electronics Retailer",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-200/70 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
            Real Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Trusted by Thousands Across the Country
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            See how merchants, enterprises, and everyday senders rely on ParcelPilot for mission-critical deliveries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={rev.name}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/60 p-8 shadow-sm transition-all hover:border-orange-500/30 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:bg-zinc-900"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                    {rev.tag}
                  </span>
                </div>

                <Quote className="h-8 w-8 text-orange-400/30 mb-2" />

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {rev.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
