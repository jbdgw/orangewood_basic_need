"use client";

import React, { useState } from "react";
import { ShoppingCart, CheckCircle2, Package, Shield, Sparkles, Loader2, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import MagicCard from "@/components/magicui/magic-card";
import BoxReveal from "@/components/magicui/box-reveal";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [qtyError, setQtyError] = useState("");

  const handleQuantityChange = (value: number) => {
    if (value < 1) {
      setQtyError("Quantity must be at least 1");
      setQty(1);
    } else if (value > 100) {
      setQtyError("Maximum 100 kits per order");
      setQty(100);
    } else {
      setQtyError("");
      setQty(value);
    }
  };

  const handleDonate = async () => {
    if (qtyError) return;
    setIsSubmitting(true);
    
    const payload = {
      kitId: selected.id,
      kitName: selected.name,
      unitPrice: selected.price,
      quantity: qty,
      subtotal: (selected.price * qty).toFixed(2),
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Integrate with your checkout platform (Stripe/Shopify/Cart).
    console.log("DONATE:", payload);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <BoxReveal boxColor="#0B4971" duration={0.3} delay={0.1}>
              <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2" style={{backgroundColor: '#F1F1DF'}}>
                <AnimatedShinyText className="text-sm font-semibold uppercase tracking-wide text-black" shimmerWidth={150}>
                  Orangewood Foundation • Community Care
                </AnimatedShinyText>
              </div>
            </BoxReveal>
            
            <BoxReveal boxColor="#0B4971" duration={0.3} delay={0.3}>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Sponsor a Hygiene Kit
              </h1>
            </BoxReveal>
            
            <BoxReveal boxColor="#0B4971" duration={0.3} delay={0.5}>
              <p className="mt-6 text-xl text-black">
                Select a pre‑curated kit below. Your donation is fulfilled by <strong>Doing Good Works</strong> and delivered to
                <strong> Orangewood Foundation</strong> in Santa Ana, CA.
              </p>
            </BoxReveal>
            
            <div className="mt-8 space-y-3 text-base text-black">
              <BoxReveal boxColor="#0B4971" duration={0.25} delay={0.7}>
                <li className="flex items-start gap-3 list-none"><CheckCircle2 className="mt-1 h-5 w-5 text-success" /> Tax‑deductible charitable impact via in‑kind goods</li>
              </BoxReveal>
              <BoxReveal boxColor="#0B4971" duration={0.25} delay={0.85}>
                <li className="flex items-start gap-3 list-none"><CheckCircle2 className="mt-1 h-5 w-5 text-success" /> Corporate‑friendly: invoice, receipt, and reporting available</li>
              </BoxReveal>
              <BoxReveal boxColor="#0B4971" duration={0.25} delay={1.0}>
                <li className="flex items-start gap-3 list-none"><CheckCircle2 className="mt-1 h-5 w-5 text-success" /> Curated from Orangewood's year‑round needs list</li>
              </BoxReveal>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-secondary p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {KITS.map((kit) => {
                const Icon = kit.icon;
                const active = selected.id === kit.id;
                return (
                  <MagicCard
                    key={kit.id}
                    className={classNames(
                      "transition-all duration-200 p-4",
                      active ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                    gradientColor={active ? "#FF9121" : "#0B4971"}
                    gradientOpacity={0.3}
                    onClick={() => setSelected(kit)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={classNames("rounded-lg p-2", active ? "bg-primary text-white" : "bg-gray-100")}> 
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{kit.name}</div>
                          <div className="text-xs text-text-secondary">{kit.tagline}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">${kit.price.toFixed(2)}</div>
                        <div className="text-xs text-text-secondary">{kit.highlight}</div>
                      </div>
                    </div>
                  </MagicCard>
                );
              })}
            </div>

            {/* Summary Card */}
            <div className="mt-6 rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{selected.name}</div>
                  <div className="text-xs text-text-secondary">{selected.description}</div>
                </div>
                <div className="text-2xl font-bold">${(selected.price * qty).toFixed(2)}</div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold">What's inside</h4>
                <div className="mt-2 space-y-2">
                  {selected.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full opacity-60"></div>
                        <span className="text-sm text-foreground">{it.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {typeof it.price === "number" ? (
                          <span className="text-foreground">${it.price.toFixed(2)}</span>
                        ) : (
                          <span className="text-text-secondary italic">included</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor="qty" className="text-sm font-medium">Quantity</label>
                    <input
                      id="qty"
                      type="number"
                      min={1}
                      max={100}
                      step={1}
                      value={qty}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className={classNames(
                        "w-24 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors",
                        qtyError 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:ring-primary"
                      )}
                    />
                  </div>
                  {qtyError && (
                    <span className="text-xs text-red-500">{qtyError}</span>
                  )}
                </div>
                <button
                  onClick={handleDonate}
                  disabled={isSubmitting}
                  className={classNames(
                    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 min-w-[200px]",
                    showSuccess 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-primary hover:bg-primary/90",
                    isSubmitting && "opacity-75 cursor-not-allowed",
                    "hover:shadow-lg"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Thank you!
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5" />
                      <div className="flex flex-col items-center leading-tight">
                        <span className="text-sm font-medium">
                          {qty === 1 ? `Sponsor ${qty} Kit` : `Sponsor ${qty} Kits`}
                        </span>
                        <span className="text-lg font-bold">
                          ${(selected.price * qty).toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-xs text-text-secondary">
                Fulfillment: Orders are <strong>fulfilled by Doing Good Works</strong> and shipped directly to <strong>Orangewood Foundation</strong>. Overlaps between kits are intentional to keep logistics flexible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Impact blurb */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 rounded-3xl border border-border bg-light-cream p-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">Where does my donation go?</h3>
            <p className="mt-2 text-sm text-text-secondary">
              100% of your purchase funds the kit(s) selected here. Doing Good Works purchases the listed products and ships them to Orangewood Foundation for year‑round hygiene needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Can we sponsor as a company?</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Yes—choose a quantity that fits your team size. We can also produce a custom landing page, add your logo, or invoice your finance team.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Need a custom kit?</h3>
            <p className="mt-2 text-sm text-text-secondary">
              We can tailor kits (fragrance‑free, women's/men's, curly‑hair, etc.). Reach out and we'll swap items and update pricing.
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-12 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} Doing Good Works • All purchases fulfilled by Doing Good Works and delivered to Orangewood Foundation.
      </footer>
      </main>
    </div>
  );
}