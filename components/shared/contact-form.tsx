'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzbpape';

const SERVICE_LABELS: Record<string, string> = {
  'unified-communications': 'Unified Communications',
  'datacenter-solutions': 'Datacenter Solutions',
  'network-solutions': 'Network Solutions',
  'security-solutions': 'Security Solutions',
  'software-solutions': 'Software Solutions',
  'ai-solutions': 'AI Solutions',
  'customer-experience': 'Customer Experience',
  'managed-services': 'Managed Services',
  'low-current-systems': 'Low Current Systems',
  consulting: 'General IT Consulting',
  other: 'Other / Not Sure',
};

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  defaultService?: string;
}

export function ContactForm({
  className,
  onSuccess,
  defaultService,
}: ContactFormProps) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [referenceId, setReferenceId] = React.useState<string | null>(null);
  const [subject, setSubject] = React.useState<string | null>(null);
  const honeypotRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: (defaultService || '') as ContactFormData['service'],
      message: '',
      consent: false,
    },
  });

  React.useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('subject')?.trim().slice(0, 120);
    if (!value) return;
    setSubject(value);
    if (!getValues('service')) setValue('service', 'other');
    if (!getValues('message')) setValue('message', `Regarding: ${value}\n\n`);
  }, [getValues, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    // Bots fill every field, including the visually hidden honeypot.
    if (honeypotRef.current?.value) {
      setIsSuccess(true);
      return;
    }

    try {
      // Formspree expects form fields; send our data with human-readable service label for email
      const body = {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || '',
        service: SERVICE_LABELS[data.service] ?? data.service,
        message: data.message,
        consent: data.consent ? 'Yes' : 'No',
        _subject: subject
          ? `Website inquiry: ${subject}`
          : `Website inquiry: ${SERVICE_LABELS[data.service] ?? data.service}`,
        _replyto: data.email,
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        const msg = result.error || result.message || `Request failed (${response.status})`;
        throw new Error(msg);
      }

      // Client-side reference for confirmation message (Formspree doesn't return one)
      setReferenceId(`XR-${Date.now().toString(36).toUpperCase()}`);
      setIsSuccess(true);
      reset();
      onSuccess?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setReferenceId(null);
    setSubmitError(null);
  };

  if (isSuccess) {
    return (
      <div className={cn('p-8 text-center', className)}>
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-text-secondary mb-4">
          Thank you for reaching out. We&apos;ll respond within 24 hours.
        </p>
        {referenceId && (
          <p className="text-sm text-text-muted mb-4">Reference: #{referenceId}</p>
        )}
        <Button variant="outline" onClick={handleReset}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input ref={honeypotRef} id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {submitError && (
        <div
          className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <p className="text-red-600 dark:text-red-400 font-medium">Unable to send message</p>
            <p className="text-red-600/80 dark:text-red-400/80 text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
            Full Name <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            className="flex h-11 w-full rounded-lg border bg-background-card px-4 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary aria-invalid:border-red-500"
            aria-required="true"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-primary">
            Company Name <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corporation"
            className="flex h-11 w-full rounded-lg border bg-background-card px-4 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary aria-invalid:border-red-500"
            aria-required="true"
            aria-invalid={!!errors.company}
            {...register('company')}
          />
          {errors.company && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
            Work Email <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="john@company.com"
            className="flex h-11 w-full rounded-lg border bg-background-card px-4 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary aria-invalid:border-red-500"
            aria-required="true"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-primary">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 123-4567"
            className="flex h-11 w-full rounded-lg border bg-background-card px-4 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary aria-invalid:border-red-500"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          <p className="mt-1.5 text-xs text-text-muted">Optional - for urgent inquiries</p>
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-text-primary">
          Service Interest <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <select
          id="service"
          className="flex h-11 w-full rounded-lg border bg-background-card px-4 py-2 text-sm text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary"
          aria-required="true"
          aria-invalid={!!errors.service}
          {...register('service')}
        >
          <option value="">Select a service area...</option>
          {Object.entries(SERVICE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
          How can we help? <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project, challenges, or questions..."
          className="flex min-h-[120px] w-full rounded-lg border bg-background-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 resize-y focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 border-border hover:border-border-hover focus:border-accent-primary"
          aria-required="true"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border bg-background-card text-accent-primary focus:ring-accent-primary"
          aria-required="true"
          aria-invalid={!!errors.consent}
          {...register('consent')}
        />
        <div>
          <label
            htmlFor="consent"
            className="text-sm text-text-secondary cursor-pointer"
          >
            I agree to the{' '}
            <Link href="/privacy/" className="text-accent-primary underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{' '}
            and consent to being contacted about my inquiry. <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
