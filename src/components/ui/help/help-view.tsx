"use client";

import { useState } from "react";
import HelpHero from "@/components/ui/help/help-hero";
import HelpFaqAccordion from "@/components/ui/help/help-faq-accordion";
import HelpEscalationConsole from "@/components/ui/help/help-escalation-console";

export default function HelpView() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <>
      <HelpHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectTag={handleSelectTag}
      />
      <HelpFaqAccordion searchQuery={searchQuery} />
      <HelpEscalationConsole />
    </>
  );
}
