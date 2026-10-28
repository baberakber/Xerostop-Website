export interface TechnologyVendor {
  name: string;
  domain: string;
}

export const technologyVendors: TechnologyVendor[] = [
  { name: 'Cisco', domain: 'Networking & UC' },
  { name: 'Microsoft', domain: 'Cloud & Collaboration' },
  { name: 'VMware', domain: 'Virtualization' },
  { name: 'Palo Alto Networks', domain: 'Security' },
  { name: 'Fortinet', domain: 'Security' },
  { name: 'Genesys', domain: 'Contact Center' },
  { name: 'Avaya', domain: 'Unified Communications' },
  { name: 'Nutanix', domain: 'Hyperconverged' },
  { name: 'Dell Technologies', domain: 'Compute & Storage' },
  { name: 'HPE Aruba', domain: 'Wireless & Campus' },
  { name: 'Juniper', domain: 'Networking' },
  { name: 'Arista', domain: 'Datacenter Networking' },
  { name: 'Pure Storage', domain: 'Storage' },
  { name: 'Veeam', domain: 'Backup & DR' },
  { name: 'CrowdStrike', domain: 'Endpoint Security' },
  { name: 'Okta', domain: 'Identity' },
  { name: 'Splunk', domain: 'SIEM & Observability' },
  { name: 'AWS', domain: 'Cloud' },
  { name: 'Azure', domain: 'Cloud & AI' },
  { name: 'Zoom', domain: 'Collaboration' },
];
