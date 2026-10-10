"use client";

import { Building2, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactHubDirectory() {
  const hubs = [
    {
      city: "Dhaka Central Hub",
      type: "National Sorting Complex",
      address: "Plot 14/B, Industrial Area, Tejgaon, Dhaka-1208",
      phone: "+880 1700-112201",
      email: "dhk.hub@parcelpilot.com",
      hours: "24/7 Receiving & Sorting",
    },
    {
      city: "Chattogram Port Hub",
      type: "Maritime & Coastal Depot",
      address: "Commercial Area, Agrabad Access Road, Chattogram-4100",
      phone: "+880 1700-112203",
      email: "ctg.hub@parcelpilot.com",
      hours: "06:00 – 23:00 Daily",
    },
    {
      city: "Sylhet Highlands Hub",
      type: "Northeast Cross-Dock",
      address: "Subidbazar Main Road, Sadar, Sylhet-3100",
      phone: "+880 1700-112204",
      email: "syl.hub@parcelpilot.com",
      hours: "07:00 – 22:00 Daily",
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Building2 className="size-3.5" />
            <span>Physical Reception Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Major Sorting Hub Reception Desks
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Need to drop off high-volume batches in person or speak directly
            with a regional logistics manager? Visit one of our primary regional
            sorting centers.
          </p>
        </div>

        {/* 3 Regional Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {hubs.map((hub) => (
            <div
              key={hub.city}
              className="p-6 rounded-none border border-border bg-card space-y-4 hover:border-primary/40 transition-colors shadow-sm"
            >
              <div className="pb-3 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-bold text-sm font-sans">
                    {hub.city}
                  </h3>
                  <span className="text-[10px] text-primary">{hub.type}</span>
                </div>
                <Building2 className="size-4 text-muted-foreground/50" />
              </div>

              <div className="space-y-2.5 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="size-3.5 text-muted-foreground/60 shrink-0 mt-0.5" />
                  <span className="font-sans text-foreground/90">
                    {hub.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-muted-foreground/60 shrink-0" />
                  <span className="text-foreground">{hub.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-muted-foreground/60 shrink-0" />
                  <a
                    href={`mailto:${hub.email}`}
                    className="text-primary hover:underline"
                  >
                    {hub.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-muted-foreground/60 shrink-0" />
                  <span>{hub.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
