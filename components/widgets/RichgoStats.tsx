'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface ChannelStats {
  subscribers: number;
  totalVideos: number;
  avgViews: number;
  engagementRate: number;
  uploadFreqDays: number;
  totalViews: number;
}

const topKeywords = ['부동산', '빅데이터', '아파트', '분양', '강남'];

export default function RichgoStats() {
  const [stats, setStats] = useState<ChannelStats>({
    subscribers: 139000,
    totalVideos: 1152,
    avgViews: 41696,
    engagementRate: 2.12,
    uploadFreqDays: 2.2,
    totalViews: 17897684,
  });

  useEffect(() => {
    fetch('/api/dashboard', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (data.richgoTV) setStats(data.richgoTV); })
      .catch(() => {});
  }, []);

  const fmt = (n: number) => n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : String(n);

  return (
    <NeoCard span="md">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📺</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">리치고TV 채널 현황</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="glass-inner p-4 text-center">
          <div className="text-3xl font-black" style={{ color: '#D4AF37' }}>{fmt(stats.subscribers)}</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>구독자</div>
        </div>
        <div className="glass-inner p-4 text-center">
          <div className="text-3xl font-black" style={{ color: '#F5F5F5' }}>{stats.totalVideos.toLocaleString()}</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>총 영상</div>
        </div>
        <div className="glass-inner p-4 text-center">
          <div className="text-3xl font-black" style={{ color: '#F5F5F5' }}>{stats.avgViews.toLocaleString()}</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>평균 조회수</div>
        </div>
        <div className="glass-inner p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: '#2ECC71' }}>{stats.engagementRate}%</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>참여율</div>
        </div>
        <div className="glass-inner p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: '#C9A96E' }}>{stats.uploadFreqDays}일</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>업로드 주기</div>
        </div>
        <div className="glass-inner p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: '#5DADE2' }}>{fmt(stats.totalViews)}</div>
          <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>총 조회수</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {topKeywords.map(kw => (
          <span key={kw} className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: 'rgba(201, 169, 110, 0.15)', color: '#C9A96E', border: '1px solid rgba(201, 169, 110, 0.3)' }}>
            #{kw}
          </span>
        ))}
      </div>
    </NeoCard>
  );
}
