'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface StockInfo {
  name: string;
  code: string;
  price: string;
  change: string;
  changeRate: string;
  direction: 'up' | 'down' | 'flat';
  market: string;
}

export default function StockWidget() {
  const [stock, setStock] = useState<StockInfo | null>(null);
  const [updatedAt, setUpdatedAt] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/stocks');
      const data = await res.json();
      if (data.stocks?.[0]) setStock(data.stocks[0]);
      setUpdatedAt(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    } catch {}
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1분마다
    return () => clearInterval(interval);
  }, []);

  const dirColor = stock?.direction === 'up' ? '#E74C3C' : stock?.direction === 'down' ? '#3498DB' : '#B0B0B0';
  const dirSign = stock?.direction === 'up' ? '▲' : stock?.direction === 'down' ? '▼' : '—';

  return (
    <NeoCard span="md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">투자 현황</h3>
        </div>
        {updatedAt && <span className="text-sm" style={{ color: '#B0B0B0' }}>{updatedAt} 기준</span>}
      </div>

      {stock && (
        <div className="glass-inner p-5 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xl font-bold" style={{ color: '#F5F5F5' }}>{stock.name}</div>
              <div className="text-sm" style={{ color: '#B0B0B0' }}>{stock.code} · {stock.market}</div>
            </div>
            <a href={`https://m.stock.naver.com/domestic/stock/${stock.code}/total`}
              target="_blank" rel="noopener noreferrer"
              className="text-sm px-2 py-1 rounded"
              style={{ color: '#C9A96E', border: '1px solid rgba(201, 169, 110, 0.3)' }}>
              상세 →
            </a>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black" style={{ color: '#F5F5F5' }}>{stock.price}원</span>
            <span className="text-xl font-bold pb-1" style={{ color: dirColor }}>
              {dirSign} {stock.change} ({stock.changeRate}%)
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <a href="https://m.stock.naver.com/marketindex/commodity/GCcv1" target="_blank" rel="noopener noreferrer"
          className="glass-inner p-4 text-center hover:opacity-80 transition-opacity">
          <div className="text-2xl mb-1">🥇</div>
          <div className="text-lg font-bold" style={{ color: '#D4AF37' }}>금 (Gold)</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>네이버 시세 보기 →</div>
        </a>
        <a href="https://m.stock.naver.com/marketindex/commodity/SIcv1" target="_blank" rel="noopener noreferrer"
          className="glass-inner p-4 text-center hover:opacity-80 transition-opacity">
          <div className="text-2xl mb-1">🥈</div>
          <div className="text-lg font-bold" style={{ color: '#B0B0B0' }}>은 (Silver)</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>네이버 시세 보기 →</div>
        </a>
      </div>
    </NeoCard>
  );
}
