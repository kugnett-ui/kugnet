import { useState } from 'react';
import { lookupDNS } from '../api';
import { DNSRecord, DNSResponse, DNS_TYPES, DNS_TYPE_MAP } from '../types';

export default function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [selectedType, setSelectedType] = useState(255);
  const [result, setResult] = useState<DNSResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await lookupDNS(domain.trim(), selectedType);
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLookup();
  };

  const getTypeName = (type: number) => DNS_TYPE_MAP[type] || `TYPE${type}`;

  const statusText = (status: number) => {
    const map: Record<number, string> = {
      0: 'NOERROR',
      1: 'FORMERR',
      2: 'SERVFAIL',
      3: 'NXDOMAIN',
      4: 'NOTIMP',
      5: 'REFUSED',
    };
    return map[status] || `UNKNOWN(${status})`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          DNS Lookup
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="example.com"
            className="flex-1 bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value))}
            className="bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
          >
            {DNS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleLookup}
            disabled={loading || !domain.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
            Lookup
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.Status === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {statusText(result.Status)}
              </span>
              {result.Answer && (
                <span className="text-gray-400 text-sm">
                  {result.Answer.length} record{result.Answer.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>
          </div>

          {result.Answer && result.Answer.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Type</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">TTL</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.Answer.map((record: DNSRecord, idx: number) => (
                      <tr key={idx} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                        <td className="px-4 py-3 text-gray-300 text-sm font-mono">{record.name}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                            {getTypeName(record.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{record.TTL}s</td>
                        <td className="px-4 py-3 text-white text-sm font-mono break-all">{record.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result.Authority && result.Authority.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700/50">
                <h3 className="text-gray-300 font-medium text-sm">Authority Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Type</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">TTL</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.Authority.map((record: DNSRecord, idx: number) => (
                      <tr key={idx} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                        <td className="px-4 py-3 text-gray-300 text-sm font-mono">{record.name}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                            {getTypeName(record.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{record.TTL}s</td>
                        <td className="px-4 py-3 text-white text-sm font-mono break-all">{record.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
