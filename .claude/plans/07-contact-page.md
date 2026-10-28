# 07 - Contact Page

## Overview
This document outlines the complete implementation plan for the Xerostop Contact page. The page is designed as a conversion-focused landing point where potential clients can request consultations, submit inquiries, and connect with the Xerostop team. The design emphasizes a professional, enterprise-grade aesthetic while maintaining accessibility and user-friendliness.

## Page Objectives
1. **Primary Goal**: Convert visitors into qualified leads through consultation bookings
2. **Secondary Goal**: Provide multiple contact channels for different user preferences
3. **Tertiary Goal**: Build trust through professional presentation and responsive design

---

## Page Structure

### URL & Routing
- **Path**: `/contact`
- **File**: `app/contact/page.tsx`
- **API Endpoint**: `app/api/contact/route.ts`

### Page Sections (Top to Bottom)
1. Hero Section with consultation CTA
2. Contact Form Section
3. Alternative Contact Methods
4. Office Location / Map (Optional)
5. FAQ Section (Optional - for common pre-sales questions)

---

## UI/UX Specifications

### Hero Section

#### Layout
- Full-width container with `max-w-7xl` centered
- Two-column layout on desktop (lg:), stacked on mobile
- Left column: Headline, subtext, trust indicators
- Right column: Visual element or direct CTA

#### Content
```
Headline: "Let's Transform Your IT Infrastructure"
Subheadline: "Book a free consultation with our enterprise IT specialists.
             We'll analyze your challenges and propose tailored solutions."
CTA Button: "Book a Free Consultation" (scrolls to form)
Trust Indicators:
- "Response within 24 hours"
- "No-obligation consultation"
- "Expert team with 20+ years experience"
```

#### Styling
```css
/* Hero Background */
background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);

/* Headline */
font-size: 48px (mobile: 36px);
font-weight: 700;
color: #ffffff;
letter-spacing: -0.02em;

/* Subheadline */
font-size: 18px (mobile: 16px);
color: #a1a1aa;
line-height: 1.6;
max-width: 540px;

/* CTA Button */
background: linear-gradient(135deg, #3b82f6, #06b6d4);
padding: 16px 32px;
border-radius: 6px;
font-weight: 600;
transition: transform 0.2s, box-shadow 0.2s;
hover: transform scale(1.02), box-shadow glow effect
```

---

### Contact Form Section

#### Layout
- Two-column layout on desktop
- Left: Form component (60% width)
- Right: Contact information + benefits (40% width)
- Mobile: Stacked, form first

#### Form Design Specifications

##### Container
```css
background: #1a1a1a;
border: 1px solid #27272a;
border-radius: 12px;
padding: 32px (mobile: 24px);
```

##### Form Title
```
"Send Us a Message"
or
"Request a Consultation"
```

---

## Form Component Breakdown

### File Structure
```
components/
├── shared/
│   └── contact-form.tsx          # Main form component
├── forms/
│   ├── contact-form-fields.tsx   # Individual field components
│   ├── form-success.tsx          # Success state component
│   └── form-error.tsx            # Error state component
lib/
└── validations/
    └── contact.ts                # Zod validation schemas
```

### ContactForm Component (`components/shared/contact-form.tsx`)

#### Props Interface
```typescript
interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  defaultService?: ServiceType;
}
```

#### Component Structure
```tsx
export function ContactForm({ className, onSuccess, defaultService }: ContactFormProps) {
  // React Hook Form setup
  // Loading, success, error states
  // Form submission handler
  // Render form or success/error states
}
```

### Form Fields Specification

#### 1. Name Field (Required)
```typescript
{
  name: 'name',
  label: 'Full Name',
  type: 'text',
  placeholder: 'John Smith',
  autoComplete: 'name',
  required: true,
}
```
**Validation Rules:**
- Minimum 2 characters
- Maximum 100 characters
- No special characters except hyphens and apostrophes

#### 2. Company Field (Required)
```typescript
{
  name: 'company',
  label: 'Company Name',
  type: 'text',
  placeholder: 'Acme Corporation',
  autoComplete: 'organization',
  required: true,
}
```
**Validation Rules:**
- Minimum 2 characters
- Maximum 200 characters

#### 3. Email Field (Required)
```typescript
{
  name: 'email',
  label: 'Work Email',
  type: 'email',
  placeholder: 'john@company.com',
  autoComplete: 'email',
  required: true,
}
```
**Validation Rules:**
- Valid email format (RFC 5322)
- Maximum 254 characters

#### 4. Phone Field (Optional)
```typescript
{
  name: 'phone',
  label: 'Phone Number',
  type: 'tel',
  placeholder: '+1 (555) 123-4567',
  autoComplete: 'tel',
  required: false,
  helperText: 'Optional - for urgent inquiries',
}
```
**Validation Rules:**
- If provided, must be valid phone format
- Minimum 10 digits
- International formats accepted

#### 5. Service Interest Dropdown (Required)
```typescript
{
  name: 'service',
  label: 'Service Interest',
  type: 'select',
  required: true,
  options: [
    { value: '', label: 'Select a service area...' },
    { value: 'unified-communications', label: 'Unified Communications' },
    { value: 'datacenter', label: 'Datacenter Solutions' },
    { value: 'security', label: 'Security Services' },
    { value: 'network', label: 'Network Infrastructure' },
    { value: 'software', label: 'Software Development' },
    { value: 'ai-solutions', label: 'AI & Automation' },
    { value: 'consulting', label: 'General IT Consulting' },
    { value: 'other', label: 'Other / Not Sure' },
  ],
}
```
**Validation Rules:**
- Must select a non-empty option

#### 6. Message Field (Required)
```typescript
{
  name: 'message',
  label: 'How can we help?',
  type: 'textarea',
  placeholder: 'Tell us about your project, challenges, or questions...',
  required: true,
  rows: 5,
}
```
**Validation Rules:**
- Minimum 20 characters
- Maximum 2000 characters

#### 7. Privacy Consent Checkbox (Required)
```typescript
{
  name: 'consent',
  label: 'I agree to the Privacy Policy and consent to being contacted about my inquiry.',
  type: 'checkbox',
  required: true,
}
```

---

## Validation Schema (Zod)

### File: `lib/validations/contact.ts`

```typescript
import { z } from 'zod';

export const serviceOptions = [
  'unified-communications',
  'datacenter',
  'security',
  'network',
  'software',
  'ai-solutions',
  'consulting',
  'other',
] as const;

export type ServiceType = typeof serviceOptions[number];

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]{10,}$/.test(val),
      'Please enter a valid phone number'
    ),

  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: 'Please select a service area' }),
  }),

  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

## API Endpoint Design

### File: `app/api/contact/route.ts`

#### Endpoint Specification
- **Method**: POST
- **Content-Type**: application/json
- **Rate Limiting**: 5 requests per minute per IP

#### Request Body
```typescript
interface ContactRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service: ServiceType;
  message: string;
  consent: boolean;
}
```

#### Response Types

**Success Response (201)**
```typescript
{
  success: true;
  message: 'Your message has been sent successfully.';
  referenceId: string; // Unique submission ID
}
```

**Validation Error Response (400)**
```typescript
{
  success: false;
  error: 'Validation failed';
  details: {
    field: string;
    message: string;
  }[];
}
```

**Rate Limit Error Response (429)**
```typescript
{
  success: false;
  error: 'Too many requests. Please try again later.';
}
```

**Server Error Response (500)**
```typescript
{
  success: false;
  error: 'An unexpected error occurred. Please try again.';
}
```

#### Implementation Structure
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { sendContactEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // 3. Generate reference ID
    const referenceId = generateReferenceId();

    // 4. Send email notification
    await sendContactEmail({
      ...validationResult.data,
      referenceId,
    });

    // 5. Optional: Store in database/CMS

    // 6. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully.',
        referenceId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

---

## Form States

### Default State
- All fields empty or with placeholders
- Submit button enabled
- No error messages visible

### Loading State
- All fields disabled
- Submit button shows loading spinner
- Button text: "Sending..." with spinner icon
- Form overlay with subtle opacity (optional)

```tsx
<Button disabled={isSubmitting} className="w-full">
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Sending...
    </>
  ) : (
    'Send Message'
  )}
</Button>
```

### Field Error State
- Red border on invalid field: `border-red-500`
- Error message below field in red: `text-red-400`
- Error icon next to field (optional)

```tsx
{errors.email && (
  <p className="mt-1 text-sm text-red-400" role="alert">
    {errors.email.message}
  </p>
)}
```

### Success State
- Form replaced with success message
- Checkmark animation
- Reference number displayed
- "Send Another Message" button

```tsx
<div className="text-center py-12">
  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
    <CheckCircle className="w-8 h-8 text-green-500" />
  </div>
  <h3 className="text-2xl font-semibold text-white mb-2">
    Message Sent Successfully!
  </h3>
  <p className="text-zinc-400 mb-4">
    Thank you for reaching out. We'll respond within 24 hours.
  </p>
  <p className="text-sm text-zinc-500">
    Reference: #{referenceId}
  </p>
  <Button
    variant="outline"
    className="mt-6"
    onClick={resetForm}
  >
    Send Another Message
  </Button>
</div>
```

### Error State (Submission Failed)
- Error banner at top of form
- Form remains editable
- Retry button available

```tsx
<div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
  <div className="flex items-center gap-3">
    <AlertCircle className="w-5 h-5 text-red-400" />
    <div>
      <p className="text-red-400 font-medium">
        Unable to send message
      </p>
      <p className="text-red-400/80 text-sm">
        {error.message}
      </p>
    </div>
  </div>
</div>
```

---

## Animations

### Page Load Animations (Framer Motion)

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
```

### Form Field Focus Animation
```css
/* Input focus state */
input:focus, textarea:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
```

### Submit Button Hover Animation
```css
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
}

button:active:not(:disabled) {
  transform: translateY(0);
}
```

### Success Checkmark Animation
```tsx
const checkmarkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};
```

### Error Shake Animation
```tsx
const shakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};
```

---

## Responsive Design

### Desktop (lg: 1024px+)
- Two-column layout: Form (60%) + Contact Info (40%)
- Form padding: 32px
- Side-by-side name/company fields option
- Contact info displayed as cards

### Tablet (md: 768px - 1023px)
- Two-column layout maintained but with adjusted proportions
- Form padding: 24px
- Fields stack vertically
- Contact info below form or side

### Mobile (< 768px)
- Single column layout
- Form padding: 20px
- All fields full width
- Contact info cards stack
- Reduced font sizes
- Touch-friendly input sizing (min-height 48px)

### Breakpoint-Specific Styles
```tsx
<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
  {/* Form Section - 3 columns on desktop */}
  <div className="lg:col-span-3">
    <ContactForm />
  </div>

  {/* Contact Info - 2 columns on desktop */}
  <div className="lg:col-span-2">
    <ContactInfo />
  </div>
</div>
```

---

## Contact Information Section

### Layout
```tsx
<div className="space-y-6">
  {/* Section Title */}
  <h3 className="text-xl font-semibold text-white">
    Other Ways to Reach Us
  </h3>

  {/* Contact Cards */}
  <div className="space-y-4">
    <ContactCard
      icon={<Mail />}
      title="Email Us"
      value="contact@xerostop.com"
      href="mailto:contact@xerostop.com"
    />
    <ContactCard
      icon={<Phone />}
      title="Call Us"
      value="+1 (555) 123-4567"
      href="tel:+15551234567"
      subtext="Mon-Fri, 9am-6pm EST"
    />
    <ContactCard
      icon={<MapPin />}
      title="Visit Us"
      value="123 Business Ave, Suite 500"
      subtext="New York, NY 10001"
    />
  </div>

  {/* Response Time Promise */}
  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
    <div className="flex items-center gap-3">
      <Clock className="w-5 h-5 text-primary" />
      <div>
        <p className="text-white font-medium">Quick Response Guaranteed</p>
        <p className="text-zinc-400 text-sm">
          We respond to all inquiries within 24 business hours
        </p>
      </div>
    </div>
  </div>
</div>
```

### ContactCard Component
```tsx
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  subtext?: string;
}

function ContactCard({ icon, title, value, href, subtext }: ContactCardProps) {
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href}
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg',
        'bg-card border border-border',
        href && 'hover:bg-card-hover hover:border-border-hover transition-colors'
      )}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400">{title}</p>
        <p className="text-white font-medium">{value}</p>
        {subtext && <p className="text-sm text-zinc-500">{subtext}</p>}
      </div>
    </Wrapper>
  );
}
```

---

## SEO Specifications

### Metadata (`app/contact/page.tsx`)
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Xerostop - Enterprise IT Consulting',
  description: 'Get in touch with Xerostop for enterprise IT consulting services. Book a free consultation for UC, Datacenter, Security, Network, and AI solutions.',
  keywords: [
    'contact Xerostop',
    'IT consulting contact',
    'enterprise IT consultation',
    'book IT consultation',
    'IT services inquiry',
  ],
  openGraph: {
    title: 'Contact Xerostop | Enterprise IT Consulting',
    description: 'Book a free consultation with our enterprise IT specialists. We respond within 24 hours.',
    url: 'https://xerostop.com/contact',
    siteName: 'Xerostop',
    type: 'website',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Xerostop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Xerostop | Enterprise IT Consulting',
    description: 'Book a free consultation with our enterprise IT specialists.',
  },
  alternates: {
    canonical: 'https://xerostop.com/contact',
  },
};
```

### Structured Data (JSON-LD)
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Xerostop',
      description: 'Contact page for Xerostop enterprise IT consulting',
      url: 'https://xerostop.com/contact',
      mainEntity: {
        '@type': 'Organization',
        name: 'Xerostop',
        telephone: '+1-555-123-4567',
        email: 'contact@xerostop.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Business Ave, Suite 500',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10001',
          addressCountry: 'US',
        },
      },
    }),
  }}
/>
```

---

## Accessibility Requirements

### Form Accessibility

#### Labels and Inputs
```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-white">
    Work Email <span className="text-red-400">*</span>
  </Label>
  <Input
    id="email"
    type="email"
    autoComplete="email"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
    {...register('email')}
  />
  {errors.email && (
    <p id="email-error" className="text-sm text-red-400" role="alert">
      {errors.email.message}
    </p>
  )}
</div>
```

#### Required Field Indicators
- Visual asterisk (*) for required fields
- `aria-required="true"` attribute
- Clear required vs optional distinction

#### Error Messages
- Use `role="alert"` for error messages
- Connect errors to inputs via `aria-describedby`
- Focus management on form errors (focus first invalid field)

#### Focus Management
```tsx
// Focus first error field on validation failure
useEffect(() => {
  const firstError = Object.keys(errors)[0];
  if (firstError) {
    const element = document.getElementById(firstError);
    element?.focus();
  }
}, [errors]);
```

#### Keyboard Navigation
- Tab order follows visual order
- Enter key submits form
- Escape key clears focused field (optional)
- Visible focus indicators on all interactive elements

#### Screen Reader Announcements
```tsx
// Announce form submission status
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {isSubmitting && 'Submitting your message...'}
  {isSuccess && 'Message sent successfully!'}
  {isError && `Error: ${errorMessage}`}
</div>
```

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Error states use red with sufficient contrast
- Focus indicators clearly visible

### Motion Preferences
```tsx
// Respect reduced motion preferences
const prefersReducedMotion = usePrefersReducedMotion();

<motion.div
  variants={prefersReducedMotion ? {} : itemVariants}
  initial={prefersReducedMotion ? false : 'hidden'}
  animate="visible"
>
```

---

## Component Implementation Checklist

### Page Component (`app/contact/page.tsx`)
- [ ] Import metadata and define SEO
- [ ] Add JSON-LD structured data
- [ ] Implement hero section with CTA
- [ ] Add ContactForm component
- [ ] Add contact information section
- [ ] Implement page-level animations
- [ ] Add skip navigation link

### ContactForm Component (`components/shared/contact-form.tsx`)
- [ ] Set up React Hook Form with zodResolver
- [ ] Implement all form fields with proper types
- [ ] Add loading state management
- [ ] Implement success state UI
- [ ] Implement error state UI
- [ ] Add form submission handler
- [ ] Implement accessibility features
- [ ] Add Framer Motion animations

### Form Fields Components
- [ ] Create reusable Input component wrapper
- [ ] Create reusable Select component wrapper
- [ ] Create reusable Textarea component wrapper
- [ ] Create Checkbox component with label

### API Route (`app/api/contact/route.ts`)
- [ ] Implement POST handler
- [ ] Add Zod validation
- [ ] Implement rate limiting
- [ ] Set up email sending
- [ ] Add error handling
- [ ] Generate reference IDs

### Validation (`lib/validations/contact.ts`)
- [ ] Define contactFormSchema
- [ ] Export TypeScript types
- [ ] Add custom error messages

---

## Testing Considerations

### Unit Tests
- Zod schema validation
- Form state management
- API route handlers

### Integration Tests
- Form submission flow
- Error handling
- Success state transitions

### E2E Tests
- Complete form submission
- Validation error display
- Mobile responsiveness

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast verification

---

## Performance Optimizations

### Code Splitting
```tsx
// Lazy load form component if below fold
const ContactForm = dynamic(
  () => import('@/components/shared/contact-form'),
  {
    loading: () => <FormSkeleton />,
    ssr: true
  }
);
```

### Image Optimization
- Use Next.js Image component for any images
- Provide WebP format with fallbacks
- Implement proper sizing and lazy loading

### Form Performance
- Debounce validation on input (300ms)
- Memoize expensive computations
- Use `useCallback` for handlers

---

## Environment Variables Required

```env
# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@xerostop.com
SMTP_PASS=your_smtp_password
CONTACT_EMAIL=contact@xerostop.com

# Rate Limiting (optional - if using external service)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Optional: Form submission storage
STRAPI_API_TOKEN=your_strapi_token
```

---

## File Summary

| File Path | Purpose |
|-----------|---------|
| `app/contact/page.tsx` | Main contact page component |
| `app/api/contact/route.ts` | Form submission API endpoint |
| `components/shared/contact-form.tsx` | Reusable contact form component |
| `components/forms/form-success.tsx` | Success state component |
| `components/forms/form-error.tsx` | Error state component |
| `lib/validations/contact.ts` | Zod validation schemas |
| `lib/email.ts` | Email sending utility |
| `lib/rate-limit.ts` | Rate limiting utility |

---

## Related Plans
- `00-architecture-setup.md` - Project architecture and design system
- `01-homepage.md` - Homepage implementation (if exists)
- `02-services.md` - Services pages (if exists)

---

## Revision History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial plan creation |
