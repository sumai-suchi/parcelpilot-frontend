"use client";

import Link from "next/link";
import { Radio } from "lucide-react";

export default function SystemFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-mono font-bold text-base">
              <span className="h-6 w-6 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-black">
                PP
              </span>
              <span>PARCELPILOT</span>
            </div>
            <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
              Intelligent courier and logistics management platform orchestrating end-to-end 
              shipment lifecycle, multi-hub sorting, and automated financial settlements.
            </p>

            {/* System Status Element */}
            <div className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/90 px-3 py-1 font-mono text-[11px] text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
              PRODUCT
            </div>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="#tracking-cockpit" className="hover:text-orange-400 transition-colors">
                  Tracking Cockpit
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors">
                  Merchant Portal
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors">
                  Courier Fleet App
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors">
                  Hub Management
                </Link>
              </li>
            </ul>
          </div>

          {/* For Roles Links */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
              ROLES
            </div>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="/customer" className="hover:text-orange-400 transition-colors">
                  For Customers
                </Link>
              </li>
              <li>
                <Link href="/courior" className="hover:text-orange-400 transition-colors">
                  For Couriers
                </Link>
              </li>
              <li>
                <Link href="/hub_manager" className="hover:text-orange-400 transition-colors">
                  For Hub Managers
                </Link>
              </li>
              <li>
                <Link href="/operation_manager" className="hover:text-orange-400 transition-colors">
                  For Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
              COMPANY
            </div>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                  About ParcelPilot
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-400 transition-colors">
                  Security & Audit
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-orange-400 transition-colors">
                  Contact Dispatch
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
          <div>
            © {new Date().getFullYear()} ParcelPilot Logistics Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>VERSION 2.4.0-PROD</span>
            <span>ENCRYPTED WAYBILL PROTOCOL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
