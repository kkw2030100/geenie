'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoBadge from '@/components/ui/NeoBadge';

interface HojaeItem {
  title: string;
  region: string;
  category: string;
  source: string;
  url: string;
}

const categoryColor: Record<string, string> = {
  '교통': '#5DADE2',
  '개발': '#2ECC71',
  '분양': '#D4AF37',
  '정책': '#A855F7',
};

export default function HojaeWidget() {
  const [items, setItems] = useState<HojaeItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [shareLink, setShareLink] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/dashboard', { cache: 'no-store' });
      const data = await res.json();
      if (data.hojae) {
        setItems(data.hojae.items || []);
        setLastUpdated(data.hojae.lastUpdated || '');
        setShareLink(data.hojae.shareNoteLink || '');
      }
    } catch {}
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // 5분마다 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <NeoCard span="md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">부동산 호재</h3>
          <span className="text-sm" style={{ color: '#B0B0B0' }}>{lastUpdated}</span>
        </div>
        {shareLink && (
          <a href={shareLink} target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(201, 169, 110, 0.15)', color: '#C9A96E', border: '1px solid rgba(201, 169, 110, 0.3)' }}>
            📎 일일 요약
          </a>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <a key={i} href={item.url || '#'} target={item.url ? '_blank' : undefined} rel="noopener noreferrer"
            className="glass-inner flex items-start gap-3 p-3 block transition-all hover:scale-[1.01]"
            style={{ cursor: item.url ? 'pointer' : 'default', textDecoration: 'none' }}>
            <div className="w-1 h-full min-h-[40px] rounded-full shrink-0"
              style={{ backgroundColor: categoryColor[item.category] || '#C9A96E' }} />
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{item.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <NeoBadge variant="info">{item.category}</NeoBadge>
                <span className="text-sm" style={{ color: '#B0B0B0' }}>{item.region}</span>
                <span className="text-sm" style={{ color: 'rgba(176, 176, 176, 0.5)' }}>· {item.source}</span>
                {item.url && <span className="text-sm ml-auto" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>원문 ↗</span>}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>매일 07:00 자동 업데이트 · {items.length}건</span>
        {shareLink && (
          <a href={shareLink} target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium" style={{ color: '#C9A96E' }}>
            옵시디언 노트 →
          </a>
        )}
      </div>
    </NeoCard>
  );
}
