# Component Documentation - Basic Need Kit

## 📁 Project Architecture

### Directory Structure
```
basicneedkit/
├── app/                           # Next.js App Router
│   ├── contact/                   # Contact page route
│   │   └── page.tsx              # Contact form component
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout wrapper
│   └── page.tsx                  # Main donation storefront
├── components/                    # Reusable UI components
│   ├── magicui/                  # Custom animated components
│   │   ├── animated-shiny-text.tsx
│   │   ├── box-reveal.tsx
│   │   └── magic-card.tsx
│   ├── ui/                       # Base UI components
│   └── Header.tsx                # Global site header
├── public/                       # Static assets
│   ├── products/                 # Product images
│   └── [other static files]
└── [config files]               # Next.js, Tailwind, etc.
```

---

## 🎨 Design System Components

### Color System (globals.css)
```css
:root {
  --primary: 199 91% 25%;           /* #0B4971 - Orangewood blue */
  --primary-foreground: 0 0% 100%;  /* White text on blue */
  --secondary: 56 33% 98%;          /* #F9F9F1 - Cream background */
  --accent-orange: 31 100% 56%;     /* #FF9121 - Orange accent */
  --success: 100 30% 74%;           /* #AAD3A1 - Success green */
  --text-secondary: 213 18% 50%;    /* #6B7280 - Secondary text */
  --light-cream: 57 33% 94%;        /* #F1F1DF - Light cream */
}
```

### Typography Scale
- **Primary**: Inter font family (Google Fonts)
- **H1**: 4xl-6xl font-bold (responsive)
- **H2**: xl-2xl font-bold
- **Body**: base text with relaxed line-height
- **Small**: sm text for captions

---

## 📋 Page Components

### Main Page (`app/page.tsx`)
**Purpose**: Primary donation storefront interface

#### Key Features
- Kit selection with interactive cards
- Dynamic pricing calculation
- Quantity validation (1-100)
- Responsive grid layout
- Success/error states

#### State Management
```typescript
const [selected, setSelected] = useState(KITS[0]);
const [qty, setQty] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [qtyError, setQtyError] = useState("");
```

#### Kit Data Structure
```typescript
interface Kit {
  id: string;
  name: string;
  tagline: string;
  price: number;
  highlight: string;
  icon: LucideIcon;
  items: KitItem[];
  description: string;
}
```

### Contact Page (`app/contact/page.tsx`)
**Purpose**: Contact form for inquiries and support

#### Features
- Multi-field contact form
- Organization field for corporate inquiries
- Subject selection dropdown
- Form validation and submission
- Success state with reset option

#### Form State
```typescript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  organization: "",
  message: "",
  subject: "general"
});
```

---

## 🎭 UI Components

### Header Component (`components/Header.tsx`)
**Purpose**: Global site navigation and branding

#### Features
- Orangewood Foundation branding
- Navigation to contact page
- Responsive design
- Consistent across all pages

### MagicUI Components

#### AnimatedShinyText (`components/magicui/animated-shiny-text.tsx`)
**Purpose**: Eye-catching animated text with shimmer effect

```typescript
interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}
```

**Usage**: Brand taglines, call-to-action text
**Animation**: CSS-based shimmer effect with configurable width

#### MagicCard (`components/magicui/magic-card.tsx`)
**Purpose**: Interactive cards with hover effects and gradients

```typescript
interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}
```

**Features**:
- Mouse-following gradient effect
- Customizable colors and opacity
- Smooth hover transitions
- Click handling for selection

#### BoxReveal (`components/magicui/box-reveal.tsx`)
**Purpose**: Animated content reveal with sliding overlay

```typescript
interface BoxRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
}
```

**Animation**: Sliding overlay reveal effect using Framer Motion

---

## 🎯 Business Logic Components

### Kit Selection Logic
```typescript
// Kit selection handler
const handleKitSelection = (kit: Kit) => {
  setSelected(kit);
  // Reset quantity on kit change
  setQty(1);
  setQtyError("");
};
```

### Quantity Validation
```typescript
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
```

### Donation Processing
```typescript
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
  console.log("DONATE:", payload);
  
  // Update UI states
  setIsSubmitting(false);
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 3000);
};
```

---

## 🎨 Styling Architecture

### Tailwind CSS Classes
**Primary Patterns**:
```css
/* Card styling */
.magic-card {
  @apply transition-all duration-200 p-6 rounded-3xl border;
}

/* Button variants */
.btn-primary {
  @apply bg-primary text-white hover:bg-primary/90 transition-colors;
}

/* Text hierarchy */
.text-primary-header {
  @apply text-4xl font-bold text-primary;
}
```

### Custom CSS Variables
All colors use HSL values for better manipulation:
```css
/* Used in components */
background: hsl(var(--background));
color: hsl(var(--foreground));
border-color: hsl(var(--border));
```

### Responsive Design Patterns
```css
/* Mobile-first approach */
.grid-responsive {
  @apply grid gap-8 lg:grid-cols-2 lg:items-start;
}

.text-responsive {
  @apply text-4xl md:text-5xl lg:text-6xl;
}
```

---

## 🔧 Component Integration

### Image Handling
```typescript
// Product image with fallback
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
```

### Icon Usage (Lucide React)
```typescript
import { 
  Package, 
  Shield, 
  Sparkles, 
  CheckCircle2,
  Heart,
  Loader2 
} from "lucide-react";

// Dynamic icon rendering
const Icon = kit.icon;
<Icon className="h-6 w-6" />
```

---

## 🧪 Component Testing Considerations

### Key Test Cases

#### Kit Selection
- [ ] Default kit loads correctly
- [ ] Kit switching updates pricing
- [ ] Selected kit highlights properly
- [ ] Kit data renders completely

#### Quantity Validation
- [ ] Minimum quantity enforced (1)
- [ ] Maximum quantity enforced (100)
- [ ] Error messages display correctly
- [ ] Valid quantities accepted

#### Form Handling
- [ ] Contact form validates required fields
- [ ] Success states display properly
- [ ] Error handling works correctly
- [ ] Form resets after submission

#### Responsive Design
- [ ] Mobile layout functions properly
- [ ] Tablet breakpoints work correctly
- [ ] Desktop layout is optimal
- [ ] Images scale appropriately

---

## 🚀 Performance Optimizations

### Image Optimization
- Next.js automatic image optimization
- Lazy loading for product images
- WebP format conversion when possible
- Responsive image sizing

### Code Splitting
- Route-based splitting (automatic)
- Dynamic imports for heavy components
- Tree shaking for unused exports

### Bundle Analysis
```bash
# Check bundle composition
npm run build

# Large dependencies to monitor:
# - Framer Motion: ~50KB
# - Lucide React: ~30KB (tree-shaken)
# - React/Next.js: ~120KB base
```

---

## 🎯 Future Component Enhancements

### Potential Additions
1. **PaymentModal**: Stripe/payment integration
2. **ProductGallery**: Expanded image viewing
3. **ProgressTracker**: Multi-step donation flow
4. **ImpactDisplay**: Real-time donation statistics
5. **TestimonialCarousel**: Rotating success stories

### Accessibility Improvements
- Keyboard navigation for all interactive elements
- Screen reader optimization
- High contrast mode support
- Focus indicator improvements

---

*For deployment information, see DEPLOYMENT.md | For brand guidelines, see ORANGEWOOD_STYLE_GUIDE.md*