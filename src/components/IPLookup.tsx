import { useState } from 'react';
import { lookupIP } from '../api';
import { IPInfo } from '../types';

export default function IPLookup() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<IPInfo | null>(null);

  const handleLookup = async () => {
    if (!ip.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await lookupIP(ip.trim());
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

  const handleMyIP = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await lookupIP('');
      setResult(data);
      setIp(data.query);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          IP Address Lookup
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="8.8.8.8"
            className="flex-1 bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
          <button
            onClick={handleLookup}
            disabled={loading || !ip.trim()}
            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
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
          <button
            onClick={handleMyIP}
            disabled={loading}
            className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            My IP
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
          {/* IP Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-mono">{result.query}</h3>
                <p className="text-gray-400 text-sm">{result.isp} • {result.org || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Country</span>
                  <span className="text-white text-sm">{result.country} ({result.countryCode})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Region</span>
                  <span className="text-white text-sm">{result.regionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">City</span>
                  <span className="text-white text-sm">{result.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">ZIP</span>
                  <span className="text-white text-sm font-mono">{result.zip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Timezone</span>
                  <span className="text-white text-sm">{result.timezone}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Network
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">ISP</span>
                  <span className="text-white text-sm">{result.isp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Organization</span>
                  <span className="text-white text-sm">{result.org || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">AS</span>
                  <span className="text-white text-sm font-mono">{result.as}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Latitude</span>
                  <span className="text-white text-sm font-mono">{result.lat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Longitude</span>
                  <span className="text-white text-sm font-mono">{result.lon}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-700/50 flex items-center justify-between">
              <h3 className="text-gray-300 font-medium text-sm">Map Location</h3>
              <a
                href={`https://www.google.com/maps?q=${result.lat},${result.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors"
              >
                Open in Google Maps
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="h-48 bg-gray-900/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-violet-500/50 animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-violet-500/80" />
              </div>
              <div className="text-center z-10">
                <svg className="w-10 h-10 text-violet-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-400 text-sm">{result.lat}, {result.lon}</p>
                <p className="text-gray-500 text-xs mt-1">{result.city}, {result.country}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
