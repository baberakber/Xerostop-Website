export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceList {
  title: string;
  icon: string;
  items: string[];
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
  heroImage: string;

  // BTC-style service page template
  keyOfferings: ServiceFeature[];
  serviceLists: [ServiceList, ServiceList];
  capabilitiesTitle: string;
  capabilities: ServiceFeature[];
  cta: { title: string; description: string; button: string };

  // Consulting model phases
  consult: ServiceOffering[];
  design: ServiceOffering[];
  deliver: ServiceOffering[];

  benefits: string[];
  useCases: string[];
  technologies: string[];
  relatedServices: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const services: ServiceCategory[] = [
  {
    id: '1',
    slug: 'unified-communications',
    title: 'Unified Communications',
    shortTitle: 'UC',
    tagline: 'Connect your enterprise with seamless voice, video, and collaboration',
    description:
      'Enterprise-grade voice, video, contact center, and collaboration platforms that unify how your people and customers communicate.',
    icon: 'Phone',
    gradient: 'from-blue-500 to-cyan-500',
    heroImage: '/images/services/unified-communications.webp',
    keyOfferings: [
      { icon: 'Phone', title: 'Enterprise Voice', description: 'IP telephony, SIP trunking, and cloud calling for every site' },
      { icon: 'Video', title: 'Video & Meetings', description: 'HD conferencing rooms and meeting platforms that just work' },
      { icon: 'Headphones', title: 'Contact Center', description: 'Omnichannel customer engagement with AI-assisted routing' },
      { icon: 'MessageSquare', title: 'Team Collaboration', description: 'Messaging, presence, and file sharing in one workspace' },
    ],
    serviceLists: [
      {
        title: 'Communication Services',
        icon: 'Phone',
        items: [
          'IP PBX and cloud calling deployment',
          'SIP trunking and Session Border Controllers',
          'Microsoft Teams Direct Routing & Operator Connect',
          'Video conferencing room design and integration',
          'Legacy PBX migration and number porting',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'Call recording and compliance archiving',
          'Omnichannel contact center with IVR & AI bots',
          'Speech analytics and quality monitoring',
          'Active-active HA and geo-redundant DR for voice',
          'CRM and ERP integration for click-to-call',
        ],
      },
    ],
    capabilitiesTitle: 'Enterprise UC Capabilities',
    capabilities: [
      { icon: 'Activity', title: 'High Availability', description: '99.99% uptime architecture' },
      { icon: 'Lock', title: 'Secure Media', description: 'TLS & SRTP encryption' },
      { icon: 'Mic', title: 'HD Quality', description: 'Wideband audio & 4K video' },
      { icon: 'Globe', title: 'Multi-Site', description: 'Centralized global dial plans' },
      { icon: 'Cloud', title: 'Cloud & Hybrid', description: 'On-prem, cloud, or both' },
      { icon: 'FileCheck', title: 'Compliance', description: 'Recording & retention ready' },
      { icon: 'BarChart3', title: 'Analytics', description: 'Call quality insights' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Unify the Way Your Enterprise Communicates',
      description: 'Modernize voice, video, and contact center with an architecture designed for reliability and compliance.',
      button: 'Modernize Your UC',
    },
    consult: [
      { title: 'UC Architecture Assessment', description: 'Evaluate current communication infrastructure and identify optimization opportunities' },
      { title: 'Compliance & Regulatory Review', description: 'Assess call recording, retention, and compliance requirements' },
      { title: 'Vendor Selection & Strategy', description: 'Compare platforms and recommend optimal solutions' },
      { title: 'Migration Planning', description: 'Develop comprehensive migration strategies from legacy systems' },
    ],
    design: [
      { title: 'UC Architecture Design', description: 'Design scalable, resilient unified communications architecture' },
      { title: 'Call Recording & Compliance', description: 'Design compliant call recording solutions' },
      { title: 'HA & DR for Voice', description: 'Design high availability and disaster recovery solutions' },
      { title: 'Cloud & Hybrid UC', description: 'Architect cloud-native and hybrid UC deployments' },
    ],
    deliver: [
      { title: 'Platform Deployment', description: 'End-to-end implementation of UC platforms' },
      { title: 'Integration Services', description: 'Connect UC with CRM, ERP, and collaboration tools' },
      { title: 'Training & Enablement', description: 'Comprehensive user training programs' },
      { title: 'Managed Services', description: 'Ongoing monitoring and optimization' },
    ],
    benefits: ['Reduce communication costs by up to 50%', 'Increase team productivity', 'Ensure 99.99% uptime', 'Meet compliance requirements', 'Scale seamlessly'],
    useCases: ['Enterprise voice migration', 'Contact center modernization', 'Remote workforce enablement', 'Multi-site consolidation'],
    technologies: ['Microsoft Teams', 'Cisco Webex', 'Zoom', 'Genesys Cloud', 'Avaya', 'AudioCodes', 'Ribbon', 'Poly'],
    relatedServices: ['customer-experience', 'security-solutions'],
    metaTitle: 'Unified Communications Services in Saudi Arabia',
    metaDescription: 'Enterprise unified communications consulting in Saudi Arabia: Microsoft Teams, Cisco and Webex voice, video, contact center, and secure collaboration design.',
    keywords: ['unified communications', 'UC solutions', 'VoIP', 'enterprise voice', 'contact center'],
  },
  {
    id: '2',
    slug: 'datacenter-solutions',
    title: 'Datacenter Solutions',
    shortTitle: 'DC',
    tagline: 'Build the foundation for your digital transformation',
    description:
      'Modern datacenter infrastructure with compute, storage, virtualization, and resilience engineered for mission-critical workloads.',
    icon: 'Server',
    gradient: 'from-purple-500 to-pink-500',
    heroImage: '/images/services/datacenter-solutions.webp',
    keyOfferings: [
      { icon: 'Cpu', title: 'Compute', description: 'High-performance servers and hyperconverged platforms' },
      { icon: 'HardDrive', title: 'Storage', description: 'All-flash, tiered, and object storage architectures' },
      { icon: 'Layers', title: 'Virtualization', description: 'VMware, Hyper-V, and Nutanix private cloud platforms' },
      { icon: 'RefreshCw', title: 'Backup & DR', description: 'Resilient protection with defined RPO and RTO' },
    ],
    serviceLists: [
      {
        title: 'Infrastructure Services',
        icon: 'Server',
        items: [
          'Datacenter assessment and capacity planning',
          'Server, storage, and SAN deployment',
          'Hyperconverged infrastructure (HCI) rollout',
          'Rack, power, and cooling design coordination',
          'Workload migration with minimal downtime',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'Private and hybrid cloud platforms',
          'Active-active and stretched clusters',
          'Disaster recovery site design and runbooks',
          'Immutable backups and ransomware recovery',
          'Infrastructure-as-code automation',
        ],
      },
    ],
    capabilitiesTitle: 'Enterprise Datacenter Capabilities',
    capabilities: [
      { icon: 'Gauge', title: 'High Performance', description: 'NVMe & low-latency fabrics' },
      { icon: 'Boxes', title: 'Scalability', description: 'Scale-out as you grow' },
      { icon: 'Activity', title: 'Reliability', description: 'N+1 redundant design' },
      { icon: 'ShieldCheck', title: 'Security', description: 'Segmented & hardened' },
      { icon: 'Cloud', title: 'Hybrid Ready', description: 'Seamless cloud extension' },
      { icon: 'Eye', title: 'Visibility', description: 'Unified monitoring' },
      { icon: 'Workflow', title: 'Automation', description: 'Policy-driven operations' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Build a Resilient, Future-Ready Datacenter',
      description: 'Consolidate, modernize, and protect your critical workloads with an architecture built for availability.',
      button: 'Modernize Your Datacenter',
    },
    consult: [
      { title: 'Infrastructure Assessment', description: 'Comprehensive evaluation of existing datacenter' },
      { title: 'Capacity Planning', description: 'Project future growth and plan investments' },
      { title: 'TCO Analysis', description: 'Analyze total cost of ownership options' },
      { title: 'Modernization Strategy', description: 'Develop datacenter transformation roadmap' },
    ],
    design: [
      { title: 'Compute Architecture', description: 'Design high-performance compute infrastructure' },
      { title: 'Storage Solutions', description: 'Architect tiered storage with appropriate tiers' },
      { title: 'Virtualization Platform', description: 'Design VMware, Hyper-V, or Nutanix environments' },
      { title: 'HA & DR Design', description: 'Create resilient architectures with RPO/RTO' },
    ],
    deliver: [
      { title: 'Hardware Deployment', description: 'Procure, rack, and configure infrastructure' },
      { title: 'Platform Implementation', description: 'Deploy virtualization and management platforms' },
      { title: 'Migration Services', description: 'Execute workload migrations with minimal downtime' },
      { title: 'Operational Handoff', description: 'Document and transition to operations teams' },
    ],
    benefits: ['Optimize utilization to 80%+', 'Reduce unplanned downtime by 90%', 'Accelerate deployment', 'Lower energy costs', 'Enable rapid DR'],
    useCases: ['Datacenter consolidation', 'Private cloud implementation', 'DR site buildout', 'Infrastructure refresh'],
    technologies: ['VMware vSphere', 'Microsoft Hyper-V', 'Nutanix', 'Dell Technologies', 'HPE', 'Pure Storage', 'NetApp', 'Veeam'],
    relatedServices: ['managed-services', 'network-solutions'],
    metaTitle: 'Datacenter Solutions & Virtualization',
    metaDescription: 'Enterprise datacenter consulting, design, and implementation in Saudi Arabia: compute, storage, virtualization, high availability, and disaster recovery.',
    keywords: ['datacenter solutions', 'virtualization', 'storage', 'compute', 'disaster recovery'],
  },
  {
    id: '3',
    slug: 'network-solutions',
    title: 'Network Solutions',
    shortTitle: 'NET',
    tagline: 'Connect every user, device, and application securely',
    description:
      'Next-generation enterprise networks combining LAN, WAN, wireless, and SD-WAN for reliable, high-performance connectivity.',
    icon: 'Network',
    gradient: 'from-green-500 to-teal-500',
    heroImage: '/images/services/network-solutions.webp',
    keyOfferings: [
      { icon: 'Network', title: 'LAN / WAN', description: 'Enterprise-grade local and wide area networks' },
      { icon: 'Wifi', title: 'Wireless', description: 'High-performance Wi-Fi 6/6E and 7 infrastructure' },
      { icon: 'GitBranch', title: 'SDN', description: 'Software-defined datacenter and campus fabrics' },
      { icon: 'Router', title: 'SD-WAN', description: 'Secure, application-aware multi-site connectivity' },
    ],
    serviceLists: [
      {
        title: 'Infrastructure Services',
        icon: 'Cable',
        items: [
          'Network assessment and bandwidth planning',
          'Campus and branch network design',
          'Routing, switching, and wireless deployment',
          'Structured cabling coordination and site surveys',
          'Network migration with minimal disruption',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'SD-WAN and SASE transformation',
          'Datacenter fabrics (EVPN-VXLAN, spine-leaf)',
          'Network access control and segmentation',
          'Cloud connectivity and multi-cloud networking',
          'AI-assisted network automation and assurance',
        ],
      },
    ],
    capabilitiesTitle: 'Enterprise Network Capabilities',
    capabilities: [
      { icon: 'Gauge', title: 'High Performance', description: 'Multi-gigabit speeds' },
      { icon: 'Boxes', title: 'Scalability', description: 'Grows with your business' },
      { icon: 'Activity', title: 'Reliability', description: '99.99% uptime design' },
      { icon: 'ShieldCheck', title: 'Security', description: 'Built-in threat protection' },
      { icon: 'Cloud', title: 'Flexibility', description: 'Cloud-managed options' },
      { icon: 'Eye', title: 'Visibility', description: 'Real-time monitoring' },
      { icon: 'Zap', title: 'Automation', description: 'Zero-touch provisioning' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Build a Future-Ready Network',
      description: 'Transform your network infrastructure with secure, automated, and high-performance connectivity.',
      button: 'Upgrade Your Network',
    },
    consult: [
      { title: 'Network Assessment', description: 'Analysis of network performance and architecture' },
      { title: 'Bandwidth Planning', description: 'Project network requirements based on growth' },
      { title: 'WAN Optimization Strategy', description: 'Evaluate options for improving WAN performance' },
      { title: 'SD-WAN Readiness', description: 'Assess readiness for SD-WAN transformation' },
    ],
    design: [
      { title: 'Enterprise Network Design', description: 'Design resilient LAN/WAN architectures' },
      { title: 'Campus Network Design', description: 'Architect modern campus networks' },
      { title: 'WAN Architecture', description: 'Design hybrid WAN solutions' },
      { title: 'SD-WAN Design', description: 'Architect software-defined WAN for agility' },
    ],
    deliver: [
      { title: 'Network Implementation', description: 'Deploy switches, routers, and wireless' },
      { title: 'SD-WAN Deployment', description: 'Implement SD-WAN overlays' },
      { title: 'Network Migration', description: 'Execute migrations with minimal disruption' },
      { title: 'Performance Optimization', description: 'Tune network for optimal performance' },
    ],
    benefits: ['Reduce WAN costs by 30-50%', 'Improve application performance', 'Enable cloud connectivity', 'Simplify management', 'Accelerate branch deployments'],
    useCases: ['SD-WAN transformation', 'Campus network refresh', 'Branch connectivity', 'Cloud connectivity'],
    technologies: ['Cisco', 'Arista', 'Juniper', 'HPE Aruba', 'Fortinet', 'Palo Alto Networks', 'Extreme Networks', 'VMware VeloCloud'],
    relatedServices: ['low-current-systems', 'security-solutions'],
    metaTitle: 'Enterprise Network & SD-WAN Solutions',
    metaDescription: 'Enterprise network consulting, design, and implementation across Saudi Arabia and the GCC: campus LAN, WAN, wireless, SDN, SD-WAN, and network automation.',
    keywords: ['network solutions', 'SD-WAN', 'enterprise network', 'WAN optimization', 'wireless'],
  },
  {
    id: '4',
    slug: 'security-solutions',
    title: 'Security Solutions',
    shortTitle: 'SEC',
    tagline: 'Protect your business with defense in depth',
    description:
      'Comprehensive cybersecurity spanning network, identity, endpoints, and communications, built on zero trust principles.',
    icon: 'Shield',
    gradient: 'from-red-500 to-orange-500',
    heroImage: '/images/services/security-solutions.webp',
    keyOfferings: [
      { icon: 'Shield', title: 'Network Security', description: 'Next-gen firewalls, IPS, and secure segmentation' },
      { icon: 'Fingerprint', title: 'Identity & Access', description: 'SSO, MFA, and privileged access management' },
      { icon: 'Lock', title: 'Zero Trust', description: 'Verify explicitly, least privilege, assume breach' },
      { icon: 'Radar', title: 'Detection & Response', description: 'SIEM, EDR, and security operations' },
    ],
    serviceLists: [
      {
        title: 'Security Services',
        icon: 'ShieldCheck',
        items: [
          'Security posture and risk assessments',
          'Firewall, IPS, and secure gateway deployment',
          'Identity, SSO, and MFA implementation',
          'Endpoint protection and hardening',
          'Compliance gap analysis (ISO 27001, NCA ECC, PCI DSS)',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'Zero trust network access (ZTNA) and SASE',
          'SIEM / SOAR and SOC enablement',
          'UC and voice security (SBC, SRTP, toll-fraud)',
          'Micro-segmentation for datacenter workloads',
          'Incident response planning and tabletop exercises',
        ],
      },
    ],
    capabilitiesTitle: 'Enterprise Security Capabilities',
    capabilities: [
      { icon: 'Lock', title: 'Zero Trust', description: 'Identity-centric access' },
      { icon: 'Eye', title: '24/7 Visibility', description: 'Continuous monitoring' },
      { icon: 'Radar', title: 'Threat Intel', description: 'Proactive threat hunting' },
      { icon: 'Siren', title: 'Rapid Response', description: 'Defined IR playbooks' },
      { icon: 'KeyRound', title: 'Encryption', description: 'Data in transit & at rest' },
      { icon: 'FileCheck', title: 'Compliance', description: 'Audit-ready controls' },
      { icon: 'Workflow', title: 'Automation', description: 'SOAR-driven workflows' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Strengthen Your Security Posture',
      description: 'Protect your users, data, and infrastructure with layered defenses and zero trust architecture.',
      button: 'Secure Your Enterprise',
    },
    consult: [
      { title: 'Security Assessment', description: 'Comprehensive evaluation of security posture' },
      { title: 'Risk Analysis', description: 'Identify and prioritize security risks' },
      { title: 'Compliance Gap Analysis', description: 'Assess compliance with frameworks' },
      { title: 'Security Strategy', description: 'Develop security program roadmap' },
    ],
    design: [
      { title: 'Network Security', description: 'Design firewall and IDS/IPS architectures' },
      { title: 'UC Security', description: 'Design secure voice and collaboration infrastructure' },
      { title: 'Identity & Access Management', description: 'Architect IAM and SSO solutions' },
      { title: 'Zero Trust Architecture', description: 'Design zero trust network access' },
    ],
    deliver: [
      { title: 'Security Implementation', description: 'Deploy firewalls, SIEM, EDR' },
      { title: 'IAM Deployment', description: 'Implement identity providers and MFA' },
      { title: 'Security Monitoring', description: 'Stand up security operations' },
      { title: 'Incident Response', description: 'Develop and test IR procedures' },
    ],
    benefits: ['Reduce incidents by 70%', 'Achieve compliance certifications', 'Minimize breach impact', 'Enable secure remote work', 'Protect brand reputation'],
    useCases: ['Zero trust implementation', 'SOC/SIEM deployment', 'Identity modernization', 'Compliance programs'],
    technologies: ['Palo Alto Networks', 'Fortinet', 'CrowdStrike', 'Okta', 'Microsoft Entra ID', 'Splunk', 'Zscaler', 'Check Point'],
    relatedServices: ['network-solutions', 'unified-communications'],
    metaTitle: 'Cybersecurity & Zero Trust Solutions',
    metaDescription: 'Cybersecurity consulting and implementation for Saudi enterprises: zero trust, identity, firewalls, SOC operations, and NCA ECC and SAMA compliance.',
    keywords: ['security solutions', 'zero trust', 'IAM', 'network security', 'SIEM'],
  },
  {
    id: '5',
    slug: 'software-solutions',
    title: 'Software Solutions',
    shortTitle: 'SW',
    tagline: 'Build the tools that transform your operations',
    description:
      'Custom applications, integrations, automation workflows, and operational dashboards tailored to how your teams work.',
    icon: 'Code',
    gradient: 'from-yellow-500 to-amber-500',
    heroImage: '/images/services/software-solutions.webp',
    keyOfferings: [
      { icon: 'Code', title: 'Custom Applications', description: 'Secure web and mobile apps built for your workflows' },
      { icon: 'Workflow', title: 'Process Automation', description: 'Eliminate repetitive work across IT and business' },
      { icon: 'LayoutDashboard', title: 'Dashboards', description: 'Real-time operational and executive visibility' },
      { icon: 'Plug', title: 'APIs & Integration', description: 'Connect systems, data, and platforms reliably' },
    ],
    serviceLists: [
      {
        title: 'Development Services',
        icon: 'Code',
        items: [
          'Requirements analysis and solution design',
          'Web portals and internal business applications',
          'API design, development, and documentation',
          'Database design and data migration',
          'QA, testing, and secure code review',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'IT operations automation (Ansible, Terraform)',
          'Integration middleware for UC, CRM, and ERP',
          'Monitoring dashboards with Grafana and Power BI',
          'Self-service portals and workflow engines',
          'CI/CD pipelines and DevOps enablement',
        ],
      },
    ],
    capabilitiesTitle: 'Software Engineering Capabilities',
    capabilities: [
      { icon: 'Zap', title: 'Agile Delivery', description: 'Iterative, fast releases' },
      { icon: 'ShieldCheck', title: 'Secure by Design', description: 'OWASP-aligned practices' },
      { icon: 'Boxes', title: 'Scalable', description: 'Cloud-native architecture' },
      { icon: 'Plug', title: 'Integrated', description: 'API-first approach' },
      { icon: 'Workflow', title: 'Automation', description: 'CI/CD pipelines' },
      { icon: 'BarChart3', title: 'Data-Driven', description: 'Analytics built in' },
      { icon: 'Users', title: 'User-Centric', description: 'Intuitive UX design' },
      { icon: 'Wrench', title: 'Maintenance', description: 'Ongoing support & updates' },
    ],
    cta: {
      title: 'Turn Manual Work Into Smart Software',
      description: 'Build applications, integrations, and dashboards that give your teams time and visibility back.',
      button: 'Start Your Project',
    },
    consult: [
      { title: 'Requirements Analysis', description: 'Gather and analyze business requirements' },
      { title: 'Technology Assessment', description: 'Evaluate technology options' },
      { title: 'Integration Planning', description: 'Plan integrations with existing systems' },
      { title: 'Build vs Buy Analysis', description: 'Analyze custom vs commercial options' },
    ],
    design: [
      { title: 'Custom Application Design', description: 'Design bespoke applications' },
      { title: 'Automation Workflows', description: 'Design process automation' },
      { title: 'Operational Dashboards', description: 'Design real-time dashboards' },
      { title: 'API Architecture', description: 'Design APIs for integration' },
    ],
    deliver: [
      { title: 'Application Development', description: 'Build and deploy custom applications' },
      { title: 'Automation Implementation', description: 'Implement automation workflows' },
      { title: 'Dashboard Deployment', description: 'Deploy monitoring dashboards' },
      { title: 'Ongoing Support', description: 'Provide maintenance and updates' },
    ],
    benefits: ['Reduce manual effort by 60%', 'Improve visibility', 'Accelerate decisions', 'Eliminate data silos', 'Enable self-service'],
    useCases: ['IT operations automation', 'Custom reporting portals', 'Integration middleware', 'Monitoring dashboards'],
    technologies: ['Python', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Ansible', 'Terraform', 'Grafana'],
    relatedServices: ['ai-solutions', 'datacenter-solutions'],
    metaTitle: 'Custom Software & Automation Solutions',
    metaDescription: 'Custom software development for enterprises: workflow automation, system integration, operational dashboards, and internal tools built around your processes.',
    keywords: ['custom software', 'automation', 'dashboards', 'API development'],
  },
  {
    id: '6',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    shortTitle: 'AI',
    tagline: 'Harness artificial intelligence to amplify your capabilities',
    description:
      'Practical AI for the enterprise: intelligent agents, analytics, and AIOps that automate operations and surface insights.',
    icon: 'Brain',
    gradient: 'from-cyan-500 to-blue-500',
    heroImage: '/images/services/ai-solutions.webp',
    keyOfferings: [
      { icon: 'Bot', title: 'AI Agents', description: 'Conversational and task agents for IT and customers' },
      { icon: 'BarChart3', title: 'Intelligent Analytics', description: 'Predictive insights from your operational data' },
      { icon: 'Activity', title: 'AIOps Monitoring', description: 'Anomaly detection and proactive alerting' },
      { icon: 'Workflow', title: 'Intelligent Automation', description: 'AI-enhanced workflows and decisioning' },
    ],
    serviceLists: [
      {
        title: 'AI Services',
        icon: 'Brain',
        items: [
          'AI readiness and use-case discovery workshops',
          'Data readiness, quality, and governance assessment',
          'AI agent and chatbot development',
          'Retrieval-augmented generation (RAG) on your knowledge',
          'Model evaluation, safety, and guardrails',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'AIOps for UC, network, and datacenter monitoring',
          'Speech and sentiment analytics for contact centers',
          'Log analysis and intelligent incident triage',
          'Predictive maintenance and capacity forecasting',
          'MLOps pipelines and model lifecycle management',
        ],
      },
    ],
    capabilitiesTitle: 'Enterprise AI Capabilities',
    capabilities: [
      { icon: 'Brain', title: 'Generative AI', description: 'LLM-powered assistants' },
      { icon: 'TrendingUp', title: 'Predictive', description: 'Forecast before failure' },
      { icon: 'Search', title: 'Knowledge Search', description: 'RAG on your content' },
      { icon: 'Zap', title: 'Real-Time', description: 'Streaming insights' },
      { icon: 'ShieldCheck', title: 'Responsible AI', description: 'Governance & guardrails' },
      { icon: 'Lock', title: 'Private Data', description: 'Secure, compliant hosting' },
      { icon: 'Workflow', title: 'Automation', description: 'Agentic workflows' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Put AI to Work in Your Operations',
      description: 'Move from AI experiments to production outcomes with secure, measurable, and well-governed solutions.',
      button: 'Explore AI Use Cases',
    },
    consult: [
      { title: 'AI Readiness Assessment', description: 'Evaluate organizational readiness for AI' },
      { title: 'Use Case Identification', description: 'Identify high-value AI use cases' },
      { title: 'Data Readiness', description: 'Assess data quality and governance' },
      { title: 'AI Strategy Development', description: 'Create AI adoption roadmap' },
    ],
    design: [
      { title: 'AI Agent Design', description: 'Design intelligent agents for operations' },
      { title: 'Analytics Architecture', description: 'Design AI-powered analytics platforms' },
      { title: 'Intelligent Automation', description: 'Design AI-enhanced automation' },
      { title: 'AI Monitoring', description: 'Design AIOps solutions' },
    ],
    deliver: [
      { title: 'AI Agent Deployment', description: 'Build and deploy conversational AI' },
      { title: 'Analytics Implementation', description: 'Implement ML models and pipelines' },
      { title: 'AIOps Deployment', description: 'Deploy AI-powered monitoring' },
      { title: 'Model Management', description: 'Establish MLOps practices' },
    ],
    benefits: ['Reduce response time by 80%', 'Automate 50% of routine tasks', 'Enable predictive maintenance', 'Improve customer experience', 'Accelerate insights'],
    useCases: ['IT helpdesk automation', 'Predictive monitoring', 'Log analysis', 'Intelligent alerting'],
    technologies: ['OpenAI', 'Azure AI', 'AWS Bedrock', 'LangChain', 'Hugging Face', 'Datadog', 'Splunk ITSI', 'Python ML Stack'],
    relatedServices: ['software-solutions', 'datacenter-solutions'],
    metaTitle: 'Enterprise AI Solutions, Agents & AIOps',
    metaDescription: 'Enterprise AI consulting and implementation in Saudi Arabia: AI agents, intelligent analytics, AIOps monitoring, and secure, governed generative AI adoption.',
    keywords: ['AI solutions', 'AI agents', 'AIOps', 'intelligent automation'],
  },
  {
    id: '7',
    slug: 'customer-experience',
    title: 'Customer Experience',
    shortTitle: 'CX',
    tagline: 'Turn every customer interaction into a lasting relationship',
    description:
      'AI-powered contact center and omnichannel engagement platforms that help you serve customers faster, smarter, and on the channels they prefer.',
    icon: 'Headphones',
    gradient: 'from-sky-500 to-blue-600',
    heroImage: '/images/services/customer-experience.webp',
    keyOfferings: [
      { icon: 'Headphones', title: 'Contact Center', description: 'Cloud and hybrid contact centers with built-in AI capabilities' },
      { icon: 'MessagesSquare', title: 'Omnichannel', description: 'Voice, chat, email, social, and messaging in one unified journey' },
      { icon: 'BarChart3', title: 'Analytics', description: 'Real-time customer insights, KPIs, and performance reporting' },
      { icon: 'Plug', title: 'CRM Integration', description: 'Seamless context sharing with your CRM and business systems' },
    ],
    serviceLists: [
      {
        title: 'CX Platform Services',
        icon: 'Headphones',
        items: [
          'Automatic call distribution and skills-based routing',
          'Interactive voice response (IVR) and self-service',
          'Call and screen recording for quality and compliance',
          'Quality monitoring and agent evaluation',
          'Workforce management and real-time dashboards',
        ],
      },
      {
        title: 'Advanced Solutions',
        icon: 'Sparkles',
        items: [
          'AI-powered chatbots and virtual agents',
          'Voice recognition and speech analytics',
          'Sentiment analysis and customer journey mapping',
          'Social media and messaging app integration',
          'Multi-language support for regional customers',
        ],
      },
    ],
    capabilitiesTitle: 'Complete CX Capabilities',
    capabilities: [
      { icon: 'Bot', title: 'AI Assistance', description: 'Bots & agent assist' },
      { icon: 'Route', title: 'Smart Routing', description: 'Right agent, first time' },
      { icon: 'Mic', title: 'Speech Analytics', description: 'Insights from every call' },
      { icon: 'Languages', title: 'Multi-Language', description: 'Arabic, English & more' },
      { icon: 'ScreenShare', title: 'Recording', description: 'Voice & screen capture' },
      { icon: 'LayoutDashboard', title: 'Live Dashboards', description: 'Real-time KPIs' },
      { icon: 'Users', title: 'Workforce Mgmt', description: 'Forecast & schedule' },
      { icon: 'Headphones', title: 'Support', description: '24/7 expert assistance' },
    ],
    cta: {
      title: 'Elevate Your Customer Experience',
      description: 'Deliver faster, more personal service across every channel with a modern, AI-ready contact center.',
      button: 'Transform Your CX',
    },
    consult: [
      { title: 'CX Maturity Assessment', description: 'Evaluate channels, journeys, and contact center performance' },
      { title: 'Customer Journey Review', description: 'Map pain points and moments that matter' },
      { title: 'Platform Selection', description: 'Compare cloud and on-prem CX platforms objectively' },
      { title: 'Business Case', description: 'Quantify cost, efficiency, and satisfaction gains' },
    ],
    design: [
      { title: 'Omnichannel Architecture', description: 'Design unified routing across voice and digital channels' },
      { title: 'IVR & Self-Service Flows', description: 'Design intuitive, multi-language self-service journeys' },
      { title: 'Integration Design', description: 'Connect CRM, ticketing, and back-office systems' },
      { title: 'Analytics & Reporting', description: 'Define KPIs, dashboards, and quality frameworks' },
    ],
    deliver: [
      { title: 'Platform Deployment', description: 'Implement and configure the contact center platform' },
      { title: 'AI & Bot Enablement', description: 'Launch chatbots, agent assist, and speech analytics' },
      { title: 'Agent Training', description: 'Onboard supervisors and agents to new workflows' },
      { title: 'Continuous Optimization', description: 'Tune routing, flows, and quality over time' },
    ],
    benefits: ['Shorter wait and handling times', 'Higher first-contact resolution', 'Consistent experience on every channel', 'Better agent productivity', 'Actionable customer insights'],
    useCases: ['Contact center modernization', 'Cloud CX migration', 'Digital channel expansion', 'Self-service automation'],
    technologies: ['Webex Contact Center', 'Genesys Cloud', 'Sprinklr', 'Microsoft Dynamics 365', 'Salesforce', 'Zendesk', 'Avaya', 'NICE'],
    relatedServices: ['unified-communications', 'ai-solutions'],
    metaTitle: 'Contact Center & Customer Experience',
    metaDescription: 'AI-powered contact center and omnichannel customer experience consulting, design, and delivery, from IVR and routing to analytics and quality management.',
    keywords: ['customer experience', 'contact center', 'omnichannel', 'IVR', 'CX'],
  },
  {
    id: '8',
    slug: 'managed-services',
    title: 'Managed Services',
    shortTitle: 'MSP',
    tagline: 'Focus on your business while we run your technology',
    description:
      'Proactive, around-the-clock management and support for your infrastructure, applications, security, and cloud, delivered under clear service levels.',
    icon: 'ServerCog',
    gradient: 'from-blue-500 to-indigo-600',
    heroImage: '/images/services/managed-services.webp',
    keyOfferings: [
      { icon: 'Server', title: 'Infrastructure Management', description: 'Servers, storage, and network operated and maintained for you' },
      { icon: 'Monitor', title: 'Application Support', description: 'Proactive monitoring and maintenance of business applications' },
      { icon: 'ShieldCheck', title: 'Security Management', description: 'Continuous security monitoring and threat management' },
      { icon: 'CloudCog', title: 'Cloud Management', description: 'End-to-end cloud operations, governance, and cost optimization' },
    ],
    serviceLists: [
      {
        title: 'Managed Operations',
        icon: 'ServerCog',
        items: [
          '24/7 monitoring, alerting, and incident response',
          'Help desk and end-user technical support',
          'Patch, update, and configuration management',
          'Automated backup and disaster recovery',
          'Capacity planning and performance reporting',
        ],
      },
      {
        title: 'Service Tiers',
        icon: 'Layers',
        items: [
          'Essential: business-hours support, monitoring, monthly reports',
          'Professional: 24/7 support, advanced monitoring, weekly reports',
          'Enterprise: dedicated account manager and real-time reporting',
          'Priority response with defined SLAs at every tier',
          'Flexible scope that scales as your environment grows',
        ],
      },
    ],
    capabilitiesTitle: 'Why Choose Managed Services',
    capabilities: [
      { icon: 'Clock', title: '24/7 Coverage', description: 'Always-on operations' },
      { icon: 'Eye', title: 'Proactive Monitoring', description: 'Issues fixed early' },
      { icon: 'ClipboardCheck', title: 'Clear SLAs', description: 'Measurable service levels' },
      { icon: 'Ticket', title: 'Help Desk', description: 'Single point of contact' },
      { icon: 'DatabaseBackup', title: 'Backup & Recovery', description: 'Tested restore plans' },
      { icon: 'FileBarChart', title: 'Reporting', description: 'Transparent insights' },
      { icon: 'TrendingUp', title: 'Predictable Cost', description: 'Fixed monthly pricing' },
      { icon: 'LifeBuoy', title: 'Expert Team', description: 'Certified engineers' },
    ],
    cta: {
      title: 'Let Us Manage Your IT',
      description: 'Partner with us for reliable, proactive IT management and support, so your team can focus on growth.',
      button: 'Get Started Today',
    },
    consult: [
      { title: 'Operations Assessment', description: 'Review current support model, tooling, and pain points' },
      { title: 'Service Scoping', description: 'Define services, coverage hours, and responsibilities' },
      { title: 'SLA Definition', description: 'Agree response, resolution, and availability targets' },
      { title: 'Transition Planning', description: 'Plan a low-risk handover to managed operations' },
    ],
    design: [
      { title: 'Monitoring Architecture', description: 'Design end-to-end observability and alerting' },
      { title: 'Service Desk Processes', description: 'Design ITIL-aligned incident and change workflows' },
      { title: 'Backup & DR Runbooks', description: 'Design recovery procedures and test schedules' },
      { title: 'Reporting Framework', description: 'Define dashboards and service reviews' },
    ],
    deliver: [
      { title: 'Onboarding & Transition', description: 'Document, baseline, and take over operations' },
      { title: '24/7 Operations', description: 'Monitor, maintain, and resolve incidents' },
      { title: 'Service Reviews', description: 'Regular reporting and improvement plans' },
      { title: 'Continuous Improvement', description: 'Automate and optimize over time' },
    ],
    benefits: ['Reduce unplanned downtime', 'Predictable monthly IT costs', 'Access to certified specialists', 'Faster incident resolution', 'Free internal teams for strategic work'],
    useCases: ['Infrastructure outsourcing', 'Out-of-hours support', 'Cloud operations', 'Security monitoring'],
    technologies: ['ServiceNow', 'Microsoft Azure', 'AWS', 'VMware', 'Veeam', 'Zabbix', 'Datadog', 'ManageEngine'],
    relatedServices: ['datacenter-solutions', 'security-solutions'],
    metaTitle: 'Managed IT Services & 24/7 Operations',
    metaDescription: 'Proactive 24/7 managed IT services for Saudi enterprises: infrastructure, UC, network, security, and cloud monitoring and support with clear in-Kingdom SLAs.',
    keywords: ['managed services', 'IT support', 'help desk', 'NOC', 'cloud management'],
  },
  {
    id: '9',
    slug: 'low-current-systems',
    title: 'Low Current Systems',
    shortTitle: 'ELV',
    tagline: 'Build smart, safe, and connected facilities',
    description:
      'Complete low-voltage infrastructure including structured cabling, fire alarm, public address, and building automation systems for modern facilities.',
    icon: 'Cable',
    gradient: 'from-cyan-500 to-blue-600',
    heroImage: '/images/services/low-current-systems.webp',
    keyOfferings: [
      { icon: 'Cable', title: 'Structured Cabling', description: 'Cat6/Cat6A and fiber optic cabling infrastructure' },
      { icon: 'Flame', title: 'Fire Alarm Systems', description: 'Addressable fire detection and notification' },
      { icon: 'Building2', title: 'Building Automation', description: 'BMS, HVAC controls, and energy management' },
      { icon: 'Megaphone', title: 'Public Address', description: 'PA/VA systems and emergency communication' },
    ],
    serviceLists: [
      {
        title: 'Cabling Services',
        icon: 'Cable',
        items: [
          'Network infrastructure design and documentation',
          'Copper and fiber optic installation and testing',
          'Datacenter high-density cabling and patching',
          'Cable management, labeling, and organization',
          'TIA/EIA standards compliance, warranty, and certification',
        ],
      },
      {
        title: 'Fire & Life Safety',
        icon: 'Flame',
        items: [
          'Addressable fire alarm panels and detectors',
          'Manual call points and notification appliances',
          'Voice evacuation and emergency lighting',
          'Gas detection systems',
          'Testing, inspection, and maintenance',
        ],
      },
    ],
    capabilitiesTitle: 'Building Management Capabilities',
    capabilities: [
      { icon: 'Thermometer', title: 'HVAC Control', description: 'Temperature & climate' },
      { icon: 'Lightbulb', title: 'Lighting Control', description: 'Automated lighting' },
      { icon: 'Gauge', title: 'Energy Management', description: 'Consumption monitoring' },
      { icon: 'Layers', title: 'Integration', description: 'Unified control platform' },
      { icon: 'Server', title: 'Datacenter Cabling', description: 'High-density solutions' },
      { icon: 'Stethoscope', title: 'Nurse Call', description: 'Healthcare communication' },
      { icon: 'Volume2', title: 'PA / VA', description: 'Clear emergency audio' },
      { icon: 'Wrench', title: 'Maintenance', description: 'Preventive service plans' },
    ],
    cta: {
      title: 'Build Smart Infrastructure',
      description: 'Professional low current systems design, installation, and maintenance for safe, connected buildings.',
      button: 'Request Consultation',
    },
    consult: [
      { title: 'Site Survey', description: 'Assess facility layout, requirements, and existing systems' },
      { title: 'Code & Standards Review', description: 'Align with civil defense, TIA/EIA, and local codes' },
      { title: 'System Selection', description: 'Recommend fit-for-purpose ELV technologies' },
      { title: 'Budget Planning', description: 'Estimate materials, labor, and phasing' },
    ],
    design: [
      { title: 'Cabling Design', description: 'Design pathways, racks, and cabling topology' },
      { title: 'Fire & Life Safety Design', description: 'Design detection, notification, and evacuation' },
      { title: 'BMS Integration Design', description: 'Integrate HVAC, lighting, and energy systems' },
      { title: 'Shop Drawings', description: 'Produce detailed drawings and documentation' },
    ],
    deliver: [
      { title: 'Installation', description: 'Install and terminate systems to standard' },
      { title: 'Testing & Commissioning', description: 'Certify cabling and commission all systems' },
      { title: 'Handover & Training', description: 'Deliver as-built documents and operator training' },
      { title: 'Maintenance Contracts', description: 'Preventive and corrective maintenance' },
    ],
    benefits: ['Certified, standards-compliant installations', 'Safer buildings and occupants', 'Lower energy consumption', 'Single integrated contractor', 'Future-ready infrastructure'],
    useCases: ['Commercial: offices, malls, hotels, banks', 'Industrial: factories, warehouses, logistics', 'Healthcare: hospitals, clinics, laboratories', 'Datacenter fit-outs'],
    technologies: ['CommScope', 'Panduit', 'Legrand', 'Nexans', 'Honeywell', 'Siemens', 'Bosch', 'Schneider Electric'],
    relatedServices: ['network-solutions', 'datacenter-solutions'],
    metaTitle: 'Low Current (ELV) Systems & Cabling',
    metaDescription: 'Low current (ELV) systems design and installation in Saudi Arabia: structured cabling, fire alarm, public address, CCTV, access control, and building automation.',
    keywords: ['low current systems', 'ELV', 'structured cabling', 'fire alarm', 'BMS'],
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceCategory[] {
  return services.filter((s) => slugs.includes(s.slug));
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
