import { useState } from 'react';
import DNSLookup from './components/DNSLookup';
import WHOISLookup from './components/WHOISLookup';
import IPLookup from './components/IPLookup';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dns');

  const tabs: { id: TabType; label: string; icon: JSX.Element; color: string }[] = [
    {
      id: 'dns',
      label: 'DNS Lookup',
      color: 'cyan',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: 'whois',
      label: 'WHOIS',
      color: 'emerald',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'ip',
      label: 'IP Lookup',
      color: 'violet',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50" role="banner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3" aria-label="NetTools for Insales Tech — Главная">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  NetTools for Insales Tech
                </h1>
                <p className="text-gray-500 text-xs hidden sm:block">DNS • WHOIS • IP Lookup</p>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm" aria-label="Основная навигация" role="navigation">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                aria-label={`Перейти к ${tab.label}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? tab.id === 'dns'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : tab.id === 'whois'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-violet-500/15 text-violet-400 border border-violet-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8" role="main" id="main-content">
        {/* SEO Hero Section - visible to search engines */}
        <section className="mb-8" aria-label="О сервисе">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Проверка доменов, DNS записей и IP адресов онлайн
          </h2>
          <p className="text-gray-400 text-base max-w-3xl">
            NetTools for Insales Tech — бесплатный инструмент для сетевой диагностики. Проверяйте доступность доменов, 
            просматривайте все типы DNS записей (A, AAAA, MX, NS, TXT, CNAME, SOA, CAA, SRV), 
            получайте WHOIS информацию и определяйте геолокацию IP адресов. Работает быстро, без регистрации.
          </p>
        </section>

        {/* Active Tab Content */}
        <section aria-label={activeTab === 'dns' ? 'DNS Lookup' : activeTab === 'whois' ? 'WHOIS Lookup' : 'IP Lookup'}>
          {activeTab === 'dns' && <DNSLookup />}
          {activeTab === 'whois' && <WHOISLookup />}
          {activeTab === 'ip' && <IPLookup />}
        </section>

        {/* SEO Content - FAQ Section */}
        <section className="mt-12" aria-label="Часто задаваемые вопросы">
          <h2 className="text-2xl font-bold text-white mb-6">
            Часто задаваемые вопросы
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Как проверить DNS записи домена?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Введите доменное имя в поле DNS Lookup, выберите тип записи (A, AAAA, MX, NS, TXT, CNAME и другие) 
                и нажмите Lookup. Сервис покажет все найденные записи с TTL и данными. Используется Google Public DNS 
                для максимальной точности.
              </p>
            </article>
            <article className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Как узнать, свободен ли домен?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Перейдите на вкладку WHOIS, введите доменное имя и нажмите Check. Если домен свободен, 
                вы увидите зелёный индикатор. Если зарегистрирован — информацию о владельце, датах регистрации 
                и nameservers через протокол RDAP.
              </p>
            </article>
            <article className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Как определить местоположение по IP?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                На вкладке IP Lookup введите IP адрес или нажмите кнопку «My IP» для определения вашего адреса. 
                Сервис покажет страну, город, провайдера (ISP), координаты, часовой пояс и другую информацию.
              </p>
            </article>
            <article className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Какие типы DNS записей поддерживаются?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Поддерживаются все основные типы DNS записей: A (IPv4 адрес), AAAA (IPv6 адрес), 
                CNAME (каноническое имя), MX (почтовые серверы), NS (серверы имён), TXT (текстовые записи), 
                SOA (авторитетная запись), CAA (сертификаты), SRV (сервисные записи).
              </p>
            </article>
          </div>
        </section>

        {/* SEO Content - Features Section */}
        <section className="mt-12" aria-label="Возможности сервиса">
          <h2 className="text-2xl font-bold text-white mb-6">
            Возможности NetTools for Insales Tech
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">DNS Lookup</h3>
              <p className="text-gray-400 text-sm">
                Полный просмотр DNS записей любого домена через Google Public DNS. Поддержка всех типов записей.
              </p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">WHOIS & RDAP</h3>
              <p className="text-gray-400 text-sm">
                Проверка доступности доменов и получение регистрационных данных через современный протокол RDAP.
              </p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
              <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">IP Geolocation</h3>
              <p className="text-gray-400 text-sm">
                Определение географического положения, провайдера и сетевой информации по IP адресу.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50 mt-auto" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 NetTools for Insales Tech — Инструменты сетевой диагностики. Бесплатно и без регистрации.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Google DNS API
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                RDAP Protocol
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ip-api.com
              </span>
            </div>
          </div>
          {/* SEO internal links */}
          <nav className="mt-4 pt-4 border-t border-gray-800/30" aria-label="Дополнительная навигация">
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <a href="#dns" className="hover:text-gray-400 transition-colors">Проверка DNS записей</a>
              <a href="#whois" className="hover:text-gray-400 transition-colors">WHOIS домена</a>
              <a href="#ip" className="hover:text-gray-400 transition-colors">Геолокация IP</a>
              <a href="#dns" className="hover:text-gray-400 transition-colors">A запись</a>
              <a href="#dns" className="hover:text-gray-400 transition-colors">MX запись</a>
              <a href="#dns" className="hover:text-gray-400 transition-colors">NS запись</a>
              <a href="#dns" className="hover:text-gray-400 transition-colors">TXT запись</a>
              <a href="#whois" className="hover:text-gray-400 transition-colors">Проверить домен</a>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
