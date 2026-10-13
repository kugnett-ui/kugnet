import { useState } from 'react';
import { checkDomainAvailability } from '../api';
import { RDAPResponse } from '../types';

export default function WHOISLookup() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ available: boolean; rdap?: RDAPResponse } | null>(null);

  const handleLookup = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await checkDomainAvailability(domain.trim());
      if (data.error && !data.rdap) {
        setError(data.error);
      } else {
        setResult({ available: data.available, rdap: data.rdap });
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLookup();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getEntityName = (entity: { vcardArray?: [string, (string | string[])[]]; handle?: string }): string => {
    if (entity.vcardArray && entity.vcardArray[1]) {
      const fn = entity.vcardArray[1].find((v: string | string[]) => Array.isArray(v) && v[0] === 'fn');
      if (fn && Array.isArray(fn)) return fn[3] as string;
      const org = entity.vcardArray[1].find((v: string | string[]) => Array.isArray(v) && v[0] === 'org');
      if (org && Array.isArray(org)) return org[3] as string;
    }
    return entity.handle || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Domain WHOIS & Availability
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="example.com"
            className="flex-1 bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
          />
          <button
            onClick={handleLookup}
            disabled={loading || !domain.trim()}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            Check
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Availability Status */}
          <div className={`rounded-xl p-6 border ${
            result.available
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}>
            <div className="flex items-center gap-3">
              {result.available ? (
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              <div>
                <h3 className={`text-lg font-semibold ${result.available ? 'text-green-400' : 'text-orange-400'}`}>
                  {result.available ? 'Domain is Available' : 'Domain is Registered'}
                </h3>
                <p className="text-gray-400 text-sm">{domain.trim()}</p>
              </div>
            </div>
          </div>

          {/* RDAP Details */}
          {result.rdap && result.rdap.ldhName && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700/50">
                <h3 className="text-white font-medium">Registration Details</h3>
              </div>
              <div className="p-6 space-y-4">
                {/* Domain Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Domain Name</span>
                    <p className="text-white font-mono mt-1">{result.rdap.ldhName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Handle</span>
                    <p className="text-white font-mono mt-1">{result.rdap.handle || '—'}</p>
                  </div>
                </div>

                {/* Status */}
                {result.rdap.status && result.rdap.status.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Status</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.rdap.status.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events */}
                {result.rdap.events && result.rdap.events.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Events</span>
                    <div className="mt-2 space-y-2">
                      {result.rdap.events.map((evt, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-900/30 rounded-lg px-4 py-2">
                          <span className="text-gray-300 text-sm capitalize">{evt.eventAction}</span>
                          <span className="text-gray-400 text-sm">{formatDate(evt.eventDate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nameservers */}
                {result.rdap.nameservers && result.rdap.nameservers.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Nameservers</span>
                    <div className="mt-2 space-y-1">
                      {result.rdap.nameservers.map((ns, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-300 font-mono text-sm">
                          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                          </svg>
                          {ns.ldhName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Entities */}
                {result.rdap.entities && result.rdap.entities.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Contacts</span>
                    <div className="mt-2 space-y-2">
                      {result.rdap.entities.map((entity, i) => (
                        <div key={i} className="bg-gray-900/30 rounded-lg px-4 py-3">
                          <div className="flex items-center gap-2">
                            {entity.roles && entity.roles.length > 0 && (
                              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs capitalize">
                                {entity.roles.join(', ')}
                              </span>
                            )}
                            <span className="text-white text-sm">{getEntityName(entity)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
