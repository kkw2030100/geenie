'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface NewsItem {
  title: string;
  source: string;
  timestamp: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/api/widgets?type=news')
      .then(r => r.json())
      .then(data => setNews(Array.isArray(data) ? data : data.items || []))
      .catch(() => {
        setNews([
          { title: 'OpenClaw v2.0 Released with Agent Framework', source: 'OpenClaw Blog', timestamp: '2h ago' },
          { title: 'AI Dashboard Tools Comparison 2026', source: 'TechCrunch', timestamp: '4h ago' },
          { title: 'New CGM Integration Standards Published', source: 'Health API Weekly', timestamp: '5h ago' },
          { title: 'TypeScript 6.0 Beta Announced', source: 'Microsoft Dev Blog', timestamp: '8h ago' },
          { title: 'Tailwind CSS v4 Performance Benchmarks', source: 'CSS Weekly', timestamp: '12h ago' },
        ]);
      });
  }, []);

  return (
    <NeoCard span="lg">
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 gold-text">News Feed</h3>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {news.map((item, i) => (
          <div
            key={i}
            className="glass-inner p-4 cursor-pointer"
          >
            <div className="text-base font-semibold leading-tight" style={{ color: '#F5F5F5' }}>{item.title}</div>
            <div className="flex justify-between mt-2">
              <span className="text-sm" style={{ color: 'rgba(201, 169, 110, 0.6)' }}>{item.source}</span>
              <span className="text-sm" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </NeoCard>
  );
}
