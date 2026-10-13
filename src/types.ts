export interface DNSRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DNSResponse {
  Status: number;
  Answer?: DNSRecord[];
  Authority?: DNSRecord[];
  Additional?: DNSRecord[];
  Question?: { name: string; type: number }[];
}

export interface IPInfo {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export interface RDAPResponse {
  handle?: string;
  ldhName?: string;
  status?: string[];
  events?: { eventAction: string; eventDate: string }[];
  entities?: RDAPEntity[];
  nameservers?: { ldhName: string }[];
  links?: { href: string; rel: string }[];
}

export interface RDAPEntity {
  handle?: string;
  roles?: string[];
  vcardArray?: [string, (string | string[])[]];
  entities?: RDAPEntity[];
}

export type TabType = 'dns' | 'whois' | 'ip';

export const DNS_TYPES: { label: string; value: number }[] = [
  { label: 'A', value: 1 },
  { label: 'AAAA', value: 28 },
  { label: 'CNAME', value: 5 },
  { label: 'MX', value: 15 },
  { label: 'NS', value: 2 },
  { label: 'TXT', value: 16 },
  { label: 'SOA', value: 6 },
  { label: 'CAA', value: 257 },
  { label: 'SRV', value: 33 },
  { label: 'ALL', value: 255 },
];

export const DNS_TYPE_MAP: Record<number, string> = {
  1: 'A',
  2: 'NS',
  5: 'CNAME',
  6: 'SOA',
  15: 'MX',
  16: 'TXT',
  28: 'AAAA',
  33: 'SRV',
  257: 'CAA',
  255: 'ALL',
  43: 'DS',
  46: 'RRSIG',
  47: 'NSEC',
  48: 'DNSKEY',
};
