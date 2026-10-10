"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  Check,
  Radio,
  Clock,
  MapPin,
  ShieldCheck,
  Box,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "/images/hero/hero-truck-sunset.jpg",
    label: "HIGHWAY CORRIDOR LINEHAUL",
    terminal: "CENTRAL INTER-DISTRICT TRUNK",
  },
  {
    image: "/images/hero/hero-bike-delivery.jpg",
    label: "LAST-MILE FLEET DISPATCH",
    terminal: "METROPOLITAN COURIER GRID",
  },
  {
    image: "/images/hero/hero-cargo-port.jpg",
    label: "INTERMODAL PORT CLEARANCE",
    terminal: "BAY TERMINAL CONSOLIDATION",
  },
  {
    image: "/images/hero/hero-ship-sea.jpg",
    label: "COASTAL FREIGHT FORWARDING",
    terminal: "SOUTHERN WATERWAYS TRANSIT",
  },
  {
    image: "/images/hero/hero-aerial-harbor.jpg",
    label: "REGIONAL LOGISTICS NETWORK",
    terminal: "64-DISTRICT HUB TOPOLOGY",
  },
];

const CHECKPOINTS = [
  {
    name: "Pickup",
    time: "08:30 AM",
    status: "completed",
    location: "Dhanmondi, Dhaka",
  },
  {
    name: "Origin Hub",
    time: "11:15 AM",
    status: "completed",
    location: "Tejgaon Hub [HUB-01]",
  },
  {
    name: "In Transit",
    time: "02:40 PM",
    status: "active",
    location: "N1 Highway Corridor",
  },
  {
    name: "Destination Hub",
    time: "ETA 06:00 PM",
    status: "pending",
    location: "Agrabad Hub [HUB-04]",
  },
  {
    name: "Out for Delivery",
    time: "ETA Tomorrow",
    status: "pending",
    location: "Chattogram Metro",
  },
  {
    name: "Delivered",
    time: "Pending",
    status: "pending",
    location: "Consignee Doorstep",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Smooth cross-fade between clear, vibrant images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTracking = () => {
    const el = document.getElementById("tracking-cockpit");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-zinc-100 pt-24 pb-16">
      {/* Background Image Carousel: Vibrant, Clear, No Heavy Shadows, No Squares */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].label}
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Clean, Non-shadowing Directional Scrim for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left Column: Operational Editorial Messaging */}
          <div className="lg:col-span-6 space-y-6">
            {/* System Status Identifier */}
            <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-mono text-zinc-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>NETWORK RUNTIME // PROTOCOL V2.4</span>
              <span className="text-zinc-500">|</span>
              <span className="text-orange-400 font-semibold">
                {HERO_SLIDES[currentSlide].label}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans drop-shadow-md">
                Every parcel. <br />
                <span className="text-orange-400">One connected journey.</span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-zinc-200 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              ParcelPilot coordinates real-time handoffs across customers,
              couriers, regional sorting hubs, and operations managers. Complete
              end-to-end telemetry from pickup confirmation to signed doorstep
              delivery.
            </p>

            {/* Purpose-Driven CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                type="button"
                onClick={scrollToTracking}
                size="lg"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-orange-600/30"
              >
                <Search className="h-4 w-4 mr-2" />
                Track a Shipment
              </Button>
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "border-white/30 bg-black/50 hover:bg-black/80 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md",
                })}
              >
                Start Shipping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Technical Sub-Ledger */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-orange-400" />
                <span>ACTIVE NODES: 64 HUBS</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                <span>DISPATCH LATENCY: &lt; 4.2 MIN</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>CHAIN OF CUSTODY VERIFIED</span>
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.image}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-6 bg-orange-500"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Right Column: Shadcn Card Frame for Live Logistics Manifest */}
          <div className="lg:col-span-6">
            <Card className="border-border/60 bg-card/95 text-card-foreground shadow-2xl backdrop-blur-xl">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold">
                        LIVE CONSIGNMENT
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        MANIFEST #88241
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-mono tracking-tight text-foreground flex items-center gap-2 pt-1">
                      <span>PP-48291</span>
                      <span className="text-xs font-sans font-normal text-muted-foreground px-2 py-0.5 rounded bg-muted">
                        Standard Freight
                      </span>
                    </CardTitle>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs text-muted-foreground uppercase">
                      CORRIDOR
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      DHAKA → CHATTOGRAM
                    </div>
                    <div className="text-[11px] text-primary font-semibold">
                      WT: 1.85 KG · COLL: ৳1,650
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                {/* Waypoint Route Line */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-1.5">
                    <span>TEJGAON [HUB-01]</span>
                    <span className="text-primary font-semibold">
                      HIGHWAY N1 CORRIDOR
                    </span>
                    <span>AGRABAD [HUB-04]</span>
                  </div>

                  <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 bg-primary rounded-full"
                      initial={{ width: "20%" }}
                      animate={{ width: "52%" }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute top-[-2px] h-3 w-3 rounded-full bg-foreground shadow-md"
                      initial={{ left: "46%" }}
                      animate={{ left: ["46%", "52%", "48%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.8,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>

                {/* Sequential Checkpoints List */}
                <div className="space-y-2 pt-1 font-mono text-xs">
                  {CHECKPOINTS.map((cp) => {
                    const isDone = cp.status === "completed";
                    const isActive = cp.status === "active";
                    return (
                      <div
                        key={cp.name}
                        className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                          isActive
                            ? "border-primary/50 bg-primary/10 text-foreground"
                            : isDone
                              ? "border-border/60 bg-muted/40 text-foreground"
                              : "border-transparent text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isActive
                                ? "bg-primary text-primary-foreground animate-pulse"
                                : isDone
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                  : "border border-border text-muted-foreground"
                            }`}
                          >
                            {isDone ? (
                              <Check className="h-3 w-3" />
                            ) : isActive ? (
                              "●"
                            ) : (
                              "○"
                            )}
                          </div>

                          <div>
                            <div
                              className={`font-bold ${isActive ? "text-primary" : "text-foreground"}`}
                            >
                              {cp.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {cp.location}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={
                              isActive
                                ? "text-primary font-bold"
                                : "text-muted-foreground"
                            }
                          >
                            {cp.time}
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase">
                            {cp.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>

              <CardFooter className="border-t border-border/60 pt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Box className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>BARCODE: 8840291048291</span>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  COURIER: RIDER #1142 (VERIFIED)
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
