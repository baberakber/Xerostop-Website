import type { Solution } from '@/types/solutions';

export const solutions: Solution[] = [
  {
    id: '1',
    slug: 'ai-uc-monitoring',
    heroImage: '/images/solutions/ai-uc-monitoring.webp',
    title: 'AI-Augmented UC Monitoring',
    tagline: 'Intelligent visibility into your communications infrastructure',
    description:
      'Real-time monitoring and analytics platform that leverages AI to detect issues before they impact users, analyze call quality patterns, and provide actionable insights.',
    icon: 'Brain',
    category: 'uc',
    features: [
      {
        id: '1',
        title: 'Call Quality Analytics',
        description:
          'Deep packet inspection with MOS scoring, jitter analysis, and packet loss tracking across all endpoints.',
        icon: 'BarChart3',
      },
      {
        id: '2',
        title: 'Speech & Sentiment Insights',
        description: 'AI-powered analysis of call content to gauge customer satisfaction and agent performance.',
        icon: 'MessageSquare',
      },
      {
        id: '3',
        title: 'Proactive Fault Detection',
        description: 'Machine learning algorithms identify degradation patterns and alert before outages occur.',
        icon: 'AlertTriangle',
      },
      {
        id: '4',
        title: 'Unified Dashboard',
        description: 'Single pane of glass for Teams, Zoom, Cisco, and legacy PBX systems.',
        icon: 'LayoutDashboard',
      },
      {
        id: '5',
        title: 'Historical Trending',
        description: 'Long-term analytics with capacity planning and usage forecasting.',
        icon: 'TrendingUp',
      },
      {
        id: '6',
        title: 'Integration APIs',
        description: 'REST APIs and webhooks for ITSM, SIEM, and custom integrations.',
        icon: 'Plug',
      },
    ],
    useCases: [
      {
        id: '1',
        industry: 'Contact Centers',
        scenario: 'High-volume call centers experiencing intermittent quality issues',
        outcome: 'Identified ISP routing issues causing 15% of quality complaints; resolved within 48 hours',
      },
      {
        id: '2',
        industry: 'Healthcare',
        scenario: 'Telehealth platform requiring PDPL-compliant call monitoring',
        outcome: 'Achieved 99.9% uptime with automated compliance reporting',
      },
      {
        id: '3',
        industry: 'Financial Services',
        scenario: 'Trading floor communications requiring sub-second latency monitoring',
        outcome: 'Reduced mean time to resolution by 70% through predictive alerting',
      },
    ],
    deliverables: [
      { id: '1', title: 'Deployment & Configuration', description: 'Platform deployment and integration setup', included: true },
      { id: '2', title: 'Custom Dashboards', description: 'Tailored dashboards for your environment', included: true },
      { id: '3', title: 'Training & Documentation', description: 'Admin and operator training', included: true },
      { id: '4', title: '30-Day Support', description: 'Post-implementation support period', included: true },
    ],
    relatedSolutions: ['ha-voip-architecture', 'intelligent-network-automation'],
    relatedServices: ['unified-communications', 'ai-solutions'],
    technologies: ['Cisco', 'Microsoft Teams', 'Zoom', 'Avaya', 'Genesys', 'Twilio'],
    benefits: [
      { title: 'Reduced Downtime', metric: '60% faster issue detection' },
      { title: 'Improved User Experience', metric: '40% fewer escalations' },
      { title: 'Cost Optimization', metric: '25% reduction in support tickets' },
    ],
    seo: {
      metaTitle: 'AI-Augmented UC Monitoring',
      metaDescription:
        'AI-powered unified communications monitoring: call quality analytics, proactive fault detection, and one view across Microsoft Teams, Zoom, and Cisco.',
      keywords: ['UC monitoring', 'call quality analytics', 'AI monitoring', 'VoIP analytics', 'Teams monitoring'],
    },
  },
  {
    id: '2',
    slug: 'ha-voip-architecture',
    heroImage: '/images/solutions/ha-voip-architecture.webp',
    title: 'High-Availability VoIP Architecture',
    tagline: 'Resilient voice infrastructure that never sleeps',
    description:
      'Enterprise-grade VoIP architecture design and implementation featuring multi-plane redundancy, active-active configurations, and built-in compliance capabilities.',
    icon: 'Server',
    category: 'infrastructure',
    features: [
      {
        id: '1',
        title: 'Multi-Plane HA Design',
        description: 'Geographically distributed control and media planes with automatic failover.',
        icon: 'Network',
      },
      {
        id: '2',
        title: 'Active-Active Clusters',
        description: 'Load-balanced session border controllers and call managers for zero-downtime operations.',
        icon: 'Layers',
      },
      {
        id: '3',
        title: 'Recording & Compliance',
        description: 'Integrated call recording with encryption, retention policies, and audit trails.',
        icon: 'FileCheck',
      },
      {
        id: '4',
        title: 'Disaster Recovery',
        description: 'Automated DR procedures with RPO/RTO guarantees and regular testing frameworks.',
        icon: 'ShieldCheck',
      },
      {
        id: '5',
        title: 'Capacity Planning',
        description: 'Traffic modeling and growth projections with right-sized infrastructure.',
        icon: 'Calculator',
      },
      {
        id: '6',
        title: 'Migration Support',
        description: 'Phased migration strategies from legacy PBX with minimal disruption.',
        icon: 'ArrowRightLeft',
      },
    ],
    useCases: [
      {
        id: '1',
        industry: 'Enterprise',
        scenario: 'Global company with 50,000+ users across 30 countries',
        outcome: 'Deployed active-active architecture achieving 99.999% availability',
      },
      {
        id: '2',
        industry: 'Government',
        scenario: 'Government agency requiring NCA ECC-compliant voice services',
        outcome: 'Implemented compliant architecture with full audit capabilities',
      },
      {
        id: '3',
        industry: 'Retail',
        scenario: '2,000+ store locations requiring centralized management',
        outcome: 'Reduced operational costs by 35% through consolidation',
      },
    ],
    deliverables: [
      { id: '1', title: 'Architecture Design Document', description: 'Complete HA design and specifications', included: true },
      { id: '2', title: 'Implementation & Deployment', description: 'End-to-end deployment services', included: true },
      { id: '3', title: 'DR Runbooks', description: 'Disaster recovery procedures', included: true },
      { id: '4', title: 'HA Validation Testing', description: 'Failover and recovery testing', included: true },
    ],
    relatedSolutions: ['ai-uc-monitoring', 'secure-enterprise-datacenter'],
    relatedServices: ['unified-communications', 'datacenter-solutions'],
    technologies: ['Cisco CUCM', 'Microsoft Teams Direct Routing', 'Audiocodes', 'Ribbon', 'Oracle SBC'],
    benefits: [
      { title: 'Availability', metric: '99.999% uptime SLA' },
      { title: 'Failover Time', metric: 'Sub-second switchover' },
      { title: 'Compliance Ready', metric: '100% call capture' },
    ],
    seo: {
      metaTitle: 'High-Availability VoIP Architecture',
      metaDescription:
        'Enterprise HA VoIP architecture. Multi-plane redundancy, active-active clusters, compliance-ready call recording, and disaster recovery.',
      keywords: ['HA VoIP', 'high availability voice', 'VoIP architecture', 'enterprise voice', 'disaster recovery'],
    },
  },
  {
    id: '3',
    slug: 'secure-enterprise-datacenter',
    heroImage: '/images/solutions/secure-enterprise-datacenter.webp',
    title: 'Secure Enterprise Datacenter',
    tagline: 'Defense in depth for your critical infrastructure',
    description:
      'Comprehensive datacenter security architecture implementing Zero Trust principles, micro-segmentation, and high-availability security controls.',
    icon: 'Shield',
    category: 'security',
    features: [
      {
        id: '1',
        title: 'HA Firewall Clusters',
        description: 'Active-active next-generation firewalls with stateful failover and unified policy management.',
        icon: 'Flame',
      },
      {
        id: '2',
        title: 'Micro-Segmentation',
        description: 'Granular workload isolation with identity-based policies and east-west traffic inspection.',
        icon: 'Grid3x3',
      },
      {
        id: '3',
        title: 'Zero Trust Architecture',
        description: 'Never trust, always verify approach with continuous authentication and least-privilege access.',
        icon: 'KeyRound',
      },
      {
        id: '4',
        title: 'Threat Detection',
        description: 'Advanced threat prevention with sandboxing, IPS/IDS, and behavioral analytics.',
        icon: 'Radar',
      },
      {
        id: '5',
        title: 'Security Orchestration',
        description: 'Automated incident response playbooks and SOAR integration.',
        icon: 'Workflow',
      },
      {
        id: '6',
        title: 'Compliance Frameworks',
        description: 'Pre-built templates for NCA ECC, SAMA CSF, PCI DSS, and ISO 27001.',
        icon: 'ClipboardCheck',
      },
    ],
    useCases: [
      {
        id: '1',
        industry: 'Financial Services',
        scenario: 'Bank requiring PCI-DSS compliant cardholder data environment',
        outcome: 'Achieved PCI-DSS certification with zero findings on first audit',
      },
      {
        id: '2',
        industry: 'Healthcare',
        scenario: 'Hospital network protecting PHI across hybrid infrastructure',
        outcome: 'Implemented PDPL-aligned segmentation of patient data, reducing attack surface by 80%',
      },
      {
        id: '3',
        industry: 'Manufacturing',
        scenario: 'OT/IT convergence requiring secure industrial control systems',
        outcome: 'Deployed Purdue model segmentation with real-time threat monitoring',
      },
    ],
    deliverables: [
      { id: '1', title: 'Security Architecture Design', description: 'Zero Trust and segmentation design', included: true },
      { id: '2', title: 'Policy Framework', description: 'Security policies and procedures', included: true },
      { id: '3', title: 'Implementation Services', description: 'Deployment of security controls', included: true },
      { id: '4', title: 'Compliance Documentation', description: 'Audit-ready documentation', included: true },
    ],
    relatedSolutions: ['ha-voip-architecture', 'intelligent-network-automation'],
    relatedServices: ['security-solutions', 'datacenter-solutions'],
    technologies: ['Palo Alto Networks', 'Fortinet', 'Cisco Secure', 'VMware NSX', 'Illumio', 'CrowdStrike'],
    benefits: [
      { title: 'Attack Surface', metric: '80% reduction' },
      { title: 'Breach Detection', metric: 'Minutes vs. months' },
      { title: 'Compliance', metric: 'Audit-ready always' },
    ],
    seo: {
      metaTitle: 'Secure Enterprise Datacenter',
      metaDescription:
        'Enterprise datacenter security: zero trust, micro-segmentation, HA firewalls, and compliance-ready designs for NCA ECC, SAMA CSF, and PCI DSS.',
      keywords: ['datacenter security', 'Zero Trust', 'micro-segmentation', 'enterprise security', 'compliance'],
    },
  },
  {
    id: '4',
    slug: 'intelligent-network-automation',
    heroImage: '/images/solutions/intelligent-network-automation.webp',
    title: 'Intelligent Network Automation',
    tagline: 'Transform operations with AI-driven automation',
    description:
      'End-to-end network automation platform combining infrastructure-as-code, AI-assisted troubleshooting, and self-healing capabilities.',
    icon: 'Cpu',
    category: 'automation',
    features: [
      {
        id: '1',
        title: 'Configuration Automation',
        description: 'Infrastructure-as-code with version control, drift detection, and compliance validation.',
        icon: 'Code2',
      },
      {
        id: '2',
        title: 'Automated Health Checks',
        description: 'Continuous validation of network state with automated remediation workflows.',
        icon: 'HeartPulse',
      },
      {
        id: '3',
        title: 'AI-Assisted Troubleshooting',
        description: 'Natural language interface for diagnostics with root cause analysis powered by ML.',
        icon: 'Sparkles',
      },
      {
        id: '4',
        title: 'Change Management',
        description: 'Pre-change validation, automated rollback, and post-change verification.',
        icon: 'GitBranch',
      },
      {
        id: '5',
        title: 'Intent-Based Networking',
        description: 'Define business intent and let automation handle implementation details.',
        icon: 'Target',
      },
      {
        id: '6',
        title: 'Multi-Vendor Support',
        description: 'Unified automation across Cisco, Juniper, Arista, and cloud providers.',
        icon: 'Boxes',
      },
    ],
    useCases: [
      {
        id: '1',
        industry: 'Service Providers',
        scenario: 'ISP managing 10,000+ network devices across multiple regions',
        outcome: 'Reduced configuration time by 90% and eliminated manual errors',
      },
      {
        id: '2',
        industry: 'Enterprise',
        scenario: 'Global company standardizing network operations across acquisitions',
        outcome: 'Achieved configuration consistency across 500+ sites in 6 months',
      },
      {
        id: '3',
        industry: 'Cloud-Native',
        scenario: 'Multi-cloud environment requiring consistent network policies',
        outcome: 'Implemented unified policy management across AWS, Azure, and on-prem',
      },
    ],
    deliverables: [
      { id: '1', title: 'Automation Platform Setup', description: 'IaC and automation tooling deployment', included: true },
      { id: '2', title: 'Custom Playbooks', description: 'Tailored automation workflows', included: true },
      { id: '3', title: 'Integration Development', description: 'Integrations with existing systems', included: true },
      { id: '4', title: 'Team Enablement', description: 'Training and handover', included: true },
    ],
    relatedSolutions: ['ai-uc-monitoring', 'secure-enterprise-datacenter'],
    relatedServices: ['network-solutions', 'software-solutions', 'ai-solutions'],
    technologies: ['Ansible', 'Terraform', 'Python', 'Cisco NSO', 'Juniper Apstra', 'Arista CloudVision'],
    benefits: [
      { title: 'Deployment Speed', metric: '10x faster changes' },
      { title: 'Error Reduction', metric: '95% fewer misconfigurations' },
      { title: 'Operational Efficiency', metric: '60% time savings' },
    ],
    seo: {
      metaTitle: 'Intelligent Network Automation',
      metaDescription:
        'Network automation with AI. Infrastructure-as-code, automated health checks, AI troubleshooting, and intent-based networking.',
      keywords: ['network automation', 'infrastructure as code', 'Ansible', 'Terraform', 'intent-based networking'],
    },
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionsByCategory(category: string): Solution[] {
  return solutions.filter((s) => s.category === category);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
