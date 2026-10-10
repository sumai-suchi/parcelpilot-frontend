"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Layers,
  Zap,
  ShieldCheck,
  CreditCard,
  Cloud,
  Code2,
  Lock,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TECH_COMPONENTS = [
  {
    title: "Next.js 16 & React 19 Frontend",
    category: "USER INTERFACE & SSR",
    icon: Code2,
    description:
      "Modern React Compiler, Server & Client components, and TanStack Query state hydration for ultra-fast, responsive logistics tracking.",
    badge: "FRONTEND CORE",
    accent: "text-primary",
  },
  {
    title: "PostgreSQL & Prisma Transactions",
    category: "DATA PERSISTENCE",
    icon: Database,
    description:
      "Strict relational integrity with Prisma multi-action transactions ensuring atomicity across shipment states, waybills, and hub assignments.",
    badge: "ACID COMPLIANT",
    accent: "text-blue-500",
  },
  {
    title: "In-Memory Redis OTP Store",
    category: "HIGH VELOCITY STATE",
    icon: Zap,
    description:
      "Sub-second verification token caching for recipient delivery OTPs, ephemeral registration payloads, and low-latency task validation.",
    badge: "EPHEMERAL CACHE",
    accent: "text-amber-500",
  },
  {
    title: "Stripe Hosted Checkout & Webhooks",
    category: "PAYMENT RAILS",
    icon: CreditCard,
    description:
      "Enterprise payment processing supporting credit/debit cards, idempotent webhook listeners, and instant settlement reconciliations.",
    badge: "FINANCIAL SECURITY",
    accent: "text-emerald-500",
  },
  {
    title: "Modular Express & TypeScript API",
    category: "BACKEND CONTROL PLANE",
    icon: Layers,
    description:
      "Clean layered architecture separating controllers, business services, and Zod runtime schema validations with zero circular dependencies.",
    badge: "TYPE-SAFE API",
    accent: "text-purple-500",
  },
  {
    title: "Cloudinary CDN Media Pipeline",
    category: "DIGITAL ASSETS",
    icon: Cloud,
    description:
      "Buffer-streamed proof-of-delivery uploads, consignment image inspections, and driver avatars with automated format optimization.",
    badge: "IMAGE PIPELINE",
    accent: "text-cyan-500",
  },
];

export default function AboutTechStack() {
  return (
    <section className="py-24 bg-muted/30 text-foreground border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Cpu className="size-3.5" />
            <span>ENGINEERING & TECHNICAL RIGOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            Architected for Zero Failure Tolerance
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            In physical logistics, software downtime means stranded vehicles and
            missing cargo. Our technical stack is chosen specifically to
            guarantee transaction atomicity, sub-second telemetry, and ironclad
            financial precision.
          </p>
        </div>

        {/* 6 Tech Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_COMPONENTS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card className="h-full rounded-none border-border bg-card hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                        {item.category}
                      </span>
                      <Badge
                        variant="outline"
                        className="rounded-none text-[10px] font-mono border-border"
                      >
                        {item.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-none bg-muted text-foreground">
                        <IconComponent className={`size-5 ${item.accent}`} />
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Principles Banner */}
        <div className="p-6 sm:p-8 rounded-none bg-card text-card-foreground border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-primary font-bold">
              <Lock className="size-3.5" />
              <span>CRYPTOGRAPHIC FINANCIAL ASSURANCE</span>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-foreground font-sans">
              BigInt Native Currency Serialization & Zero Rounding Errors
            </h4>
            <p className="text-xs text-muted-foreground max-w-2xl font-sans">
              All financial transactions across delivery fees, courier payouts,
              and Stripe payments avoid JavaScript floating-point rounding bugs,
              maintaining exact cent-level balance sheet parity.
            </p>
          </div>
          <Badge
            variant="outline"
            className="rounded-none border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs font-mono shrink-0 px-3 py-1"
          >
            VERIFIED INTEGRITY
          </Badge>
        </div>
      </div>
    </section>
  );
}
