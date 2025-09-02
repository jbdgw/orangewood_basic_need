"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Package, Shield, Sparkles, Loader2, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import MagicCard from "@/components/magicui/magic-card";

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
      { 
        name: "Colgate Extra Clean Toothbrush", 
        price: 4.44,
        image: "/products/essential_dignity_05_colgate-extra-clean-toothbrush.jpg",
        description: "Full Head Soft Toothbrush with circular power bristles"
      },
      { 
        name: "Amazon Basics Twin Blade Pivoting Disposable Razors", 
        price: 6.39,
        image: "/products/essential_dignity_06_amazon-basics-razors.jpg",
        description: "Twin Blade Pivoting Disposable Razors with Rubber Grip, 32 Count"
      },
      { 
        name: "Degree Men Original Antiperspirant Deodorant", 
        price: 6.96,
        image: "/products/essential_dignity_07_degree-men-antiperspirant.jpg",
        description: "48-hour sweat and odor protection, Cool Rush scent"
      },
      { 
        name: "Dove Beauty Bar Soap Sensitive", 
        price: 12.97,
        image: "/products/essential_dignity_08_dove-beauty-bar-sensitive.jpg",
        description: "¼ moisturizing cream, hypoallergenic, fragrance-free"
      },
      { 
        name: "Garnier Fructis Fortifying 2-in-1 Shampoo", 
        price: 13.98,
        image: "/products/essential_dignity_09_garnier-fructis-2in1-shampoo.jpg",
        description: "Daily Care 2-in-1 Shampoo & Conditioner with Grapefruit"
      },
      { 
        name: "Hefty Slider Jumbo Storage Bags", 
        price: 8.78,
        image: "/products/essential_dignity_10_hefty-slider-storage-bags.jpg",
        description: "2.5 Gallon Storage Bags with MaxLock track, 12 Count"
      },
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
      { name: "Everything in Essential Dignity Kit", price: null, image: null, description: "All 6 items from the Essential Dignity Kit above" },
      { 
        name: "Old Spice Aluminum Free Deodorant", 
        price: 14.51,
        image: "/products/essential_dignity_01_old-spice-aluminum-free-deodorant.jpg",
        description: "High Endurance Aluminum Free with 24/7 sweat defense"
      },
      { 
        name: "Dove Men+Care Bar 3 in 1 Cleanser", 
        price: 12.48,
        image: "/products/essential_dignity_02_dove-men-3in1-bar.jpg",
        description: "3-in-1 Body, Face, and Shave Bar with MICROMOISTURE technology"
      },
      { 
        name: "Dove Nutritive Solutions Moisturizing Conditioner", 
        price: 13.69,
        image: "/products/essential_dignity_03_dove-nutritive-conditioner.jpg",
        description: "Daily Moisture Conditioner with Pro-Moisture Complex"
      },
      { 
        name: "8 Pcs Curved Vented Hair Brush Set", 
        price: 11.99,
        image: "/products/essential_dignity_04_curved-vented-brush-set.jpg",
        description: "Bulk Vent Brushes for detangling with curved design"
      },
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
      { name: "Everything in Everyday Confidence Kit", price: null, image: null, description: "All 10 items from the Everyday Confidence Kit above" },
      { 
        name: "Bed Head Curls‑in‑Check Hair Diffuser Dryer", 
        price: 28.62,
        image: "/products/everyday_confidence_01_bed-head-diffuser-dryer.jpg",
        description: "1875W Hair Diffuser Dryer with ionic technology for curly hair"
      },
      { 
        name: "Cantu Coconut Curling Cream", 
        price: 5.97,
        image: "/products/everyday_confidence_02_cantu-coconut-curling-cream.jpg",
        description: "12oz Coconut Curling Cream with Shea Butter, sulfate-free"
      },
      { 
        name: "CURLSMITH Double Cream Deep Quencher", 
        price: 12.50,
        image: "/products/everyday_confidence_03_curlsmith-deep-quencher.jpg",
        description: "Deep conditioning treatment with Andiroba and Resurrection Flower"
      },
      { 
        name: "DOVE MEN + CARE 2 in 1 Shampoo Conditioner", 
        price: 25.17,
        image: "/products/everyday_confidence_04_dove-men-2in1-shampoo.jpg",
        description: "Fresh & Clean Fortifying 2-in-1 with caffeine and menthol"
      },
      { 
        name: "Suavecito Pomade (Medium Hold)", 
        price: 40.99,
        image: "/products/everyday_confidence_05_suavecito-pomade.jpg",
        description: "Original Hold Water-Based Pomade, medium hold and shine"
      },
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 mb-6" style={{backgroundColor: '#F1F1DF'}}>
            <AnimatedShinyText className="text-sm font-semibold uppercase tracking-wide text-black" shimmerWidth={150}>
              Orangewood Foundation • Community Care
            </AnimatedShinyText>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-primary mb-6">
            Sponsor a Hygiene Kit
          </h1>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Select a pre‑curated kit below. Your donation is fulfilled by <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Doing Good Works</a> and delivered to <a href="https://orangewoodfoundation.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Orangewood Foundation</a> in Santa Ana, CA.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center text-sm text-text-secondary mb-12">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Tax‑deductible</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Corporate‑friendly</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Foundation‑curated</div>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-primary">Choose Your Kit</h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left Side - Kit Selection */}
          <div>
            <div className="space-y-4">
              {KITS.map((kit) => {
                const Icon = kit.icon;
                const active = selected.id === kit.id;
                return (
                  <MagicCard
                    key={kit.id}
                    className={classNames(
                      "transition-all duration-200 p-6",
                      active ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                    gradientColor={active ? "#FF9121" : "#0B4971"}
                    gradientOpacity={0.3}
                    onClick={() => setSelected(kit)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={classNames("rounded-lg p-3 flex-shrink-0", active ? "bg-primary text-white" : "bg-gray-100")}> 
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{kit.name}</h3>
                            <p className="text-text-secondary text-sm mt-1">{kit.tagline}</p>
                            <p className="text-text-secondary text-sm mt-2">{kit.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-primary">${kit.price.toFixed(2)}</div>
                            <div className="text-xs text-text-secondary">{kit.highlight}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                );
              })}
            </div>
          </div>

          {/* Right Side - Selected Kit Details */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-3xl border border-border bg-secondary p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">{selected.name}</h3>
                  <p className="text-sm text-text-secondary">Selected kit</p>
                </div>
                <div className="text-3xl font-bold text-primary">${(selected.price * qty).toFixed(2)}</div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">What&apos;s inside</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selected.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100">
                        {it.image ? (
                          <Image
                            src={it.image}
                            alt={it.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs text-foreground leading-tight">
                          {it.name}
                        </div>
                        <div className="text-sm font-semibold mt-1">
                          {typeof it.price === "number" ? (
                            <span className="text-primary">${it.price.toFixed(2)}</span>
                          ) : (
                            <span className="text-text-secondary italic text-xs">included above</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
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
                      "w-20 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors",
                      qtyError 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-primary"
                    )}
                  />
                  {qtyError && (
                    <span className="text-xs text-red-500">{qtyError}</span>
                  )}
                </div>
                
                <button
                  onClick={handleDonate}
                  disabled={isSubmitting}
                  className={classNames(
                    "w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200",
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
                      <span className="text-lg font-semibold">
                        Donate ${(selected.price * qty).toFixed(2)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-xs text-text-secondary text-center">
                  Orders fulfilled by <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-1">Doing Good Works</a> and delivered to <a href="https://orangewoodfoundation.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-1">Orangewood Foundation</a>
                </p>
              </div>
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
              100% of your purchase funds the kit(s) selected here. <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Doing Good Works</a> purchases the listed products and ships them to <a href="https://orangewoodfoundation.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Orangewood Foundation</a> for year‑round hygiene needs.
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
              We can tailor kits (fragrance‑free, women&apos;s/men&apos;s, curly‑hair, etc.). Reach out and we&apos;ll swap items and update pricing.
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-12 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Doing Good Works</a> • All purchases fulfilled by <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Doing Good Works</a> and delivered to <a href="https://orangewoodfoundation.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">Orangewood Foundation</a>.
      </footer>
      </main>
    </div>
  );
}