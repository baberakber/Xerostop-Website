export interface Industry {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  challenges: string[];
  approach: string[];
  keySolutions: string[];
}

export const industries: Industry[] = [
  {
    id: '1',
    slug: 'government-public-sector',
    title: 'Government & Public Sector',
    description: 'Secure, compliant IT infrastructure for ministries, authorities, and municipalities across the Kingdom.',
    icon: 'Landmark',
    challenges: ['NCA ECC and CCC compliance', 'Legacy system modernization', 'Data residency in the Kingdom', 'Cybersecurity mandates'],
    approach: ['NCA-aligned architecture', 'Phased modernization', 'TCO optimization', 'Zero Trust security'],
    keySolutions: ['UC compliance', 'Secure datacenter', 'Network segmentation'],
  },
  {
    id: '2',
    slug: 'banking-financial-services',
    title: 'Banking & Financial Services',
    description: 'Resilient, regulator-ready infrastructure for banks, fintechs, insurers, and capital market firms.',
    icon: 'Banknote',
    challenges: ['SAMA Cyber Security Framework', 'Call recording and retention', 'Always-on availability', 'Fraud and social engineering'],
    approach: ['SAMA CSF-aligned design', 'Active-active architectures', 'Compliance-ready recording', 'Continuous monitoring'],
    keySolutions: ['HA VoIP architecture', 'Secure datacenter', 'Contact center modernization'],
  },
  {
    id: '3',
    slug: 'enterprises-corporates',
    title: 'Enterprises & Corporates',
    description: 'Scalable, resilient infrastructure for large Saudi enterprises and regional groups.',
    icon: 'Building2',
    challenges: ['Multi-site complexity', 'M&A integration', 'Vision 2030 digital transformation', 'Operational efficiency'],
    approach: ['Enterprise architecture design', 'Consolidation strategy', 'Cloud-native adoption', 'Automation-first'],
    keySolutions: ['HA VoIP architecture', 'Intelligent automation', 'AI-UC monitoring'],
  },
  {
    id: '4',
    slug: 'telecom-service-providers',
    title: 'Telecom & Service Providers',
    description: 'Carrier-grade solutions for operators, ISPs, MSPs, and communication providers.',
    icon: 'Radio',
    challenges: ['Scale at pace', 'Multi-vendor operations', 'SLA guarantees', 'Cost optimization'],
    approach: ['Automation at scale', 'Unified operations', 'Predictive maintenance', 'Efficiency programs'],
    keySolutions: ['Network automation', 'UC monitoring', 'Datacenter HA'],
  },
  {
    id: '5',
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'Secure, always-available infrastructure for hospitals, clinics, and health clusters.',
    icon: 'HeartPulse',
    challenges: ['Patient data protection (PDPL)', 'Telehealth enablement', 'Legacy EHR integration', '24/7 availability'],
    approach: ['Compliance-by-design', 'Unified communications', 'Secure segmentation', 'HA architecture'],
    keySolutions: ['Secure datacenter', 'UC monitoring', 'HA VoIP'],
  },
  {
    id: '6',
    slug: 'education',
    title: 'Education',
    description: 'Cost-effective, scalable IT for universities, schools, and training institutions.',
    icon: 'GraduationCap',
    challenges: ['Limited budgets', 'Remote and hybrid learning', 'Campus-wide connectivity', 'Student data privacy'],
    approach: ['Right-sized solutions', 'Cloud and hybrid UC', 'Network design', 'Privacy-first design'],
    keySolutions: ['UC solutions', 'Network infrastructure', 'Automation'],
  },
];
