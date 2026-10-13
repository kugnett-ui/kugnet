import { DNSResponse, IPInfo, RDAPResponse } from './types';

const GOOGLE_DNS_URL = 'https://dns.google/resolve';
const IP_API_URL = 'http://ip-api.com/json';
const RDAP_URL = 'https://rdap.org/domain';

export async function lookupDNS(domain: string, type: number): Promise<DNSResponse> {
  const url = `${GOOGLE_DNS_URL}?name=${encodeURIComponent(domain)}&type=${type}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`DNS lookup failed: ${response.statusText}`);
  }
  return response.json();
}

export async function lookupIP(ip: string): Promise<IPInfo> {
  const url = `${IP_API_URL}/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`IP lookup failed: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.status === 'fail') {
    throw new Error(data.message || 'Invalid IP address');
  }
  return data;
}

export async function lookupRDAP(domain: string): Promise<RDAPResponse> {
  const url = `${RDAP_URL}/${encodeURIComponent(domain)}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return { status: ['available'] };
    }
    throw new Error(`WHOIS lookup failed: ${response.statusText}`);
  }
  return response.json();
}

export async function checkDomainAvailability(domain: string): Promise<{
  available: boolean;
  rdap?: RDAPResponse;
  error?: string;
}> {
  try {
    const rdap = await lookupRDAP(domain);
    const statuses = rdap.status || [];
    const isAvailable = statuses.includes('available') || statuses.length === 0;
    return { available: isAvailable, rdap };
  } catch (err) {
    return { available: false, error: (err as Error).message };
  }
}
