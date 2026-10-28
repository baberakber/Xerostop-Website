const LOGO_DIR = '/images/tech-logos';

const logoFiles: Record<string, string> = {
  ansible: 'ansible.svg',
  arista: 'arista.svg',
  audiocodes: 'audiocodes.png',
  avaya: 'avaya.svg',
  aws: 'aws.svg',
  azure: 'azure.svg',
  bosch: 'bosch.svg',
  'check point': 'check-point.svg',
  cisco: 'cisco.svg',
  commscope: 'commscope.svg',
  crowdstrike: 'crowdstrike.svg',
  datadog: 'datadog.svg',
  'dell technologies': 'dell-technologies.svg',
  'extreme networks': 'extreme-networks.png',
  fortinet: 'fortinet.svg',
  genesys: 'genesys.svg',
  grafana: 'grafana.svg',
  honeywell: 'honeywell.svg',
  hpe: 'hpe.svg',
  'hpe aruba': 'hpe-aruba.svg',
  'hugging face': 'hugging-face.svg',
  illumio: 'illumio.svg',
  juniper: 'juniper.svg',
  langchain: 'langchain.svg',
  legrand: 'legrand.svg',
  manageengine: 'manageengine.svg',
  microsoft: 'microsoft.svg',
  'microsoft dynamics 365': 'microsoft-dynamics-365.svg',
  'microsoft entra id': 'microsoft-entra-id.svg',
  'microsoft exchange': 'microsoft-exchange.svg',
  'microsoft outlook': 'microsoft-outlook.svg',
  'microsoft teams': 'microsoft-teams.svg',
  netapp: 'netapp.svg',
  nexans: 'nexans.svg',
  'next.js': 'nextjs.svg',
  nice: 'nice.png',
  'node.js': 'nodejs.svg',
  nutanix: 'nutanix.svg',
  okta: 'okta.svg',
  openai: 'openai.svg',
  oracle: 'oracle.svg',
  'palo alto networks': 'palo-alto-networks.svg',
  panduit: 'panduit.svg',
  poly: 'poly.svg',
  postgresql: 'postgresql.svg',
  'pure storage': 'pure-storage.svg',
  python: 'python.svg',
  react: 'react.svg',
  ribbon: 'ribbon.svg',
  salesforce: 'salesforce.svg',
  'schneider electric': 'schneider-electric.svg',
  servicenow: 'servicenow.svg',
  siemens: 'siemens.svg',
  splunk: 'splunk.svg',
  sprinklr: 'sprinklr.svg',
  terraform: 'terraform.svg',
  twilio: 'twilio.svg',
  veeam: 'veeam.png',
  vmware: 'vmware.svg',
  webex: 'webex.svg',
  zabbix: 'zabbix.svg',
  zendesk: 'zendesk.svg',
  zoom: 'zoom.svg',
  zscaler: 'zscaler.svg',
};

const aliases: Record<string, string> = {
  'active directory': 'microsoft',
  'arista cloudvision': 'arista',
  'aws bedrock': 'aws',
  'azure ai': 'azure',
  'cisco webex': 'webex',
  'genesys cloud': 'genesys',
  'juniper apstra': 'juniper',
  'microsoft azure': 'azure',
  'microsoft hyper-v': 'microsoft',
  'microsoft teams direct routing': 'microsoft teams',
  'oracle sbc': 'oracle',
  'python ml stack': 'python',
  'splunk itsi': 'splunk',
  'vmware nsx': 'vmware',
  'vmware vsphere': 'vmware',
  'vmware velocloud': 'vmware',
  'webex contact center': 'webex',
};

const prefixes: Array<[prefix: string, key: string]> = [
  ['cisco ', 'cisco'],
  ['microsoft ', 'microsoft'],
];

/** Returns the public path of a vendor's logo, or undefined for generic protocols/standards. */
export function getTechLogo(name: string): string | undefined {
  const normalized = name.trim().toLowerCase();
  const key =
    (normalized in logoFiles && normalized) ||
    aliases[normalized] ||
    prefixes.find(([prefix]) => normalized.startsWith(prefix))?.[1];

  return key ? `${LOGO_DIR}/${logoFiles[key]}` : undefined;
}
