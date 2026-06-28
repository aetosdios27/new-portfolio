"use client";

import { useEffect, useState } from "react";

export function Ticker() {
  const [visitorCount, setVisitorCount] = useState<string>("SYNCING...");
  const [weather, setWeather] = useState<string>("LOCATING...");
  const [sessionTime, setSessionTime] = useState<string>("00:00:00");

  useEffect(() => {
    // 1. Fetch Visitor Count
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count.toString()))
      .catch(() => setVisitorCount("OFFLINE"));

    // 2. Fetch Weather via GeoJS and Open-Meteo
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const geoData = await geoRes.json();
        
        if (geoData.city && geoData.latitude && geoData.longitude) {
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoData.latitude}&longitude=${geoData.longitude}&current_weather=true`);
          const weatherData = await weatherRes.json();
          setWeather(`${geoData.city.toUpperCase()} :: ${weatherData.current_weather.temperature}°C`);
        } else {
          setWeather("LOC_DENIED");
        }
      } catch {
        setWeather("SYS_OFFLINE");
      }
    };
    fetchWeather();

    // 3. Session Timer
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setSessionTime(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TickerContent = () => (
    <div className="flex items-center whitespace-nowrap gap-12 px-6">
      <span className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] animate-pulse" />
        VISITORS :: {visitorCount}
      </span>
      <span>|</span>
      <span>SYS.LOC :: {weather}</span>
      <span>|</span>
      <span>SESSION_DUR :: {sessionTime}</span>
      <span>|</span>
      <span>RENDER_TARGET :: VERCEL_EDGE</span>
      <span>|</span>
      <span>PORTFOLIO_V2.0.0</span>
      <span>|</span>
    </div>
  );

  return (
    <div 
      className="fixed bottom-0 left-0 w-full overflow-hidden border-t border-[var(--text)]/20 bg-[var(--bg)] py-2.5 select-none z-50 flex group"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="animate-ticker flex text-[10px] uppercase tracking-widest text-[var(--text)] opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <TickerContent />
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
          width: max-content;
        }
      `}} />
    </div>
  );
}
