import { z } from 'zod';

export const serviceOptions = [
  'unified-communications',
  'datacenter-solutions',
  'network-solutions',
  'security-solutions',
  'software-solutions',
  'ai-solutions',
  'customer-experience',
  'managed-services',
  'low-current-systems',
  'consulting',
  'other',
] as const;

export type ServiceType = (typeof serviceOptions)[number];

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(
      /^[\p{L}\p{M}\s.'-]+$/u,
      'Name can only contain letters, spaces, periods, hyphens, and apostrophes'
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

  service: z
    .union([z.enum(serviceOptions), z.literal('')])
    .refine((val): val is ServiceType => val !== '', {
      message: 'Please select a service area',
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
