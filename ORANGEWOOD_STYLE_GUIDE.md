# Orangewood Foundation Style Guide

Based on analysis of https://orangewoodfoundation.org/

## Brand Identity

### Mission Focus
- **Target Audience**: Young people experiencing homelessness, foster care transitions, and trafficking situations in Orange County
- **Core Services**: Basic needs support, transitional housing, education, life skills, employment assistance
- **Brand Personality**: Supportive, empowering, community-focused, professional yet approachable

## Color Palette

### Primary Colors
Based on the website's actual CSS variables:

- **Deep Blue**: Primary brand color (#0B4971)
  - Used for: Headers, navigation, professional elements, main branding
  - Represents: Trust, stability, professionalism, depth

- **Cream**: Secondary background color (#F9F9F1)
  - Used for: Section backgrounds, subtle contrast areas
  - Represents: Warmth, approachability, comfort

- **Orange**: Accent color (#FF9121)
  - Used for: Primary buttons, highlights, call-to-action elements, statistics
  - Represents: Energy, optimism, action, warmth

### Supporting Colors
- **White**: (#FFFFFF) Clean backgrounds, text contrast
- **Text Color**: (#282828) Main body text, readable content
- **Light Cream**: (#F1F1DF) Alternative background, subtle sections
- **Light Gray**: (#CCCCCC) Borders, dividers, subtle elements
- **Light Green**: (#AAD3A1) Success states, positive indicators
- **Light Beige**: (#EAEAD2) Additional background option
- **Text Secondary**: (#6B7280) Supporting text, captions

## Typography

### Font Families
Based on the website's actual CSS variables:

- **Primary Font**: "contralto-medium" (serif)
  - Used for: Large headings, brand elements, impactful text
  - Size: 88px for primary headings
  - Weight: 600 (semibold)
  - Line Height: 1.12em (tight)

- **Secondary Font**: "Inter" (sans-serif)
  - Used for: Secondary headings, navigation, buttons
  - Size: 16px
  - Weight: 600 (semibold)
  - Line Height: 1.48em

- **Body Text Font**: "Inter" (sans-serif)
  - Used for: Paragraphs, general content
  - Size: 18px
  - Weight: 400 (regular)
  - Line Height: 1.48em

- **Accent Font**: "Inter" (sans-serif)
  - Used for: Special text, captions
  - Size: 18px
  - Weight: 400 (regular)
  - Line Height: 1.48em

### Typography Hierarchy
- **H1**: Contralto Medium, 88px, 600 weight - Major headings
- **H2/H3**: Inter, 16px, 600 weight - Section headers
- **Body**: Inter, 18px, 400 weight - Main content
- **Buttons/Nav**: Inter, 16px, 600 weight - Interactive elements

## Layout & Spacing

### Grid System
- **Container Width**: Full-width sections with centered content
- **Content Width**: Constrained for optimal reading (likely 1200px max)
- **Responsive**: Mobile-first approach with breakpoints

### Section Structure
1. **Hero Section**: Large header with primary CTA
2. **Service Categories**: 4-column grid layout
   - Basic Needs & Support
   - Education  
   - Life Skills & Employment
   - Transitional Housing & Support
3. **Impact Statistics**: Prominent number displays
4. **Testimonials**: Quote format with attribution
5. **Call-to-Action Sections**: Donation and volunteer prompts

### Spacing Patterns
- **Section Padding**: Large vertical spacing between sections
- **Card Spacing**: Consistent margins between service cards
- **Text Spacing**: Generous line height for readability

## UI Components

### Buttons
- **Primary Button**: Orange/coral background, white text
- **Secondary Button**: Outlined style or muted background
- **CTA Buttons**: "Explore Programs", "Learn More", "Donate"

### Cards/Sections
- **Service Cards**: Clean white backgrounds with subtle shadows
- **Image Cards**: Full-width images with overlay text
- **Statistic Cards**: Large numbers with descriptive text

### Navigation
- **Main Menu**: Horizontal navigation with dropdowns
- **Categories**: 
  - Our Work (Issues & Impact, Insights)
  - Our Programs (organized by service type)
  - Get Involved (Ways to Give, Volunteer, Events)
  - Who We Are (About, Team, Careers, Contact)

## Content Strategy

### Messaging Tone
- **Empowering**: Focus on young people's potential and success
- **Direct**: Clear, actionable language
- **Supportive**: Warm, welcoming, non-judgmental
- **Professional**: Credible, trustworthy, evidence-based

### Content Types
- **Impact Statistics**: Quantified results (1,183 visitors, 9,834 meals, etc.)
- **Success Stories**: First-person testimonials with names
- **Program Descriptions**: Clear, benefit-focused explanations
- **Calls-to-Action**: Multiple engagement opportunities

### Key Messages
- "Programs & Services for Young People"
- "We support young people in Orange County as they prepare for adulthood and independence"
- Focus on practical support: housing, meals, education, life skills
- Community involvement and partnership opportunities

## CSS Implementation

### CSS Custom Properties
```css
--color-primary: #0B4971;        /* Deep blue */
--color-secondary: #F9F9F1;      /* Cream background */
--color-text: #282828;           /* Main text */
--color-accent: #FF9121;         /* Orange accent */
--color-light-cream: #F1F1DF;    /* Light cream */
--color-light-gray: #CCCCCC;     /* Light gray */
--color-light-green: #AAD3A1;    /* Light green */
--color-light-beige: #EAEAD2;    /* Light beige */

--font-family-primary: "contralto-medium", serif;
--font-family-secondary: "Inter", sans-serif;
--font-family-text: "Inter", sans-serif;
--font-family-accent: "Inter", sans-serif;

--font-size-primary: 88px;       /* Large headings */
--font-size-secondary: 16px;     /* Secondary text */
--font-size-text: 18px;          /* Body text */
--font-size-accent: 18px;        /* Accent text */
```

## Visual Elements

### Photography Style
- **Authentic**: Real young people in genuine situations
- **Diverse**: Representing the community served
- **Hopeful**: Positive, forward-looking imagery
- **Professional**: High-quality, well-composed photos

### Icons & Graphics
- **Service Icons**: Simple, clear representations of program areas
- **Statistics**: Large, bold number displays
- **Navigation**: Clean, minimal iconography

## Implementation Guidelines

### Accessibility
- High contrast ratios for text readability
- Clear navigation structure
- Descriptive alt text for images
- Mobile-responsive design

### Brand Applications
- **Primary Blue** (#0B4971) for headers, navigation, and professional elements
- **Orange Accent** (#FF9121) for buttons, highlights, and call-to-action elements
- **Cream Backgrounds** (#F9F9F1) for section separation and visual comfort
- **Contralto Medium** for impactful headings and brand presence
- **Inter** for all body text, navigation, and functional elements
- Professional yet approachable tone
- Focus on young people's agency and potential

### Technical Considerations
- Fast loading times for accessibility
- Mobile-first responsive design
- SEO optimization for program discovery
- Clear contact information and program access

---

*This style guide is based on analysis of the Orangewood Foundation website as of August 2025. Use these guidelines to maintain brand consistency across all digital and print materials.*
