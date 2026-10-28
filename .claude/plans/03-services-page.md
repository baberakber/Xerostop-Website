# 03 - Services Page

## Overview

This document provides a comprehensive implementation plan for the Xerostop Services section, including the Services overview page (`/services`) and individual service detail pages (`/services/[slug]`). The design follows the enterprise IT consultancy brand with a modern dark theme and the consulting model: **What we consult on -> What we design -> What we deliver**.

---

## Table of Contents

1. [Page Architecture](#page-architecture)
2. [Service Categories Data](#service-categories-data)
3. [Services Overview Page](#services-overview-page)
4. [Individual Service Page](#individual-service-page)
5. [Component Breakdown](#component-breakdown)
6. [Animations & Interactions](#animations--interactions)
7. [Responsive Design](#responsive-design)
8. [SEO Strategy](#seo-strategy)
9. [Accessibility](#accessibility)
10. [Implementation Checklist](#implementation-checklist)

---

## Page Architecture

### Route Structure

```
app/
└── services/
    ├── page.tsx              # Services overview (/services)
    ├── [slug]/
    │   └── page.tsx          # Individual service (/services/unified-communications)
    └── layout.tsx            # Shared layout (optional)
```

### URL Slugs

| Service Category | URL Slug |
|------------------|----------|
| Unified Communications | `/services/unified-communications` |
| Datacenter Solutions | `/services/datacenter-solutions` |
| Network Solutions | `/services/network-solutions` |
| Security Solutions | `/services/security-solutions` |
| Software Solutions | `/services/software-solutions` |
| AI Solutions | `/services/ai-solutions` |

---

## Service Categories Data

### Data Structure

```typescript
// types/services.ts

export interface ServiceOffering {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  heroImage?: string;

  // Consulting Model Phases
  consult: ServiceOffering[];   // What we consult on
  design: ServiceOffering[];    // What we design
  deliver: ServiceOffering[];   // What we deliver

  // Additional Content
  benefits: string[];
  useCases: string[];
  technologies: string[];
  relatedServices: string[];    // slugs of related services

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}
```

### Service Data

```typescript
// lib/data/services.ts

export const services: ServiceCategory[] = [
  {
    id: '1',
    slug: 'unified-communications',
    title: 'Unified Communications',
    shortTitle: 'UC',
    tagline: 'Connect your enterprise with seamless voice, video, and collaboration',
    description: 'Transform how your organization communicates with enterprise-grade unified communications solutions that integrate voice, video, messaging, and collaboration tools into a cohesive platform.',
    icon: 'Phone',
    gradient: 'from-blue-500 to-cyan-500',

    consult: [
      {
        title: 'UC Architecture Assessment',
        description: 'Evaluate current communication infrastructure and identify optimization opportunities'
      },
      {
        title: 'Compliance & Regulatory Review',
        description: 'Assess call recording, retention, and compliance requirements for your industry'
      },
      {
        title: 'Vendor Selection & Strategy',
        description: 'Compare platforms and recommend optimal solutions for your business needs'
      },
      {
        title: 'Migration Planning',
        description: 'Develop comprehensive migration strategies from legacy to modern UC systems'
      }
    ],

    design: [
      {
        title: 'UC Architecture Design',
        description: 'Design scalable, resilient unified communications architecture tailored to your needs'
      },
      {
        title: 'Call Recording & Compliance',
        description: 'Design compliant call recording solutions meeting regulatory requirements'
      },
      {
        title: 'HA & DR for Voice',
        description: 'Design high availability and disaster recovery solutions ensuring business continuity'
      },
      {
        title: 'Cloud & Hybrid UC',
        description: 'Architect cloud-native and hybrid UC deployments for flexibility and scale'
      },
      {
        title: 'Secure SIP & Media Encryption',
        description: 'Design secure voice transport with encryption and authentication protocols'
      }
    ],

    deliver: [
      {
        title: 'Platform Deployment',
        description: 'End-to-end implementation of UC platforms including configuration and testing'
      },
      {
        title: 'Integration Services',
        description: 'Connect UC with CRM, ERP, and collaboration tools for seamless workflows'
      },
      {
        title: 'Training & Enablement',
        description: 'Comprehensive user training and administrator enablement programs'
      },
      {
        title: 'Managed Services',
        description: 'Ongoing monitoring, maintenance, and optimization of UC infrastructure'
      }
    ],

    benefits: [
      'Reduce communication costs by up to 50%',
      'Increase team productivity with unified tools',
      'Ensure 99.99% uptime with HA/DR design',
      'Meet compliance requirements with secure recording',
      'Scale seamlessly from 100 to 100,000 users'
    ],

    useCases: [
      'Enterprise voice migration to cloud',
      'Contact center modernization',
      'Remote workforce enablement',
      'Multi-site consolidation',
      'Regulatory compliance implementation'
    ],

    technologies: [
      'Microsoft Teams',
      'Cisco Webex',
      'Zoom',
      'Genesys Cloud',
      'Avaya',
      'SIP/SBC',
      'WebRTC'
    ],

    relatedServices: ['security-solutions', 'network-solutions', 'datacenter-solutions'],

    metaTitle: 'Unified Communications Solutions | Xerostop',
    metaDescription: 'Enterprise unified communications consulting, design, and delivery. UC architecture, call recording, HA/DR, cloud UC, and secure SIP solutions.',
    keywords: ['unified communications', 'UC solutions', 'VoIP', 'call recording', 'enterprise voice', 'cloud UC']
  },

  {
    id: '2',
    slug: 'datacenter-solutions',
    title: 'Datacenter Solutions',
    shortTitle: 'DC',
    tagline: 'Build the foundation for your digital transformation',
    description: 'Design and deliver modern datacenter infrastructure with compute, storage, virtualization, and high availability solutions that power your business applications.',
    icon: 'Server',
    gradient: 'from-purple-500 to-pink-500',

    consult: [
      {
        title: 'Infrastructure Assessment',
        description: 'Comprehensive evaluation of existing datacenter capacity, performance, and efficiency'
      },
      {
        title: 'Capacity Planning',
        description: 'Project future growth and plan infrastructure investments accordingly'
      },
      {
        title: 'TCO Analysis',
        description: 'Analyze total cost of ownership for on-premises vs. cloud vs. hybrid options'
      },
      {
        title: 'Modernization Strategy',
        description: 'Develop roadmap for datacenter transformation and technology refresh'
      }
    ],

    design: [
      {
        title: 'Compute Architecture',
        description: 'Design high-performance compute infrastructure for demanding workloads'
      },
      {
        title: 'Storage Solutions',
        description: 'Architect tiered storage with appropriate performance and capacity tiers'
      },
      {
        title: 'Virtualization Platform',
        description: 'Design VMware, Hyper-V, or Nutanix virtualization environments'
      },
      {
        title: 'HA & DR Design',
        description: 'Create resilient architectures with RPO/RTO aligned to business requirements'
      }
    ],

    deliver: [
      {
        title: 'Hardware Deployment',
        description: 'Procure, rack, and configure server, storage, and network hardware'
      },
      {
        title: 'Platform Implementation',
        description: 'Deploy and configure virtualization and management platforms'
      },
      {
        title: 'Migration Services',
        description: 'Execute workload migrations with minimal downtime'
      },
      {
        title: 'Operational Handoff',
        description: 'Document, train, and transition to operations teams'
      }
    ],

    benefits: [
      'Optimize infrastructure utilization to 80%+',
      'Reduce unplanned downtime by 90%',
      'Accelerate application deployment',
      'Lower energy costs with efficient design',
      'Enable rapid disaster recovery'
    ],

    useCases: [
      'Datacenter consolidation',
      'Private cloud implementation',
      'Disaster recovery site buildout',
      'Infrastructure refresh',
      'Hybrid cloud integration'
    ],

    technologies: [
      'VMware vSphere',
      'Microsoft Hyper-V',
      'Nutanix',
      'Dell/HP/Lenovo Servers',
      'Pure Storage',
      'NetApp',
      'Veeam'
    ],

    relatedServices: ['network-solutions', 'security-solutions', 'ai-solutions'],

    metaTitle: 'Datacenter Solutions | Xerostop',
    metaDescription: 'Enterprise datacenter consulting, design, and implementation. Compute, storage, virtualization, and HA/DR solutions for modern businesses.',
    keywords: ['datacenter solutions', 'virtualization', 'storage', 'compute', 'HA/DR', 'private cloud']
  },

  {
    id: '3',
    slug: 'network-solutions',
    title: 'Network Solutions',
    shortTitle: 'NET',
    tagline: 'Connect every user, device, and application securely',
    description: 'Design and deliver enterprise networks that provide reliable, high-performance connectivity from campus to cloud with modern SD-WAN and software-defined networking.',
    icon: 'Network',
    gradient: 'from-green-500 to-teal-500',

    consult: [
      {
        title: 'Network Assessment',
        description: 'Comprehensive analysis of network performance, security, and architecture'
      },
      {
        title: 'Bandwidth & Capacity Planning',
        description: 'Project network requirements based on application and growth needs'
      },
      {
        title: 'WAN Optimization Strategy',
        description: 'Evaluate options for improving WAN performance and reducing costs'
      },
      {
        title: 'SD-WAN Readiness',
        description: 'Assess readiness for SD-WAN transformation and vendor selection'
      }
    ],

    design: [
      {
        title: 'Enterprise Network Design',
        description: 'Design resilient, scalable enterprise LAN/WAN architectures'
      },
      {
        title: 'Campus Network Design',
        description: 'Architect modern campus networks with wireless-first approach'
      },
      {
        title: 'WAN Architecture',
        description: 'Design hybrid WAN solutions combining MPLS, internet, and LTE'
      },
      {
        title: 'SD-WAN Design',
        description: 'Architect software-defined WAN for agility and cost optimization'
      }
    ],

    deliver: [
      {
        title: 'Network Implementation',
        description: 'Deploy switches, routers, firewalls, and wireless infrastructure'
      },
      {
        title: 'SD-WAN Deployment',
        description: 'Implement SD-WAN overlays with centralized management'
      },
      {
        title: 'Network Migration',
        description: 'Execute migrations with minimal disruption to operations'
      },
      {
        title: 'Performance Optimization',
        description: 'Tune network for optimal application performance'
      }
    ],

    benefits: [
      'Reduce WAN costs by 30-50%',
      'Improve application performance',
      'Enable cloud-first connectivity',
      'Simplify network management',
      'Accelerate branch deployments'
    ],

    useCases: [
      'SD-WAN transformation',
      'Campus network refresh',
      'Branch office connectivity',
      'Cloud connectivity',
      'Network segmentation'
    ],

    technologies: [
      'Cisco',
      'Arista',
      'Juniper',
      'Palo Alto',
      'Fortinet',
      'VMware VeloCloud',
      'Meraki'
    ],

    relatedServices: ['security-solutions', 'datacenter-solutions', 'unified-communications'],

    metaTitle: 'Network Solutions | Xerostop',
    metaDescription: 'Enterprise network consulting, design, and implementation. Campus, WAN, SD-WAN, and cloud connectivity solutions.',
    keywords: ['network solutions', 'SD-WAN', 'enterprise network', 'campus network', 'WAN optimization']
  },

  {
    id: '4',
    slug: 'security-solutions',
    title: 'Security Solutions',
    shortTitle: 'SEC',
    tagline: 'Protect your business with defense in depth',
    description: 'Implement comprehensive security solutions spanning network security, unified communications protection, identity management, and zero trust architecture.',
    icon: 'Shield',
    gradient: 'from-red-500 to-orange-500',

    consult: [
      {
        title: 'Security Assessment',
        description: 'Comprehensive evaluation of security posture and vulnerability identification'
      },
      {
        title: 'Risk Analysis',
        description: 'Identify and prioritize security risks aligned to business impact'
      },
      {
        title: 'Compliance Gap Analysis',
        description: 'Assess compliance with SOC2, HIPAA, PCI-DSS, and other frameworks'
      },
      {
        title: 'Security Strategy',
        description: 'Develop roadmap for security program maturation'
      }
    ],

    design: [
      {
        title: 'Network Security',
        description: 'Design firewall, IDS/IPS, and network segmentation architectures'
      },
      {
        title: 'UC Security',
        description: 'Design secure voice and collaboration infrastructure with encryption and fraud prevention'
      },
      {
        title: 'Identity & Access Management',
        description: 'Architect IAM, SSO, and privileged access management solutions'
      },
      {
        title: 'Zero Trust Architecture',
        description: 'Design zero trust network access and microsegmentation strategies'
      }
    ],

    deliver: [
      {
        title: 'Security Implementation',
        description: 'Deploy firewalls, SIEM, EDR, and other security technologies'
      },
      {
        title: 'IAM Deployment',
        description: 'Implement identity providers, MFA, and access governance'
      },
      {
        title: 'Security Monitoring',
        description: 'Stand up security operations and monitoring capabilities'
      },
      {
        title: 'Incident Response',
        description: 'Develop and test incident response procedures'
      }
    ],

    benefits: [
      'Reduce security incidents by 70%',
      'Achieve compliance certifications',
      'Minimize breach impact',
      'Enable secure remote work',
      'Protect brand reputation'
    ],

    useCases: [
      'Zero trust implementation',
      'SOC/SIEM deployment',
      'Identity modernization',
      'Cloud security posture',
      'Compliance programs'
    ],

    technologies: [
      'Palo Alto NGFW',
      'CrowdStrike',
      'Okta',
      'Microsoft Entra ID',
      'Splunk',
      'Zscaler',
      'HashiCorp Vault'
    ],

    relatedServices: ['network-solutions', 'unified-communications', 'software-solutions'],

    metaTitle: 'Security Solutions | Xerostop',
    metaDescription: 'Enterprise security consulting, design, and implementation. Network security, UC security, identity management, and zero trust solutions.',
    keywords: ['security solutions', 'zero trust', 'IAM', 'network security', 'UC security', 'compliance']
  },

  {
    id: '5',
    slug: 'software-solutions',
    title: 'Software Solutions',
    shortTitle: 'SW',
    tagline: 'Build the tools that transform your operations',
    description: 'Develop custom software applications, automation workflows, and operational dashboards that streamline operations and unlock new capabilities.',
    icon: 'Code',
    gradient: 'from-yellow-500 to-amber-500',

    consult: [
      {
        title: 'Requirements Analysis',
        description: 'Gather and analyze business requirements for software solutions'
      },
      {
        title: 'Technology Assessment',
        description: 'Evaluate technology options and recommend optimal platforms'
      },
      {
        title: 'Integration Planning',
        description: 'Plan integrations with existing systems and data sources'
      },
      {
        title: 'Build vs. Buy Analysis',
        description: 'Analyze custom development vs. commercial off-the-shelf options'
      }
    ],

    design: [
      {
        title: 'Custom Application Design',
        description: 'Design bespoke applications tailored to unique business needs'
      },
      {
        title: 'Automation Workflows',
        description: 'Design process automation using modern orchestration platforms'
      },
      {
        title: 'Operational Dashboards',
        description: 'Design real-time dashboards for infrastructure and application monitoring'
      },
      {
        title: 'API Architecture',
        description: 'Design APIs for system integration and data exchange'
      }
    ],

    deliver: [
      {
        title: 'Application Development',
        description: 'Build and deploy custom applications using modern development practices'
      },
      {
        title: 'Automation Implementation',
        description: 'Implement automation workflows reducing manual effort'
      },
      {
        title: 'Dashboard Deployment',
        description: 'Deploy monitoring dashboards with real-time data visualization'
      },
      {
        title: 'Ongoing Support',
        description: 'Provide maintenance, updates, and feature enhancements'
      }
    ],

    benefits: [
      'Reduce manual effort by 60%',
      'Improve operational visibility',
      'Accelerate decision making',
      'Eliminate data silos',
      'Enable self-service capabilities'
    ],

    useCases: [
      'IT operations automation',
      'Custom reporting portals',
      'Integration middleware',
      'Self-service tools',
      'Monitoring dashboards'
    ],

    technologies: [
      'Python',
      'Node.js',
      'React',
      'Next.js',
      'Ansible',
      'Terraform',
      'Grafana',
      'Power BI'
    ],

    relatedServices: ['ai-solutions', 'datacenter-solutions', 'network-solutions'],

    metaTitle: 'Software Solutions | Xerostop',
    metaDescription: 'Custom software development, automation, and dashboard solutions. Build tools that transform your IT operations.',
    keywords: ['custom software', 'automation', 'dashboards', 'API development', 'IT automation']
  },

  {
    id: '6',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    shortTitle: 'AI',
    tagline: 'Harness artificial intelligence to amplify your capabilities',
    description: 'Leverage artificial intelligence with custom AI agents, intelligent analytics, process automation, and proactive infrastructure monitoring.',
    icon: 'Brain',
    gradient: 'from-cyan-500 to-blue-500',

    consult: [
      {
        title: 'AI Readiness Assessment',
        description: 'Evaluate organizational readiness for AI adoption'
      },
      {
        title: 'Use Case Identification',
        description: 'Identify high-value AI use cases aligned to business objectives'
      },
      {
        title: 'Data Readiness',
        description: 'Assess data quality, availability, and governance for AI initiatives'
      },
      {
        title: 'AI Strategy Development',
        description: 'Create roadmap for AI adoption and capability building'
      }
    ],

    design: [
      {
        title: 'AI Agent Design',
        description: 'Design intelligent agents for customer service, IT operations, and business processes'
      },
      {
        title: 'Analytics Architecture',
        description: 'Design AI-powered analytics platforms for insights and predictions'
      },
      {
        title: 'Intelligent Automation',
        description: 'Design AI-enhanced automation for complex decision-making workflows'
      },
      {
        title: 'AI Monitoring',
        description: 'Design AIOps solutions for proactive infrastructure monitoring'
      }
    ],

    deliver: [
      {
        title: 'AI Agent Deployment',
        description: 'Build and deploy conversational AI and intelligent agents'
      },
      {
        title: 'Analytics Implementation',
        description: 'Implement ML models and analytics pipelines'
      },
      {
        title: 'AIOps Deployment',
        description: 'Deploy AI-powered monitoring and incident management'
      },
      {
        title: 'Model Management',
        description: 'Establish MLOps practices for model lifecycle management'
      }
    ],

    benefits: [
      'Reduce incident response time by 80%',
      'Automate 50% of routine tasks',
      'Enable predictive maintenance',
      'Improve customer experience',
      'Accelerate insights from data'
    ],

    useCases: [
      'IT helpdesk automation',
      'Predictive infrastructure monitoring',
      'Log analysis and anomaly detection',
      'Capacity planning optimization',
      'Intelligent alerting'
    ],

    technologies: [
      'OpenAI',
      'Azure AI',
      'LangChain',
      'Datadog',
      'Splunk ITSI',
      'BigPanda',
      'Python ML Stack'
    ],

    relatedServices: ['software-solutions', 'datacenter-solutions', 'security-solutions'],

    metaTitle: 'AI Solutions | Xerostop',
    metaDescription: 'Enterprise AI consulting, design, and implementation. AI agents, intelligent analytics, automation, and AIOps monitoring.',
    keywords: ['AI solutions', 'AI agents', 'AIOps', 'intelligent automation', 'ML operations', 'enterprise AI']
  }
];
```

---

## Services Overview Page

### Page: `/services`

#### File: `app/services/page.tsx`

```typescript
import { Metadata } from 'next';
import ServicesHero from '@/components/services/services-hero';
import ServicesGrid from '@/components/services/services-grid';
import ConsultingApproach from '@/components/services/consulting-approach';
import ServicesCTA from '@/components/services/services-cta';

export const metadata: Metadata = {
  title: 'Services | Xerostop',
  description: 'Enterprise IT consulting services: Unified Communications, Datacenter, Network, Security, Software, and AI solutions. We consult, design, and deliver.',
  keywords: ['IT consulting', 'enterprise services', 'UC', 'datacenter', 'network', 'security', 'software', 'AI'],
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ConsultingApproach />
      <ServicesGrid />
      <ServicesCTA />
    </main>
  );
}
```

### Sections Layout

#### 1. Services Hero Section

```
+------------------------------------------------------------------+
|                                                                   |
|                    [Gradient Badge: "Our Services"]               |
|                                                                   |
|         Enterprise IT Consulting Services                         |
|         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~               |
|         (gradient underline animation)                            |
|                                                                   |
|    From strategy to execution, we help enterprises transform      |
|    their technology infrastructure with expert consulting,        |
|    thoughtful design, and proven delivery.                        |
|                                                                   |
|         [Explore Services]    [Contact Us]                        |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Background: `#0a0a0a` with subtle gradient mesh
- Badge: Gradient border pill with "Our Services"
- Headline: 56px desktop / 36px mobile, font-weight 700
- Subheadline: 20px, `text-secondary` (#a1a1aa)
- CTA Buttons: Primary blue + ghost variant

#### 2. Consulting Approach Section

```
+------------------------------------------------------------------+
|                                                                   |
|                    Our Consulting Model                           |
|                                                                   |
|   +----------------+   +----------------+   +----------------+    |
|   |   CONSULT      |-->|    DESIGN      |-->|    DELIVER     |   |
|   |   [Icon]       |   |    [Icon]      |   |    [Icon]      |   |
|   |                |   |                |   |                |   |
|   | What we        |   | What we        |   | What we        |   |
|   | consult on     |   | design         |   | deliver        |   |
|   |                |   |                |   |                |   |
|   | Assessment,    |   | Architecture,  |   | Implementation,|   |
|   | Strategy,      |   | Solutions,     |   | Migration,     |   |
|   | Planning       |   | Blueprints     |   | Support        |   |
|   +----------------+   +----------------+   +----------------+    |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- 3-column layout with connecting arrows/lines
- Each phase card: `bg-card` (#1a1a1a) with hover state
- Animated connecting lines (gradient animation)
- Icons: 48px, gradient colored
- Reveal animation on scroll

#### 3. Services Grid Section

```
+------------------------------------------------------------------+
|                                                                   |
|                     Our Service Areas                             |
|                                                                   |
|   +---------------------------+   +---------------------------+   |
|   | [Icon]                    |   | [Icon]                    |   |
|   | Unified Communications    |   | Datacenter Solutions      |   |
|   |                           |   |                           |   |
|   | UC Architecture, Call     |   | Compute, Storage,         |   |
|   | Recording, HA/DR, Cloud   |   | Virtualization, HA/DR     |   |
|   |                           |   |                           |   |
|   | [Learn More ->]           |   | [Learn More ->]           |   |
|   +---------------------------+   +---------------------------+   |
|                                                                   |
|   +---------------------------+   +---------------------------+   |
|   | [Icon]                    |   | [Icon]                    |   |
|   | Network Solutions         |   | Security Solutions        |   |
|   |                           |   |                           |   |
|   | Enterprise, Campus,       |   | Network, UC, Identity,    |   |
|   | WAN, SD-WAN               |   | Zero Trust                |   |
|   |                           |   |                           |   |
|   | [Learn More ->]           |   | [Learn More ->]           |   |
|   +---------------------------+   +---------------------------+   |
|                                                                   |
|   +---------------------------+   +---------------------------+   |
|   | [Icon]                    |   | [Icon]                    |   |
|   | Software Solutions        |   | AI Solutions              |   |
|   |                           |   |                           |   |
|   | Custom Apps, Automation,  |   | AI Agents, Analytics,     |   |
|   | Dashboards                |   | Automation, Monitoring    |   |
|   |                           |   |                           |   |
|   | [Learn More ->]           |   | [Learn More ->]           |   |
|   +---------------------------+   +---------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- 2-column grid (desktop), 1-column (mobile)
- Card size: min-height 280px
- Hover effects: scale(1.02), border glow, gradient reveal
- Staggered reveal animation
- Each card links to `/services/[slug]`

#### 4. Services CTA Section

```
+------------------------------------------------------------------+
|   [Gradient Background]                                           |
|                                                                   |
|         Ready to Transform Your Technology?                       |
|                                                                   |
|    Let's discuss how our services can help you achieve            |
|    your business objectives.                                      |
|                                                                   |
|                   [Schedule a Consultation]                       |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Individual Service Page

### Page: `/services/[slug]`

#### File: `app/services/[slug]/page.tsx`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data/services';
import ServiceHero from '@/components/services/service-hero';
import ConsultingPhases from '@/components/services/consulting-phases';
import ServiceBenefits from '@/components/services/service-benefits';
import TechStack from '@/components/services/tech-stack';
import UseCases from '@/components/services/use-cases';
import RelatedServices from '@/components/services/related-services';
import ServiceCTA from '@/components/services/service-cta';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceHero service={service} />
      <ConsultingPhases service={service} />
      <ServiceBenefits benefits={service.benefits} />
      <UseCases useCases={service.useCases} />
      <TechStack technologies={service.technologies} />
      <RelatedServices
        services={services.filter(s =>
          service.relatedServices.includes(s.slug)
        )}
      />
      <ServiceCTA service={service} />
    </main>
  );
}
```

### Sections Layout

#### 1. Service Hero Section

```
+------------------------------------------------------------------+
|                                                                   |
|   [Breadcrumb: Services > Unified Communications]                 |
|                                                                   |
|   [Icon with gradient glow]                                       |
|                                                                   |
|         Unified Communications                                    |
|         ~~~~~~~~~~~~~~~~~~~~~~~~~                                 |
|                                                                   |
|    Connect your enterprise with seamless voice, video,            |
|    and collaboration                                              |
|                                                                   |
|   +-------------+  +-------------+  +-------------+               |
|   | Consult     |  | Design      |  | Deliver     |               |
|   | [Arrow]     |  | [Arrow]     |  | [Arrow]     |               |
|   +-------------+  +-------------+  +-------------+               |
|                                                                   |
|         [Get Started]    [View All Services]                      |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Service-specific gradient background (subtle)
- Large icon (64px) with animated gradient glow
- Quick navigation pills to page sections
- Breadcrumb navigation for SEO and UX

#### 2. Consulting Phases Section (3-Tab Layout)

```
+------------------------------------------------------------------+
|                                                                   |
|   [CONSULT]       [DESIGN]        [DELIVER]                       |
|   =========                                                       |
|                                                                   |
|   What We Consult On                                              |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                                                           |   |
|   |   +-------------------+   +-------------------+           |   |
|   |   | [Icon]            |   | [Icon]            |           |   |
|   |   | UC Architecture   |   | Compliance &      |           |   |
|   |   | Assessment        |   | Regulatory Review |           |   |
|   |   |                   |   |                   |           |   |
|   |   | Evaluate current  |   | Assess call       |           |   |
|   |   | communication     |   | recording and     |           |   |
|   |   | infrastructure    |   | retention needs   |           |   |
|   |   +-------------------+   +-------------------+           |   |
|   |                                                           |   |
|   |   +-------------------+   +-------------------+           |   |
|   |   | [Icon]            |   | [Icon]            |           |   |
|   |   | Vendor Selection  |   | Migration         |           |   |
|   |   | & Strategy        |   | Planning          |           |   |
|   |   |                   |   |                   |           |   |
|   |   | Compare platforms |   | Develop migration |           |   |
|   |   | and recommend     |   | strategies from   |           |   |
|   |   | optimal solutions |   | legacy systems    |           |   |
|   |   +-------------------+   +-------------------+           |   |
|   |                                                           |   |
|   +-----------------------------------------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Tab-based navigation (Consult | Design | Deliver)
- Active tab has gradient underline indicator
- Content animates on tab change (slide + fade)
- Cards in 2-column grid (desktop), 1-column (mobile)
- Each offering card shows title + description

#### 3. Service Benefits Section

```
+------------------------------------------------------------------+
|                                                                   |
|         Why Choose Our [Service Name]                             |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                                                           |   |
|   |   [Check Icon]  Reduce communication costs by up to 50%   |   |
|   |                                                           |   |
|   |   [Check Icon]  Increase team productivity with unified   |   |
|   |                 tools                                     |   |
|   |                                                           |   |
|   |   [Check Icon]  Ensure 99.99% uptime with HA/DR design   |   |
|   |                                                           |   |
|   |   [Check Icon]  Meet compliance requirements with secure  |   |
|   |                 recording                                 |   |
|   |                                                           |   |
|   |   [Check Icon]  Scale seamlessly from 100 to 100,000     |   |
|   |                 users                                     |   |
|   |                                                           |   |
|   +-----------------------------------------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Clean list with gradient check icons
- Benefits animate in sequentially
- Optional: Animated counter for percentage values
- Background: Subtle gradient card

#### 4. Use Cases Section

```
+------------------------------------------------------------------+
|                                                                   |
|         Common Use Cases                                          |
|                                                                   |
|   +-------------+  +-------------+  +-------------+               |
|   | Enterprise  |  | Contact     |  | Remote      |               |
|   | voice       |  | center      |  | workforce   |               |
|   | migration   |  | moderniz... |  | enablement  |               |
|   +-------------+  +-------------+  +-------------+               |
|                                                                   |
|   +-------------+  +-------------+                                |
|   | Multi-site  |  | Regulatory  |                                |
|   | consolid... |  | compliance  |                                |
|   +-------------+  +-------------+                                |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Badge/pill style tags
- Hover effect: subtle scale + glow
- Wrap naturally on smaller screens

#### 5. Technology Stack Section

```
+------------------------------------------------------------------+
|                                                                   |
|         Technologies We Work With                                 |
|                                                                   |
|   +--------+  +--------+  +--------+  +--------+  +--------+     |
|   | MS     |  | Cisco  |  | Zoom   |  | Genesys|  | Avaya  |     |
|   | Teams  |  | Webex  |  |        |  | Cloud  |  |        |     |
|   +--------+  +--------+  +--------+  +--------+  +--------+     |
|                                                                   |
|   +--------+  +--------+                                          |
|   | SIP/   |  | WebRTC |                                          |
|   | SBC    |  |        |                                          |
|   +--------+  +--------+                                          |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- Logo icons where available, text fallback
- Subtle card style with hover effect
- Infinite scroll animation (optional)

#### 6. Related Services Section

```
+------------------------------------------------------------------+
|                                                                   |
|         Related Services                                          |
|                                                                   |
|   +---------------------------+   +---------------------------+   |
|   | [Icon]                    |   | [Icon]                    |   |
|   | Security Solutions        |   | Network Solutions         |   |
|   | Protect your UC infra...  |   | Enable optimal UC...      |   |
|   | [Learn More ->]           |   | [Learn More ->]           |   |
|   +---------------------------+   +---------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

**Specifications:**
- 2-3 related services shown
- Smaller card variant than main grid
- Links to respective service pages

#### 7. Service CTA Section

```
+------------------------------------------------------------------+
|   [Gradient Background]                                           |
|                                                                   |
|         Ready to Transform Your Communications?                   |
|                                                                   |
|    Let's discuss how our UC expertise can modernize               |
|    your enterprise communications.                                |
|                                                                   |
|         [Schedule a Consultation]    [Download Datasheet]         |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Component Breakdown

### New Components Required

```
components/
└── services/
    ├── services-hero.tsx           # Overview page hero
    ├── services-grid.tsx           # 6-card service grid
    ├── consulting-approach.tsx     # 3-phase consulting model
    ├── services-cta.tsx            # Overview page CTA
    ├── service-hero.tsx            # Individual service hero
    ├── consulting-phases.tsx       # Tab-based phases (consult/design/deliver)
    ├── service-benefits.tsx        # Benefits list
    ├── use-cases.tsx               # Use case badges
    ├── tech-stack.tsx              # Technology logos/badges
    ├── related-services.tsx        # Related service cards
    └── service-cta.tsx             # Individual service CTA
```

### Shared Components Used

```
components/
├── ui/
│   ├── button.tsx                  # Primary/ghost buttons
│   ├── card.tsx                    # Service cards
│   ├── badge.tsx                   # Tags and labels
│   └── tabs.tsx                    # Consulting phases tabs
├── shared/
│   ├── section-header.tsx          # Consistent section headings
│   ├── service-card.tsx            # Reusable service card
│   ├── gradient-text.tsx           # Gradient text effect
│   └── animated-counter.tsx        # Number animations
└── layout/
    ├── breadcrumb.tsx              # Navigation breadcrumbs (new)
    └── section-wrapper.tsx         # Consistent section spacing (new)
```

### Component Specifications

#### ServiceCard Component

```typescript
// components/shared/service-card.tsx

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
  tags?: string[];
  variant?: 'default' | 'compact';
}
```

**Visual Specifications:**
- Default: 280px min-height, full content
- Compact: 200px min-height, abbreviated content
- Background: `#1a1a1a`
- Border: `1px solid #27272a`
- Border radius: 12px
- Hover: `border-color: #3b82f6`, `transform: scale(1.02)`, gradient glow

#### ConsultingPhase Component

```typescript
// components/services/consulting-phases.tsx

interface ConsultingPhasesProps {
  service: ServiceCategory;
}
```

**Tab Specifications:**
- Tab bar: sticky on scroll (within section)
- Active indicator: gradient underline, animated
- Content transition: slide + fade (300ms)

---

## Animations & Interactions

### Framer Motion Animations

#### Page Load Animations

```typescript
// Stagger container for service cards
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

// Individual card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  },
};
```

#### Scroll-Triggered Animations

```typescript
// Section reveal animation
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Use with useInView hook
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });
```

#### Interactive Animations

```typescript
// Card hover animation
const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: 'easeOut' },
};

// Button hover animation
const buttonHover = {
  scale: 1.05,
  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
};

// Tab content switch animation
const tabContentVariants = {
  enter: {
    x: 20,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
```

### CSS Animations

```css
/* Gradient border animation */
@keyframes gradient-border {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-border {
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
  background-size: 200% 100%;
  animation: gradient-border 3s ease infinite;
}

/* Icon glow animation */
@keyframes icon-glow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)); }
}

/* Connecting line animation (consulting model) */
@keyframes line-flow {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}
```

---

## Responsive Design

### Breakpoint Specifications

| Element | Mobile (< 640px) | Tablet (640-1024px) | Desktop (> 1024px) |
|---------|------------------|---------------------|-------------------|
| Hero Heading | 32px | 42px | 56px |
| Service Grid | 1 column | 2 columns | 2 columns |
| Consulting Model | Vertical stack | Horizontal | Horizontal |
| Phase Cards Grid | 1 column | 2 columns | 2 columns |
| Section Padding | 48px 16px | 64px 32px | 96px 48px |
| Card Padding | 24px | 28px | 32px |

### Mobile-Specific Adjustments

```typescript
// Services grid mobile layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {services.map((service) => (
    <ServiceCard key={service.slug} {...service} />
  ))}
</div>

// Consulting model mobile layout
<div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
  <PhaseCard phase="consult" />
  <Arrow className="rotate-90 md:rotate-0" />
  <PhaseCard phase="design" />
  <Arrow className="rotate-90 md:rotate-0" />
  <PhaseCard phase="deliver" />
</div>

// Tab navigation mobile
<div className="flex overflow-x-auto md:overflow-visible scrollbar-hide">
  <TabsList className="flex-shrink-0">
    {tabs.map((tab) => (
      <TabsTrigger key={tab} className="min-w-[100px]">
        {tab}
      </TabsTrigger>
    ))}
  </TabsList>
</div>
```

### Touch Interactions

- Tap targets: minimum 44x44px
- Swipe navigation for tabs on mobile
- Pull-to-reveal for section content (optional)
- Long-press preview for service cards (optional)

---

## SEO Strategy

### Page-Level SEO

#### Services Overview (`/services`)

```typescript
export const metadata: Metadata = {
  title: 'Enterprise IT Consulting Services | Xerostop',
  description: 'Comprehensive IT consulting services including Unified Communications, Datacenter, Network, Security, Software, and AI solutions. Expert consulting, design, and delivery.',
  keywords: [
    'IT consulting services',
    'enterprise IT solutions',
    'unified communications',
    'datacenter solutions',
    'network consulting',
    'security services',
    'software development',
    'AI consulting'
  ],
  openGraph: {
    title: 'Enterprise IT Consulting Services | Xerostop',
    description: 'Comprehensive IT consulting services. We consult, design, and deliver.',
    url: 'https://xerostop.com/services',
    type: 'website',
    images: ['/og/services.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise IT Consulting Services | Xerostop',
    description: 'Comprehensive IT consulting services. We consult, design, and deliver.',
  },
};
```

#### Individual Service Pages

```typescript
// Dynamic metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://xerostop.com/services/${params.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://xerostop.com/services/${params.slug}`,
    },
  };
}
```

### Structured Data (JSON-LD)

```typescript
// Service page structured data
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'Xerostop',
    url: 'https://xerostop.com',
  },
  serviceType: service.title,
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} Services`,
    itemListElement: [
      ...service.consult.map((item, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.title,
          description: item.description,
        },
        position: i + 1,
      })),
    ],
  },
};

// Breadcrumb structured data
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://xerostop.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://xerostop.com/services',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: service.title,
      item: `https://xerostop.com/services/${service.slug}`,
    },
  ],
};
```

### Internal Linking Strategy

- Each service page links to 3 related services
- Breadcrumb navigation on all pages
- Footer includes all service links
- CTA sections link to contact page
- Cross-reference services in content where relevant

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Keyboard Navigation

```typescript
// Tab navigation keyboard support
const handleKeyDown = (e: KeyboardEvent, tabIndex: number) => {
  if (e.key === 'ArrowRight') {
    setActiveTab((tabIndex + 1) % tabs.length);
  } else if (e.key === 'ArrowLeft') {
    setActiveTab((tabIndex - 1 + tabs.length) % tabs.length);
  } else if (e.key === 'Home') {
    setActiveTab(0);
  } else if (e.key === 'End') {
    setActiveTab(tabs.length - 1);
  }
};
```

#### Focus Management

```css
/* Focus indicators */
.focus-visible:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Skip navigation link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

#### Screen Reader Support

```typescript
// Tab component with ARIA
<div role="tablist" aria-label="Service phases">
  {phases.map((phase, index) => (
    <button
      key={phase.id}
      role="tab"
      id={`tab-${phase.id}`}
      aria-selected={activeTab === index}
      aria-controls={`panel-${phase.id}`}
      tabIndex={activeTab === index ? 0 : -1}
    >
      {phase.label}
    </button>
  ))}
</div>

<div
  role="tabpanel"
  id={`panel-${activePhase.id}`}
  aria-labelledby={`tab-${activePhase.id}`}
  tabIndex={0}
>
  {/* Panel content */}
</div>
```

#### Color Contrast

| Element | Foreground | Background | Ratio |
|---------|------------|------------|-------|
| Body text | #ffffff | #0a0a0a | 21:1 |
| Secondary text | #a1a1aa | #0a0a0a | 7.4:1 |
| Links (blue) | #3b82f6 | #0a0a0a | 5.2:1 |
| Card text | #ffffff | #1a1a1a | 15.1:1 |

#### Motion Preferences

```typescript
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationVariants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
```

---

## Implementation Checklist

### Phase 1: Setup & Data

- [ ] Create `types/services.ts` with TypeScript interfaces
- [ ] Create `lib/data/services.ts` with all 6 service definitions
- [ ] Create utility functions for service data access

### Phase 2: Shared Components

- [ ] Create/update `components/shared/service-card.tsx`
- [ ] Create `components/layout/breadcrumb.tsx`
- [ ] Create `components/layout/section-wrapper.tsx`
- [ ] Update `components/ui/tabs.tsx` for custom styling

### Phase 3: Services Overview Page

- [ ] Create `app/services/page.tsx`
- [ ] Create `components/services/services-hero.tsx`
- [ ] Create `components/services/consulting-approach.tsx`
- [ ] Create `components/services/services-grid.tsx`
- [ ] Create `components/services/services-cta.tsx`
- [ ] Add page metadata and SEO

### Phase 4: Individual Service Pages

- [ ] Create `app/services/[slug]/page.tsx`
- [ ] Create `components/services/service-hero.tsx`
- [ ] Create `components/services/consulting-phases.tsx`
- [ ] Create `components/services/service-benefits.tsx`
- [ ] Create `components/services/use-cases.tsx`
- [ ] Create `components/services/tech-stack.tsx`
- [ ] Create `components/services/related-services.tsx`
- [ ] Create `components/services/service-cta.tsx`
- [ ] Implement `generateStaticParams` for static generation
- [ ] Add dynamic metadata generation

### Phase 5: Animations

- [ ] Implement page load animations
- [ ] Implement scroll-triggered animations
- [ ] Implement tab transition animations
- [ ] Implement hover interactions
- [ ] Add reduced motion support

### Phase 6: Responsive Design

- [ ] Test and refine mobile layouts
- [ ] Test and refine tablet layouts
- [ ] Ensure touch targets meet minimum size
- [ ] Test horizontal scroll on tabs

### Phase 7: SEO & Accessibility

- [ ] Add JSON-LD structured data
- [ ] Implement breadcrumb schema
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Verify color contrast ratios
- [ ] Add skip navigation link

### Phase 8: Testing & QA

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Performance testing (Lighthouse audit)
- [ ] Accessibility audit (axe DevTools)
- [ ] Content review and proofreading

---

## File Summary

| File Path | Purpose |
|-----------|---------|
| `app/services/page.tsx` | Services overview page |
| `app/services/[slug]/page.tsx` | Individual service pages |
| `types/services.ts` | TypeScript interfaces |
| `lib/data/services.ts` | Service category data |
| `components/services/services-hero.tsx` | Overview hero section |
| `components/services/services-grid.tsx` | 6-card service grid |
| `components/services/consulting-approach.tsx` | 3-phase model section |
| `components/services/services-cta.tsx` | Overview CTA section |
| `components/services/service-hero.tsx` | Individual service hero |
| `components/services/consulting-phases.tsx` | Tab-based phases |
| `components/services/service-benefits.tsx` | Benefits list |
| `components/services/use-cases.tsx` | Use case badges |
| `components/services/tech-stack.tsx` | Technology logos |
| `components/services/related-services.tsx` | Related services grid |
| `components/services/service-cta.tsx` | Individual service CTA |
| `components/shared/service-card.tsx` | Reusable service card |
| `components/layout/breadcrumb.tsx` | Navigation breadcrumbs |

---

## Dependencies

No additional dependencies required beyond those specified in `00-architecture-setup.md`:

- Next.js 14+ (App Router)
- TypeScript 5.x
- Tailwind CSS 3.4+
- Framer Motion 10+
- Lucide React (icons)
- shadcn/ui components

---

*Last Updated: February 2026*
*Plan Version: 1.0*
