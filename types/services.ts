export type {
  ServiceOffering,
  ServiceFeature,
  ServiceList,
  ServiceCategory,
} from '@/lib/data/services';

// Icon mapping for Lucide icons
export type ServiceIconType =
  | 'Phone'
  | 'Server'
  | 'Network'
  | 'Shield'
  | 'Code'
  | 'Brain';

// Consulting phase type
export type ConsultingPhase = 'consult' | 'design' | 'deliver';

// Phase metadata
export interface PhaseInfo {
  id: ConsultingPhase;
  title: string;
  description: string;
  icon: string;
}

export const consultingPhases: PhaseInfo[] = [
  {
    id: 'consult',
    title: 'Consult',
    description: 'What we consult on',
    icon: 'Search',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'What we design',
    icon: 'Pencil',
  },
  {
    id: 'deliver',
    title: 'Deliver',
    description: 'What we deliver',
    icon: 'Rocket',
  },
];
