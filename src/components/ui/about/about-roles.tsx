"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Bike,
  Building2,
  Sliders,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const ECOSYSTEM_ROLES = [
  {
    role: "Merchant & Customer",
    badge: "DEMAND SIDE",
    icon: Users,
    description:
      "Empowered with instant pickup scheduling, multi-address books, live GPS waypoint timelines, and Stripe digital checkout.",
    capabilities: [
      "Real-time waypoint status tracking",
      "Stripe card or Cash-on-Delivery payment",
      "Digital delivery receipt & OTP token",
    ],
    ctaText: "Start Shipping",
    ctaLink: "/register",
    accent: "text-primary",
  },
  {
    role: "Field Courier Hero",
    badge: "LAST-MILE FLEET",
    icon: Bike,
    description:
      "Turn-by-turn task dispatch, geofenced pickups, mobile barcode scans, and cryptographic recipient OTP delivery completion.",
    capabilities: [
      "Real-time route & density dispatching",
      "6-digit recipient OTP verification",
      "Instant commission & bonus ledger",
    ],
    ctaText: "Apply as Rider",
    ctaLink: "/apply-for-role",
    accent: "text-emerald-500",
  },
  {
    role: "Hub Operations Manager",
    badge: "FACILITY LOGISTICS",
    icon: Building2,
    description:
      "Regional terminal supervisors handling linehaul vehicle manifests, container de-palletizing, and sorting belt throughput.",
    capabilities: [
      "Inbound linehaul manifest verification",
      "Automated sorting induction & seal audits",
      "Outbound inter-hub convoy dispatch",
    ],
    ctaText: "Apply as Hub Manager",
    ctaLink: "/apply-for-role",
    accent: "text-amber-500",
  },
  {
    role: "Network Operations Manager",
    badge: "TRAFFIC DISPATCH",
    icon: Sliders,
    description:
      "System-wide linehaul visibility, corridor delay heatmaps, dynamic courier reassignments, and emergency exception triage.",
    capabilities: [
      "Nationwide highway corridor oversight",
      "One-click dynamic rider reassignment",
      "SLA compliance & exception resolution",
    ],
    ctaText: "Apply as Ops Manager",
    ctaLink: "/apply-for-role",
    accent: "text-blue-500",
  },
];

export default function AboutRoles() {
  return (
    <section className="py-24 bg-muted/30 text-foreground border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Users className="size-3.5" />
            <span>THE MULTI-ROLE ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-sans">
            One Unified Platform, Every Specialized Role
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A successful delivery requires flawless synchronization between five
            distinct actors. ParcelPilot gives each participant a dedicated,
            purpose-built console.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_ROLES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex"
              >
                <Card className="rounded-none border-border bg-card hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between w-full">
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="rounded-none text-[10px] font-mono border-border"
                      >
                        {item.badge}
                      </Badge>
                      <div className="p-2 rounded-none bg-muted text-foreground">
                        <IconComponent className={`size-4 ${item.accent}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {item.role}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2 space-y-2 border-t border-border">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block font-semibold">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {item.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-primary shrink-0" />
                          <span className="truncate">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-border">
                    <Link
                      href={item.ctaLink}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className:
                          "rounded-none w-full text-xs font-mono uppercase tracking-wider justify-between hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors",
                      })}
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
