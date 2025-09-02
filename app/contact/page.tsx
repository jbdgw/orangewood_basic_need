"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from "lucide-react";

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    subject: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full bg-white">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-success mb-6" />
            <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
            <p className="text-lg text-text-secondary mb-6">
              We&apos;ve received your message and will get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Kits
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Have questions about sponsoring hygiene kits or want to learn more about our partnership? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-text-secondary">For donation inquiries and corporate partnerships</p>
                  <a href="mailto:partnerships@doinggoodworks.com" className="text-primary hover:text-primary/80 underline">
                    partnerships@doinggoodworks.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-text-secondary">Monday - Friday, 9AM - 5PM PST</p>
                  <a href="tel:+1-555-HYGIENE" className="text-primary hover:text-primary/80 underline">
                    (555) HYGIENE
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Orangewood Foundation</h3>
                  <p className="text-text-secondary">Kits are delivered to:</p>
                  <p className="text-foreground">
                    1575 E 17th Street<br />
                    Santa Ana, CA 92705
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-light-cream rounded-2xl">
              <h3 className="font-bold mb-2">Corporate Partnerships</h3>
              <p className="text-sm text-text-secondary">
                We offer custom invoicing, branded landing pages, and team volunteer opportunities for corporate sponsors. 
                Contact us to discuss volume pricing and partnership opportunities.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-2">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="general">General Inquiry</option>
                  <option value="corporate">Corporate Partnership</option>
                  <option value="bulk">Bulk Order (25+ kits)</option>
                  <option value="custom">Custom Kit Request</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your needs, questions, or how we can help..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={classNames(
                  "w-full inline-flex items-center justify-center gap-2",
                  isSubmitting && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold mb-4">Quick Questions?</h3>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/#faq" className="text-primary hover:text-primary/80 underline">
              View FAQ Section
            </Link>
            <a href="https://orangewoodfoundation.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">
              About Orangewood Foundation
            </a>
            <a href="https://doinggoodworks.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">
              About Doing Good Works
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}