import type { LucideIcon } from 'lucide-react';
import {
  Phone,
  Server,
  Shield,
  Network,
  Code,
  Brain,
  Cpu,
  Headphones,
  ServerCog,
  Cable,
  CalendarClock,
  Mic,
  Receipt,
  PhoneForwarded,
  Layers,
  Gauge,
  Lock,
  MonitorSmartphone,
} from 'lucide-react';

export interface NavEntry {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const serviceNav: NavEntry[] = [
  { title: 'Unified Communications', description: 'Voice, video & collaboration', href: '/services/unified-communications', icon: Phone },
  { title: 'Datacenter Solutions', description: 'Compute, storage & virtualization', href: '/services/datacenter-solutions', icon: Server },
  { title: 'Network Solutions', description: 'Enterprise networking & SD-WAN', href: '/services/network-solutions', icon: Network },
  { title: 'Security Solutions', description: 'Zero trust & identity management', href: '/services/security-solutions', icon: Shield },
  { title: 'Software Solutions', description: 'Custom applications & automation', href: '/services/software-solutions', icon: Code },
  { title: 'AI Solutions', description: 'AI agents & intelligent analytics', href: '/services/ai-solutions', icon: Brain },
  { title: 'Customer Experience', description: 'Contact center & omnichannel', href: '/services/customer-experience', icon: Headphones },
  { title: 'Managed Services', description: '24/7 IT operations & support', href: '/services/managed-services', icon: ServerCog },
  { title: 'Low Current Systems', description: 'Cabling, fire alarm & BMS', href: '/services/low-current-systems', icon: Cable },
];

export const solutionNav: NavEntry[] = [
  { title: 'AI-Augmented UC Monitoring', description: 'Intelligent visibility into your communications', href: '/solutions/ai-uc-monitoring', icon: Brain },
  { title: 'High-Availability VoIP Architecture', description: 'Resilient voice infrastructure that never sleeps', href: '/solutions/ha-voip-architecture', icon: Server },
  { title: 'Secure Enterprise Datacenter', description: 'Defense in depth for critical infrastructure', href: '/solutions/secure-enterprise-datacenter', icon: Shield },
  { title: 'Intelligent Network Automation', description: 'AI-driven network operations', href: '/solutions/intelligent-network-automation', icon: Cpu },
];

export const productNav: NavEntry[] = [
  { title: 'Xero Meet', description: 'Meeting management & scheduling', href: '/products/xero-meet', icon: CalendarClock },
  { title: 'Xero Recorder', description: 'Call recording & intelligence', href: '/products/xero-recorder', icon: Mic },
  { title: 'Xero Billing', description: 'Call accounting, rating & billing', href: '/products/xero-billing', icon: Receipt },
  { title: 'Xero Forwarder', description: 'Intelligent call forwarding automation', href: '/products/xero-forwarder', icon: PhoneForwarded },
  { title: 'Xero Unified', description: 'CUCM, CMS, Expressway & endpoint management', href: '/products/xero-unified', icon: Layers },
  { title: 'Xero Tester', description: 'Stress testing & testing tool', href: '/products/xero-tester', icon: Gauge },
  { title: 'Xero Lock', description: 'Phone lock & XML services', href: '/products/xero-lock', icon: Lock },
  { title: 'Xero Devices', description: 'Cisco video endpoint & IP phone management', href: '/products/xero-devices', icon: MonitorSmartphone },
];

export type DropdownKey = 'services' | 'solutions' | 'products';

export interface NavItem {
  label: string;
  href: string;
  dropdownKey?: DropdownKey;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', dropdownKey: 'services' },
  { label: 'Solutions', href: '/solutions', dropdownKey: 'solutions' },
  { label: 'Products', href: '/products', dropdownKey: 'products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
];

export interface DropdownConfig {
  items: NavEntry[];
  columns: 2 | 3;
  eyebrow: string;
  heading: string;
  description: string;
  highlight: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export const dropdowns: Record<DropdownKey, DropdownConfig> = {
  services: {
    items: serviceNav,
    columns: 3,
    eyebrow: 'Services',
    heading: 'End-to-End IT Services',
    description: 'Consulting, design, delivery, and 24/7 operations across your entire technology stack.',
    highlight: 'Vendor-agnostic expertise',
    viewAllHref: '/services',
    viewAllLabel: 'View All Services',
  },
  solutions: {
    items: solutionNav,
    columns: 2,
    eyebrow: 'Solutions',
    heading: 'Outcome-Driven Solutions',
    description: 'Packaged offerings that combine architecture, delivery, and support into measurable results.',
    highlight: 'Proven delivery methodology',
    viewAllHref: '/solutions',
    viewAllLabel: 'View All Solutions',
  },
  products: {
    items: productNav,
    columns: 2,
    eyebrow: 'Products',
    heading: 'The Xero Product Suite',
    description: 'Purpose-built software for meetings, recording, billing, automation, testing, and devices.',
    highlight: 'Built for Cisco collaboration',
    viewAllHref: '/products',
    viewAllLabel: 'View All Products',
  },
};
