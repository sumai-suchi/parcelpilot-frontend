"use client";

import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Radio,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactDispatchConsole() {
  const [inquiryType, setInquiryType] = useState("merchant");
  const [priority, setPriority] = useState("normal");
  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const generatedId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels & HQ Registry */}
          <div className="lg:col-span-5 space-y-8 font-sans">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-2 uppercase tracking-wider">
                <Radio className="size-3.5" /> Operations Registry
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Central Operations Command
              </h2>
              <p className="mt-2 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Our national control center coordinates linehaul dispatches,
                automated sorting feeds, and last-mile fleet operations
                nationwide.
              </p>
            </div>

            {/* Department Extensions Directory */}
            <div className="border border-border rounded-none bg-card p-6 space-y-5 text-xs font-mono shadow-sm">
              <div className="flex items-start gap-3.5 pb-4 border-b border-border">
                <Building2 className="size-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground text-[10px] block">
                    HEADQUARTERS
                  </span>
                  <strong className="text-foreground block text-xs font-sans">
                    ParcelPilot Tower, Level 8
                  </strong>
                  <span className="text-muted-foreground text-[11px]">
                    Plot 24, Bir Uttam Mir Shawkat Sarak, Gulshan-1, Dhaka-1212
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-4 border-b border-border">
                <Phone className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground text-[10px] block">
                    DIRECT HOTLINE
                  </span>
                  <strong className="text-foreground text-sm font-bold">
                    16789 (Toll-Free Domestic)
                  </strong>
                  <span className="text-muted-foreground text-[11px] block mt-0.5">
                    International: +880 9612-400500
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-4 border-b border-border">
                <Clock className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground text-[10px] block">
                    OPERATING HOURS
                  </span>
                  <span className="text-foreground block">
                    Hub Sorter & Linehaul: <strong>24/7/365 Continuous</strong>
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    Corporate & Merchant Support: 08:00 – 22:00 Daily
                  </span>
                </div>
              </div>

              <div className="pt-1 space-y-3">
                <span className="text-muted-foreground text-[10px] block">
                  DEPARTMENT INBOX ROUTING:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Merchant Contracts:
                    </span>
                    <a
                      href="mailto:merchants@parcelpilot.com"
                      className="text-primary hover:underline"
                    >
                      merchants@parcelpilot.com
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Dispatch Escalations:
                    </span>
                    <a
                      href="mailto:dispatch@parcelpilot.com"
                      className="text-primary hover:underline"
                    >
                      dispatch@parcelpilot.com
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Claims & Insurance:
                    </span>
                    <a
                      href="mailto:claims@parcelpilot.com"
                      className="text-primary hover:underline"
                    >
                      claims@parcelpilot.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-none bg-muted/30 border border-border flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                All inbound transmission tickets logged with cryptographic
                dispatch timestamps.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Ticket Submission Console */}
          <div className="lg:col-span-7 bg-card border border-border rounded-none p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-5 font-mono">
                <div className="size-14 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase">
                    TRANSMISSION RECEIVED
                  </span>
                  <h3 className="text-2xl font-bold text-foreground font-sans">
                    Dispatch Ticket Created
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-none bg-muted border border-border text-primary text-sm font-bold">
                    {ticketId}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, {name}. Your ticket has been assigned to a central
                  operations coordinator. Our team will review your inquiry and
                  follow up via email ({email}) within our designated SLA.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                    setWaybill("");
                  }}
                  variant="outline"
                  className="rounded-none font-mono text-xs uppercase tracking-wider border-border bg-card hover:bg-muted text-foreground"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      1. Inquiry Department
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      SELECT CLASSIFICATION
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "merchant", label: "Merchant Rates" },
                      { id: "tracking", label: "Parcel Escalation" },
                      { id: "claim", label: "Insurance Claim" },
                      { id: "general", label: "General Support" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setInquiryType(t.id)}
                        className={`p-2.5 rounded-none border text-xs font-mono text-center transition-all ${
                          inquiryType === t.id
                            ? "border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary/40"
                            : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Selector */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-2">
                    2. Urgency Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        id: "normal",
                        label: "Routine (24h SLA)",
                        color: "text-foreground",
                      },
                      {
                        id: "urgent",
                        label: "Urgent (4h SLA)",
                        color: "text-amber-600 dark:text-amber-400",
                      },
                      {
                        id: "critical",
                        label: "Critical Linehaul (&lt; 1h)",
                        color: "text-red-600 dark:text-red-400",
                      },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        className={`p-2 rounded-none border text-xs font-mono transition-all ${
                          priority === p.id
                            ? "border-primary/50 bg-primary/5 font-bold " +
                              p.color
                            : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-border/80"
                        }`}
                        dangerouslySetInnerHTML={{ __html: p.label }}
                      />
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asif Mahmud"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-border rounded-none px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="asif@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded-none px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1700-000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded-none px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      WAYBILL NUMBER (IF APPLICABLE)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. PP-9482910"
                      value={waybill}
                      onChange={(e) => setWaybill(e.target.value)}
                      className="w-full bg-background border border-border rounded-none px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                    DETAILED MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your parcel issue, estimated monthly volume, or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border border-border rounded-none px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider h-12 shadow-sm"
                >
                  <Send className="mr-2 size-4" /> Transmit Ticket to Dispatch
                  Control
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
