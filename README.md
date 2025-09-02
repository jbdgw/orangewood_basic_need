# Basic Need Kit - Hygiene Kit Donation Platform

A Next.js donation platform for sponsoring hygiene kits for the Orangewood Foundation in Santa Ana, CA. This corporate-friendly charitable giving storefront allows individuals and organizations to purchase pre-curated hygiene kits for young people experiencing homelessness and foster care transitions.

## 🎯 Project Overview

**Basic Need Kit** enables easy donation of essential hygiene items through three carefully curated kit tiers:

- **Essential Dignity Kit** ($53.52) - Basic hygiene essentials for one person
- **Everyday Confidence Kit** ($106.19) - Enhanced kit with variety and upgrades  
- **Empower & Thrive Kit** ($219.44) - Premium salon-level care products

All orders are fulfilled by [Doing Good Works](https://doinggoodworks.com) and delivered to [Orangewood Foundation](https://orangewoodfoundation.org).

## 🚀 Live Demo

**Production Site**: https://basicneedkit-q00mw5aho-jordans-projects-608b7fba.vercel.app

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.2 with React 19
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: 
  - Framer Motion for animations
  - Lucide React for icons
  - Custom MagicUI components (Magic Cards, Animated Text, Box Reveals)
- **Build Tools**: Turbopack for fast development
- **Deployment**: Vercel
- **Language**: TypeScript

## 📁 Project Structure

```
basicneedkit/
├── app/                    # Next.js app router
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main donation storefront
├── components/            # Reusable components
│   ├── magicui/          # Custom UI components
│   │   ├── animated-shiny-text.tsx
│   │   ├── box-reveal.tsx
│   │   └── magic-card.tsx
│   ├── ui/               # Base UI components
│   └── Header.tsx        # Site header
├── public/               # Static assets
│   └── products/         # Product images
├── product_images/       # Product catalog documentation
└── docs/                 # Documentation files
```

## 🎨 Design System

The application follows the **Orangewood Foundation Brand Guidelines**:

### Colors
- **Primary Blue**: `#0B4971` - Headers, navigation, professional elements
- **Orange Accent**: `#FF9121` - CTAs, highlights, interactive elements  
- **Cream Backgrounds**: `#F9F9F1` - Section backgrounds, subtle contrast
- **Text Colors**: `#282828` (primary), `#6B7280` (secondary)

### Typography  
- **Primary Font**: Inter (Google Fonts)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast ratios, semantic HTML

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jbdgw/orangewood_basic_need.git
   cd basicneedkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack  
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 📦 Kit Contents & Pricing

### Essential Dignity Kit ($53.52)
- Colgate Extra Clean Toothbrush ($4.44)
- Amazon Basics Twin Blade Razors ($6.39)  
- Degree Men Antiperspirant ($6.96)
- Dove Beauty Bar Sensitive ($12.97)
- Garnier Fructis 2-in-1 Shampoo ($13.98)
- Hefty Slider Storage Bags ($8.78)

### Everyday Confidence Kit ($106.19)
- Everything in Essential Dignity Kit
- Old Spice Aluminum Free Deodorant ($14.51)
- Dove Men+Care 3-in-1 Bar ($12.48)
- Dove Nutritive Conditioner ($13.69)
- Curved Vented Hair Brush Set ($11.99)

### Empower & Thrive Kit ($219.44)
- Everything in Everyday Confidence Kit
- Bed Head Hair Diffuser Dryer ($28.62)
- Cantu Coconut Curling Cream ($5.97)
- CURLSMITH Deep Quencher ($12.50)
- Dove Men+Care 2-in-1 Shampoo ($25.17)
- Suavecito Pomade ($40.99)

## 🖼 Product Images

Product images should be placed in `/public/products/` with specific naming conventions. See:
- `product_images/product_catalog.md` - Complete product catalog
- `download-product-images.md` - Download instructions
- `essential-dignity-images.md` - Quick setup guide

## 🚀 Deployment

### Vercel (Recommended)
The project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure environment supports Node.js and Next.js

## 📝 Features

### User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive Components**: Hover effects, smooth animations
- **Quantity Controls**: 1-100 kits per order with validation
- **Real-time Pricing**: Dynamic total calculation
- **Success States**: Visual confirmation of actions

### Business Features
- **Corporate-Friendly**: Designed for team/department sponsorships
- **Tax-Deductible**: Proper nonprofit donation structure
- **Flexible Quantities**: Support bulk orders for organizations
- **Professional Branding**: Aligned with foundation identity

### Technical Features  
- **Fast Loading**: Turbopack builds, optimized images
- **Type Safety**: Full TypeScript implementation
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO Optimized**: Meta tags, structured data

## 🔗 Related Documentation

- [`docs/ORANGEWOOD_STYLE_GUIDE.md`](./docs/ORANGEWOOD_STYLE_GUIDE.md) - Brand guidelines and design system
- [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) - Component architecture and usage
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) - Deployment and production guide
- [`docs/API.md`](./docs/API.md) - Future API integration roadmap
- [`product_images/product_catalog.md`](./product_images/product_catalog.md) - Complete product information
- [`docs/download-product-images.md`](./docs/download-product-images.md) - Image setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Code Standards
- Follow existing code style and patterns
- Use TypeScript for all new code
- Follow accessibility best practices
- Test across different devices and browsers

## 📄 License

This project is created for the Orangewood Foundation charitable initiative. All purchases are fulfilled by Doing Good Works and delivered to Orangewood Foundation.

## 🆘 Support

- **Issues**: Report bugs via GitHub Issues
- **Contact**: For partnership questions, use the contact form on the site
- **Documentation**: Check the [`docs/`](./docs/) folder for additional guides

---

**Built with ❤️ for the Orangewood Foundation**  
Supporting young people in Orange County as they prepare for adulthood and independence.
