# Deployment Guide - Basic Need Kit

## 🚀 Production Deployment

### Current Production Site
**Live URL**: https://basicneedkit-q00mw5aho-jordans-projects-608b7fba.vercel.app

### Vercel Deployment (Recommended)

The project is optimized for Vercel deployment with automatic builds from GitHub.

#### Prerequisites
- Vercel account connected to GitHub
- Vercel CLI installed: `npm i -g vercel`

#### Deployment Steps

1. **Initial Setup**
   ```bash
   # Clone and setup
   git clone https://github.com/jbdgw/orangewood_basic_need.git
   cd basicneedkit
   npm install
   ```

2. **Configure Vercel Project**
   ```bash
   vercel link
   # Follow prompts to link to existing project or create new
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Automatic Deployments
- **Main Branch**: Auto-deploys to production on push to `main`
- **Feature Branches**: Create preview deployments
- **Build Process**: Next.js build with Turbopack optimization

### Environment Configuration

#### Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### Environment Variables
Currently no environment variables required. All configuration is in code.

---

## 🔧 Alternative Deployment Options

### Manual Static Export
```bash
# Build for static hosting
npm run build
npm run export

# Deploy the 'out' folder to any static host
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting (cPanel/FTP)
1. Run `npm run build`
2. Upload `.next` folder and `package.json`
3. Configure Node.js app with start command: `npm start`

---

## 📊 Build & Performance

### Build Output Analysis
```bash
# Analyze bundle size
npm run build

# Typical build results:
Route (app)                         Size     First Load JS
┌ ○ /                              20.2 kB  134 kB
├ ○ /_not-found                    0 B      114 kB
└ ○ /contact                       11.7 kB  126 kB
+ First Load JS shared by all      120 kB
```

### Performance Optimizations
- **Turbopack**: Fast builds and hot reloading
- **Image Optimization**: Next.js automatic image optimization
- **CSS Purging**: Tailwind removes unused styles
- **Code Splitting**: Automatic route-based splitting

---

## 🔍 Monitoring & Analytics

### Build Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Build Logs**: Available in Vercel dashboard
- **Error Tracking**: Automatic error reporting

### Performance Metrics
- **Core Web Vitals**: Monitored by Vercel
- **Build Times**: ~20-30 seconds typical
- **Bundle Analysis**: Available in build output

---

## 🚨 Troubleshooting

### Common Build Issues

#### TypeScript Errors
```bash
# Check for type errors
npm run build

# Common fixes:
# - Fix JSX.Element to React.ReactNode
# - Add missing imports
# - Fix unescaped HTML entities
```

#### ESLint Errors
```bash
# Run linting
npm run lint

# Common issues:
# - Unescaped quotes: Use &apos; instead of '
# - Use Link instead of <a> for internal links
# - Remove unused imports
```

#### Image Loading Issues
- Verify images exist in `/public/products/`
- Check filename matches exactly (case-sensitive)
- Ensure images are optimized (< 1MB recommended)

### Deployment Failures

#### Build Command Failed
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix any TypeScript/ESLint errors
4. Commit fixes and redeploy

#### Module Not Found
1. Clear node_modules and reinstall
2. Check package.json dependencies
3. Verify import paths are correct

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build passes locally
- [ ] Images optimized and placed correctly

### Content Review
- [ ] Product pricing is current
- [ ] Contact information accurate
- [ ] Links functional (Orangewood Foundation, Doing Good Works)
- [ ] Brand consistency maintained

### Technical Validation
- [ ] Mobile responsiveness tested
- [ ] Accessibility standards met
- [ ] Performance acceptable (< 3s load time)
- [ ] SEO meta tags present

### Business Requirements
- [ ] Donation flow tested
- [ ] Quantity validation working
- [ ] Success states functional
- [ ] Error handling implemented

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Future Enhancement)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build project
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

---

## 🎯 Production Maintenance

### Regular Updates
- **Monthly**: Check product pricing and availability
- **Quarterly**: Review and update dependencies
- **As Needed**: Content updates, new features

### Monitoring
- **Uptime**: Monitor via Vercel dashboard
- **Performance**: Regular Lighthouse audits
- **User Feedback**: Monitor contact form submissions

### Backup Strategy
- **Code**: Git repository on GitHub
- **Configuration**: Documented in this guide
- **Images**: Stored in public folder (version controlled)

---

*For development setup, see README.md | For component documentation, see COMPONENTS.md*