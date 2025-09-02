# API Integration Guide - Basic Need Kit

## 🎯 Current State

The application currently uses **mock API calls** with simulated delays. This document outlines the planned API integration for production checkout and fulfillment.

### Mock Implementation
```typescript
// Current donation handler (app/page.tsx)
const handleDonate = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const payload = {
    kitId: selected.id,
    kitName: selected.name,
    unitPrice: selected.price,
    quantity: qty,
    subtotal: (selected.price * qty).toFixed(2),
  };
  
  console.log("DONATE:", payload); // Replace with real API call
};
```

---

## 🔌 Planned API Integrations

### 1. Payment Processing (Stripe)

#### Setup
```bash
npm install stripe @stripe/stripe-js
```

#### Environment Variables
```env
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Client-Side Integration
```typescript
// utils/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const createPaymentIntent = async (amount: number, kitData: any) => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, kitData }),
  });
  
  return response.json();
};
```

#### Server-Side API Route
```typescript
// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, kitData } = await req.json();
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        kitId: kitData.kitId,
        kitName: kitData.kitName,
        quantity: kitData.quantity.toString(),
        beneficiary: 'Orangewood Foundation',
      },
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment intent creation failed' },
      { status: 500 }
    );
  }
}
```

---

### 2. Order Fulfillment (Doing Good Works)

#### Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Send order to Doing Good Works
      await sendOrderToFulfillment({
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        kitData: paymentIntent.metadata,
        customerEmail: paymentIntent.receipt_email,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
}

async function sendOrderToFulfillment(orderData: any) {
  // Integration with Doing Good Works API
  const response = await fetch('https://api.doinggoodworks.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DGW_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient: {
        organization: 'Orangewood Foundation',
        address: {
          street: '1575 E 17th St',
          city: 'Santa Ana',
          state: 'CA',
          zip: '92705',
        },
      },
      items: await getKitItems(orderData.kitData.kitId),
      quantity: parseInt(orderData.kitData.quantity),
      donorInfo: {
        email: orderData.customerEmail,
        amount: orderData.amount,
      },
    }),
  });
  
  return response.json();
}
```

---

### 3. Contact Form API

#### Form Submission Handler
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send email notification
    await sendNotificationEmail(formData);
    
    // Optional: Save to database
    // await saveContactSubmission(formData);
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Form submission failed' },
      { status: 500 }
    );
  }
}
```

---

## 📧 Email Integration

### Email Service Setup (Resend/SendGrid)
```typescript
// utils/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotificationEmail(formData: any) {
  await resend.emails.send({
    from: 'noreply@basicneedkit.org',
    to: 'contact@orangewoodfoundation.org',
    subject: `New Contact Form: ${formData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Organization:</strong> ${formData.organization || 'N/A'}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `,
  });
}

export async function sendDonationConfirmation(orderData: any) {
  await resend.emails.send({
    from: 'donations@basicneedkit.org',
    to: orderData.customerEmail,
    subject: 'Thank you for your hygiene kit donation!',
    html: `
      <h2>Donation Confirmation</h2>
      <p>Thank you for sponsoring ${orderData.quantity} ${orderData.kitName}(s)!</p>
      <p><strong>Total:</strong> $${orderData.amount}</p>
      <p>Your kits will be fulfilled by Doing Good Works and delivered to Orangewood Foundation.</p>
      <p>Tax receipt: ${orderData.paymentId}</p>
    `,
  });
}
```

---

## 🗄️ Database Integration (Optional)

### Schema Design (Prisma)
```prisma
// prisma/schema.prisma
model Donation {
  id            String   @id @default(cuid())
  createdAt     DateTime @default(now())
  
  // Payment info
  stripePaymentId String @unique
  amount          Float
  
  // Kit info
  kitId           String
  kitName         String
  quantity        Int
  
  // Donor info (optional)
  donorEmail      String?
  donorName       String?
  
  // Fulfillment status
  status          DonationStatus @default(PENDING)
  fulfilledAt     DateTime?
  
  @@map("donations")
}

enum DonationStatus {
  PENDING
  PROCESSING
  FULFILLED
  FAILED
}

model ContactSubmission {
  id           String   @id @default(cuid())
  createdAt    DateTime @default(now())
  
  name         String
  email        String
  organization String?
  subject      String
  message      String
  
  status       ContactStatus @default(UNREAD)
  
  @@map("contact_submissions")
}
```

---

## 🔐 Security Considerations

### Environment Variables
```env
# Production environment variables
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DGW_API_KEY=...
RESEND_API_KEY=...
DATABASE_URL=...
```

### Rate Limiting
```typescript
// utils/rateLimit.ts
import { NextRequest } from 'next/server';

const attempts = new Map();

export function rateLimit(req: NextRequest, limit = 5) {
  const ip = req.ip || 'anonymous';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  
  if (!attempts.has(ip)) {
    attempts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  const current = attempts.get(ip);
  
  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
    return true;
  }
  
  if (current.count >= limit) {
    return false;
  }
  
  current.count++;
  return true;
}
```

---

## 📊 Analytics Integration

### Google Analytics 4
```typescript
// utils/analytics.ts
export const trackDonation = (donationData: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: donationData.paymentId,
      value: donationData.amount,
      currency: 'USD',
      items: [{
        item_id: donationData.kitId,
        item_name: donationData.kitName,
        category: 'Hygiene Kit',
        quantity: donationData.quantity,
        price: donationData.amount / donationData.quantity,
      }],
    });
  }
};

export const trackContactForm = (formData: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_id: 'contact_form',
      form_name: 'Contact Us',
    });
  }
};
```

---

## 🧪 Testing API Endpoints

### Test Scripts
```typescript
// scripts/test-api.ts
async function testDonationFlow() {
  // Test payment intent creation
  const paymentIntent = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 53.52,
      kitData: {
        kitId: 'good',
        kitName: 'Essential Dignity Kit',
        quantity: 1,
      },
    }),
  });
  
  console.log('Payment Intent:', await paymentIntent.json());
}

async function testContactForm() {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'general',
      message: 'Test message',
    }),
  });
  
  console.log('Contact Form:', await response.json());
}
```

---

## 🚀 Deployment Considerations

### API Route Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
}
```

---

*For complete implementation, coordinate with payment processor and fulfillment partner APIs*