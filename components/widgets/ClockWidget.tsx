'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString('en-US', { hour12: false });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <NeoCard>
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 gold-text">Clock</h3>
      <div className="font-mono text-5xl font-bold tracking-tight" style={{ color: '#F5F5F5' }}>{time}</div>
      <div className="text-base mt-3" style={{ color: '#B0B0B0' }}>{date}</div>
    </NeoCard>
  );
}
