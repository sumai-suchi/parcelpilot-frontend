"use client";

import { useState } from "react";
import { Building2, MapPin, Clock, Phone, Search, Truck } from "lucide-react";

interface HubData {
  id: string;
  code: string;
  name: string;
  division: string;
  district: string;
  address: string;
  phone: string;
  role: string;
  dailyCapacity: string;
  currentLoad: number; // percentage
  inboundCutoff: string;
  outboundLinehaul: string;
  connectedCorridors: string[];
}

const HUBS: HubData[] = [
  {
    id: "dhk-central",
    code: "HUB-DHK-01",
    name: "Tejgaon Central Mega Sorting Facility",
    division: "Dhaka",
    district: "Dhaka Metro",
    address: "Plot 14/B, Industrial Area, Tejgaon, Dhaka-1208",
    phone: "+880 1700-112201",
    role: "National Gateway & Primary High-Speed Sorter",
    dailyCapacity: "85,000 Parcels / Day",
    currentLoad: 78,
    inboundCutoff: "19:00 Daily",
    outboundLinehaul: "22:00 Nightly",
    connectedCorridors: [
      "Chattogram Express",
      "Sylhet Eastern",
      "North Bengal Trunk",
      "Southwest Feeder",
    ],
  },
  {
    id: "dhk-uttara",
    code: "HUB-DHK-02",
    name: "Uttara North Air-Cargo Feeder Hub",
    division: "Dhaka",
    district: "Dhaka Metro",
    address: "Sector 3, Jasimuddin Avenue, Uttara, Dhaka-1230",
    phone: "+880 1700-112202",
    role: "Airport Transit & Northern Suburb Dispatch",
    dailyCapacity: "35,000 Parcels / Day",
    currentLoad: 62,
    inboundCutoff: "18:30 Daily",
    outboundLinehaul: "21:30 Nightly",
    connectedCorridors: ["Mymensingh Corridor", "Gazipur Industrial Arterial"],
  },
  {
    id: "ctg-port",
    code: "HUB-CTG-01",
    name: "Agrabad Commercial Maritime Hub",
    division: "Chattogram",
    district: "Chattogram",
    address: "Commercial Area, Agrabad Access Road, Chattogram-4100",
    phone: "+880 1700-112203",
    role: "Regional Consolidation & Export Container Link",
    dailyCapacity: "55,000 Parcels / Day",
    currentLoad: 84,
    inboundCutoff: "18:00 Daily",
    outboundLinehaul: "22:30 Nightly",
    connectedCorridors: [
      "Dhaka-Chattogram Highway",
      "Cox's Bazar Coastal Spur",
    ],
  },
  {
    id: "syl-east",
    code: "HUB-SYL-01",
    name: "Sylhet Eastern Highlands Sorting Depot",
    division: "Sylhet",
    district: "Sylhet",
    address: "Subidbazar Main Road, Sylhet-3100",
    phone: "+880 1700-112204",
    role: "Northeast Regional Cross-Dock & Tea Belt Distribution",
    dailyCapacity: "28,000 Parcels / Day",
    currentLoad: 55,
    inboundCutoff: "17:30 Daily",
    outboundLinehaul: "21:00 Nightly",
    connectedCorridors: ["Brahmanbaria-Dhaka Linehaul", "Moulvibazar Feeder"],
  },
  {
    id: "raj-north",
    code: "HUB-RAJ-01",
    name: "Rajshahi Silk City Primary Hub",
    division: "Rajshahi",
    district: "Rajshahi",
    address: "Station Road, Boalia, Rajshahi-6000",
    phone: "+880 1700-112205",
    role: "Northwestern Linehaul Transfer & Agricultural Cargo",
    dailyCapacity: "30,000 Parcels / Day",
    currentLoad: 49,
    inboundCutoff: "17:00 Daily",
    outboundLinehaul: "20:45 Nightly",
    connectedCorridors: ["Bogra Interchange", "Pabna-Dhaka Arterial"],
  },
  {
    id: "khu-south",
    code: "HUB-KHU-01",
    name: "Khulna Rupsha Logistics Terminal",
    division: "Khulna",
    district: "Khulna",
    address: "Rupsha Industrial Belt, Khulna-9100",
    phone: "+880 1700-112206",
    role: "Southwest Coastal Gateway & Port Mongla Feeder",
    dailyCapacity: "32,000 Parcels / Day",
    currentLoad: 58,
    inboundCutoff: "17:30 Daily",
    outboundLinehaul: "21:15 Nightly",
    connectedCorridors: ["Padma Bridge Linehaul", "Jessore Border Feeder"],
  },
  {
    id: "bar-coastal",
    code: "HUB-BAR-01",
    name: "Barishal Kirtankhola Delta Depot",
    division: "Barishal",
    district: "Barishal",
    address: "Band Road, Sadar, Barishal-8200",
    phone: "+880 1700-112207",
    role: "Southern Riverine & Coastal District Routing",
    dailyCapacity: "18,000 Parcels / Day",
    currentLoad: 42,
    inboundCutoff: "16:30 Daily",
    outboundLinehaul: "20:00 Nightly",
    connectedCorridors: ["Padma Express Expressway", "Patuakhali Spur"],
  },
  {
    id: "rng-frontier",
    code: "HUB-RNG-01",
    name: "Rangpur Frontier Linehaul Center",
    division: "Rangpur",
    district: "Rangpur",
    address: "Medical East Gate Road, Rangpur-5400",
    phone: "+880 1700-112208",
    role: "Far North Cross-Border & Teesta Corridor Hub",
    dailyCapacity: "22,000 Parcels / Day",
    currentLoad: 60,
    inboundCutoff: "16:45 Daily",
    outboundLinehaul: "20:30 Nightly",
    connectedCorridors: ["Dinajpur Feeder", "Bogra-Dhaka Trunk"],
  },
];

const DIVISIONS = [
  "All Divisions",
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
];

export default function CoverageHubExplorer() {
  const [selectedDivision, setSelectedDivision] = useState("All Divisions");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHubId, setActiveHubId] = useState<string>("dhk-central");

  const filteredHubs = HUBS.filter((h) => {
    const matchesDivision =
      selectedDivision === "All Divisions" ||
      h.division.toLowerCase() === selectedDivision.toLowerCase();
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  const selectedHub =
    HUBS.find((h) => h.id === activeHubId) || filteredHubs[0] || HUBS[0];

  return (
    <section
      id="hub-directory"
      className="py-20 bg-background text-foreground border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3 uppercase tracking-wider">
            <Building2 className="size-3.5" />
            <span>Interactive Node Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Sorting Hubs & Dispatch Stations
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Select any regional facility to inspect its operational role, daily
            automated sortation volume, dispatch cut-off hours, and connected
            highway linehauls.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8">
          {/* Division Pill Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {DIVISIONS.map((div) => (
              <button
                key={div}
                type="button"
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1.5 rounded-none text-xs font-mono font-medium transition-all ${
                  selectedDivision === div
                    ? "bg-primary text-primary-foreground shadow-sm font-bold"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by city, code, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-none text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Interactive Split Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filtered Hub Nodes List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredHubs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground font-mono text-xs border border-border rounded-none bg-card">
                No hub found matching "{searchQuery}" in {selectedDivision}.
              </div>
            ) : (
              filteredHubs.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setActiveHubId(hub.id)}
                    className={`w-full text-left p-4 rounded-none border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30"
                        : "border-border bg-card hover:bg-muted/30 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
                      <span className="font-bold text-primary">{hub.code}</span>
                      <span className="px-1.5 py-0.5 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                        ACTIVE
                      </span>
                    </div>
                    <div className="font-bold text-foreground text-sm line-clamp-1">
                      {hub.name}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1 flex items-center gap-1 font-mono">
                      <MapPin className="size-3 text-muted-foreground shrink-0" />
                      <span>
                        {hub.district}, {hub.division}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Active Hub Telemetry Inspector Console */}
          <div className="lg:col-span-7 bg-card text-card-foreground border border-border rounded-none p-6 sm:p-8 shadow-sm relative font-mono text-xs">
            <div className="flex items-center justify-between pb-5 border-b border-border">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">
                  INSPECTING FACILITY
                </span>
                <span className="text-lg font-bold text-foreground font-sans">
                  {selectedHub.name}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-none bg-primary/10 text-primary border border-primary/30 font-bold">
                {selectedHub.code}
              </span>
            </div>

            {/* Strategic Role Banner */}
            <div className="py-4 border-b border-border">
              <span className="text-muted-foreground text-[10px] block mb-1">
                STRATEGIC ROLE
              </span>
              <p className="text-foreground text-sm font-sans">
                {selectedHub.role}
              </p>
            </div>

            {/* Live Load Capacity Indicator */}
            <div className="py-4 border-b border-border space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">
                  Current Sorting Load vs Capacity
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {selectedHub.currentLoad}% Utilization
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-none overflow-hidden border border-border">
                <div
                  className="h-full bg-primary rounded-none transition-all duration-500"
                  style={{ width: `${selectedHub.currentLoad}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0 Parcels</span>
                <span>Max: {selectedHub.dailyCapacity}</span>
              </div>
            </div>

            {/* Critical Operating Windows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-border">
              <div className="p-3.5 rounded-none bg-muted/40 border border-border">
                <span className="text-muted-foreground text-[10px] block flex items-center gap-1.5">
                  <Clock className="size-3 text-primary" /> INBOUND MERCHANT
                  CUTOFF
                </span>
                <span className="text-sm font-bold text-foreground block mt-1">
                  {selectedHub.inboundCutoff}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Parcels received after this move to next day
                </span>
              </div>

              <div className="p-3.5 rounded-none bg-muted/40 border border-border">
                <span className="text-muted-foreground text-[10px] block flex items-center gap-1.5">
                  <Truck className="size-3 text-amber-600 dark:text-amber-400" />{" "}
                  NIGHTLY LINEHAUL DEPARTURE
                </span>
                <span className="text-sm font-bold text-foreground block mt-1">
                  {selectedHub.outboundLinehaul}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Inter-district trucking convoy dispatch
                </span>
              </div>
            </div>

            {/* Address & Hotline */}
            <div className="py-4 border-b border-border space-y-2">
              <div>
                <span className="text-muted-foreground text-[10px] block">
                  GROUND RECEPTION ADDRESS
                </span>
                <span className="text-foreground font-sans text-xs">
                  {selectedHub.address}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-muted-foreground">
                <Phone className="size-3 text-primary" />
                <span>
                  Station Hotline:{" "}
                  <strong className="text-foreground">
                    {selectedHub.phone}
                  </strong>
                </span>
              </div>
            </div>

            {/* Connected Corridors */}
            <div className="pt-4">
              <span className="text-muted-foreground text-[10px] block mb-2">
                CONNECTED LOGISTICS ARTERIALS
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedHub.connectedCorridors.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-none bg-muted/40 border border-border text-foreground text-[11px]"
                  >
                    ↳ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
