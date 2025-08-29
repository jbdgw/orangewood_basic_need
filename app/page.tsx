"use client";

import React, { useState } from "react";
import { ShoppingCart, CheckCircle2, Package, Shield, Sparkles } from "lucide-react";

// Tailwind-only. Uses shadcn-style class conventions, but no external imports required.
// Drop this component into a Next.js page (e.g., app/page.tsx) and ensure Tailwind is enabled.
// CTA currently logs to console. Replace with your checkout/donation flow.

const KITS = [
  {
    id: "good",
    name: "Essential Dignity Kit",
    tagline: "Daily hygiene covered. Compact, practical, high-impact.",
    price: 53.52,
    highlight: "Most popular for team bundles",
    icon: Package,
    items: [
      { name: "Colgate Extra Clean Toothbrush", price: 4.44 },
      { name: "Amazon Basics Twin Blade Pivoting Disposable Razors", price: 6.39 },
      { name: "Degree Men Original Antiperspirant Deodorant", price: 6.96 },
      { name: "Dove Beauty Bar Soap Sensitive", price: 12.97 },
      { name: "Garnier Fructis Fortifying 2-in-1 Shampoo", price: 13.98 },
      { name: "Hefty Slider Jumbo Storage Bags", price: 8.78 },
    ],
    description:
      "A no‑frills bundle that restores comfort and dignity for one person for weeks. Easy for teams to sponsor in volume.",
  },
  {
    id: "better",
    name: "Everyday Confidence Kit",
    tagline: "Adds variety and upgrades for broader hair/skin needs.",
    price: 106.19,
    highlight: "Great for departments or small teams",
    icon: Shield,
    items: [
      { name: "Everything in Essential Dignity Kit", price: null },
      { name: "Old Spice Aluminum Free Deodorant", price: 14.51 },
      { name: "Dove Men+Care Bar 3 in 1 Cleanser", price: 12.48 },
      { name: "Dove Nutritive Solutions Moisturizing Conditioner", price: 13.69 },
      { name: "8 Pcs Curved Vented Hair Brush Set", price: 11.99 },
    ],
    description:
      "Upgrades that add choice and comfort while staying budget‑friendly. Ideal for department‑level giving.",
  },
  {
    id: "best",
    name: "Empower & Thrive Kit (Salon+ Care)",
    tagline: "Premium care for confidence, choice, and joy.",
    price: 219.44,
    highlight: "Executive & sponsor favorite",
    icon: Sparkles,
    items: [
      { name: "Everything in Everyday Confidence Kit", price: null },
      { name: "Bed Head Curls‑in‑Check Hair Diffuser Dryer", price: 28.62 },
      { name: "Cantu Coconut Curling Cream", price: 5.97 },
      { name: "CURLSMITH Double Cream Deep Quencher", price: 12.50 },
      { name: "DOVE MEN + CARE 2 in 1 Shampoo Conditioner", price: 25.17 },
      { name: "Suavecito Pomade (Medium Hold)", price: 40.99 },
    ],
    description:
      "A feel‑good, premium kit that brings salon‑level care to those who need it most—perfect for corporate gift‑backs and executive sponsorships.",
  },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DonationStorefront() {
  const [selected, setSelected] = useState(KITS[0]);
  const [qty, setQty] = useState(1);

  const handleDonate = () => {
    const payload = {
      kitId: selected.id,
      kitName: selected.name,
      unitPrice: selected.price,
      quantity: qty,
      subtotal: (selected.price * qty).toFixed(2),
    };
    // TODO: Integrate with your checkout platform (Stripe/Shopify/Cart).
    console.log("DONATE:", payload);
    alert(`Thanks! You selected ${payload.quantity} × ${payload.kitName} (Total: ${payload.subtotal}).`);
  };

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Orangewood Foundation • Community Care
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Sponsor a Hygiene Kit
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Select a pre‑curated kit below. Your donation is fulfilled by <strong>Doing Good Works</strong> and delivered to
              <strong> Orangewood Foundation</strong> in Santa Ana, CA.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Tax‑deductible charitable impact via in‑kind goods</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Corporate‑friendly: invoice, receipt, and reporting available</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Curated from Orangewood's year‑round needs list</li>
            </ul>
          </div>
          <div className="rounded-3xl border bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {KITS.map((kit) => {
                const Icon = kit.icon;
                const active = selected.id === kit.id;
                return (
                  <button
                    key={kit.id}
                    onClick={() => setSelected(kit)}
                    className={classNames(
                      "group relative flex flex-col rounded-2xl border p-5 text-left transition",
                      active ? "border-black shadow-md" : "hover:border-gray-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={classNames("rounded-xl p-2", active ? "bg-black text-white" : "bg-gray-100")}> 
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{kit.name}</div>
                        <div className="text-xs text-gray-500">{kit.tagline}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-2xl font-bold">${kit.price.toFixed(2)}</div>
                    <div className="mt-1 text-xs text-gray-500">{kit.highlight}</div>
                  </button>
                );
              })}
            </div>

            {/* Summary Card */}
            <div className="mt-6 rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{selected.name}</div>
                  <div className="text-xs text-gray-500">{selected.description}</div>
                </div>
                <div className="text-2xl font-bold">${selected.price.toFixed(2)}</div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold">What's inside</h4>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  {selected.items.map((it, idx) => (
                    <li key={idx}>
                      {it.name}
                      {typeof it.price === "number" ? (
                        <span className="text-gray-500"> — ${it.price.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-500"> — included</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="qty" className="text-sm font-medium">Quantity</label>
                  <input
                    id="qty"
                    type="number"
                    min={1}
                    step={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    className="w-24 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <button
                  onClick={handleDonate}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" /> Donate ${ (selected.price * qty).toFixed(2) }
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Fulfillment: Orders are <strong>fulfilled by Doing Good Works</strong> and shipped directly to <strong>Orangewood Foundation</strong>. Overlaps between kits are intentional to keep logistics flexible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Impact blurb */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 rounded-3xl border p-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">Where does my donation go?</h3>
            <p className="mt-2 text-sm text-gray-600">
              100% of your purchase funds the kit(s) selected here. Doing Good Works purchases the listed products and ships them to Orangewood Foundation for year‑round hygiene needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Can we sponsor as a company?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Yes—choose a quantity that fits your team size. We can also produce a custom landing page, add your logo, or invoice your finance team.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Need a custom kit?</h3>
            <p className="mt-2 text-sm text-gray-600">
              We can tailor kits (fragrance‑free, women's/men's, curly‑hair, etc.). Reach out and we'll swap items and update pricing.
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Doing Good Works • All purchases fulfilled by Doing Good Works and delivered to Orangewood Foundation.
      </footer>
    </main>
  );
}