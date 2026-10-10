"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  HelpCircle,
  Package,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
}

const PRESET_PROMPTS = [
  "Track shipment PP-48291",
  "What does 'Return to Sender' mean?",
  "How are COD payouts reconciled?",
  "Calculate Dhaka to Chattogram fare",
];

const BOT_RESPONSES: Record<string, string> = {
  "track shipment pp-48291":
    "Consignment #PP-48291 is currently IN TRANSIT on Highway Corridor N1. Assigned carrier: Express Linehaul TRK-8821. Expected arrival at Agrabad Hub [HUB-04] today around 05:45 PM.",
  "what does 'return to sender' mean?":
    "Return to Sender (RTS) occurs when 3 consecutive delivery attempts fail or the recipient cancels the order. The parcel is returned to the original merchant with zero return charge on qualified tiers.",
  "how are cod payouts reconciled?":
    "Cash on Delivery funds collected by our couriers are audited at the destination hub and transferred directly to your bank account or mobile wallet within 24 hours.",
  "calculate dhaka to chattogram fare":
    "Standard inter-district linehaul for a 1.0 kg parcel between Dhaka and Chattogram is ৳130. Express same-day service adds ৳40. Optional insurance is ৳10.",
};

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Hello! I am ParcelPilot Assistant. Enter a tracking code (e.g. PP-48291) or ask an operational question.",
      time: "Just now",
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulate intelligent domain response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply =
        "Our logistics dispatch network operates across all 64 districts. You can track any parcel by typing its ID or contacting operations manager directly.";

      for (const [key, answer] of Object.entries(BOT_RESPONSES)) {
        if (lower.includes(key) || key.includes(lower)) {
          reply = answer;
          break;
        }
      }

      if (lower.includes("pp-") || lower.includes("track")) {
        reply =
          "Consignment #PP-48291 is currently IN TRANSIT en route to Agrabad Hub. Carrier: Linehaul TRK-8821. Expected arrival: Today, 05:45 PM.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-16 right-0 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-white shadow-xl whitespace-nowrap"
              >
                Ask ParcelPilot
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Open logistics assistant"
            className="flex h-13 w-13 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700/80 text-orange-400 hover:text-white hover:border-orange-500 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            {isOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <div className="relative">
                <Bot className="h-6 w-6 text-orange-400 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Flyout Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden font-mono text-xs"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5 font-sans text-sm">
                    <span>ParcelPilot AI</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 rounded border border-emerald-500/30 font-mono">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    LOGISTICS & TRACKING ASSISTANT
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 border-b border-zinc-800/80 bg-zinc-950 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {PRESET_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 text-[11px] text-zinc-300 whitespace-nowrap transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-orange-600 text-white font-mono rounded-br-none"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none font-mono"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 font-mono">
                    {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about shipment status, fees, or hubs..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
