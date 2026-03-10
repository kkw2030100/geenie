'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoBadge from '@/components/ui/NeoBadge';
import { NeoLineChart } from '@/components/ui/NeoChart';

interface CryptoData {
  price: number;
  change24h: number;
  history: { time: string; price: number }[];
}

export default function CryptoTracker() {
  const [data, setData] = useState<CryptoData | null>(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
      .then(r => r.json())
      .then(json => {
        const btc = json.bitcoin;
        const price = btc?.usd ?? 65000;
        const change = btc?.usd_24h_change ?? 2.5;
        setData({ price, change24h: change, history: generateHistory(price) });
      })
      .catch(() => {
        setData({ price: 65432, change24h: 2.34, history: generateHistory(65432) });
      });
  }, []);

  return (
    <NeoCard span="lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">Crypto</h3>
        <NeoBadge variant="info">BTC/USD</NeoBadge>
      </div>
      {data ? (
        <>
          <div className="flex items-end gap-4 mb-4">
            <span className="font-mono text-4xl font-bold" style={{ color: '#F5F5F5' }}>
              ${data.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span
              className="text-lg font-semibold"
              style={{ color: data.change24h >= 0 ? '#2ECC71' : '#E74C3C' }}
            >
              {data.change24h >= 0 ? '▲' : '▼'} {Math.abs(data.change24h).toFixed(2)}%
            </span>
          </div>
          <NeoLineChart data={data.history} dataKey="price" xKey="time" color="#C9A96E" height={160} />
        </>
      ) : (
        <div className="h-48 flex items-center justify-center text-base animate-pulse" style={{ color: '#B0B0B0' }}>Loading...</div>
      )}
    </NeoCard>
  );
}

function generateHistory(current: number) {
  const points = [];
  for (let i = 23; i >= 0; i--) {
    const variance = (Math.random() - 0.5) * current * 0.03;
    points.push({ time: `${(24 - i).toString().padStart(2, '0')}:00`, price: Math.round(current + variance) });
  }
  return points;
}
