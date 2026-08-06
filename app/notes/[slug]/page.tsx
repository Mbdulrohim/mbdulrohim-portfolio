import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notes, noteBySlug } from "@/lib/notes";
import { NoteLayout } from "@/components/note-layout";

// Bodies are imported statically so the bundler can see every note at build
// time. A dynamic import by slug would defeat static export.
import NegotiationFloorPricing from "@/content/notes/negotiation-floor-pricing.mdx";
import GroundingAiInAProductCatalogue from "@/content/notes/grounding-ai-in-a-product-catalogue.mdx";
import ImeiSerialUnitLevelInventory from "@/content/notes/imei-serial-unit-level-inventory.mdx";
import WhatsappReceipts from "@/content/notes/whatsapp-receipts.mdx";
import NativeAndroidIosSharedBackend from "@/content/notes/native-android-ios-shared-backend.mdx";
import QualifyingASolarCustomer from "@/content/notes/qualifying-a-solar-customer.mdx";
import WhatElseShipsWithAMobileApp from "@/content/notes/what-else-ships-with-a-mobile-app.mdx";
import AiNativeHardwareDesign from "@/content/notes/ai-native-hardware-design.mdx";

const bodies: Record<string, ComponentType> = {
  "negotiation-floor-pricing": NegotiationFloorPricing,
  "grounding-ai-in-a-product-catalogue": GroundingAiInAProductCatalogue,
  "imei-serial-unit-level-inventory": ImeiSerialUnitLevelInventory,
  "whatsapp-receipts": WhatsappReceipts,
  "native-android-ios-shared-backend": NativeAndroidIosSharedBackend,
  "qualifying-a-solar-customer": QualifyingASolarCustomer,
  "what-else-ships-with-a-mobile-app": WhatElseShipsWithAMobileApp,
  "ai-native-hardware-design": AiNativeHardwareDesign,
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    keywords: note.tags,
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      url: `/notes/${note.slug}`,
      publishedTime: note.published,
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.summary,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Body = bodies[slug];

  return (
    <NoteLayout slug={slug}>
      <Body />
    </NoteLayout>
  );
}
