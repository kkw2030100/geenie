'use client';

import { useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface CalEvent {
  time: string;
  title: string;
  color: string;
}

export default function CalendarWidget() {
  const [events] = useState<CalEvent[]>([
    { time: '07:00', title: '🏠 부동산 호재 자동 수집', color: '#2ECC71' },
    { time: '09:00', title: '🔄 OpenClaw 주간 업데이트 (월)', color: '#5DADE2' },
    { time: '09:30', title: '🤖 AI 트렌드 리포트', color: '#D4AF37' },
    { time: '12:00', title: '🎬 YouTube Gem Digest', color: '#A855F7' },
    { time: '00:00', title: '🎬 YouTube Gem Digest', color: '#A855F7' },
  ]);

  const today = new Date().toLocaleDateString('ko-KR', { 
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' 
  });

  return (
    <NeoCard>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">📅</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">오늘 일정</h3>
      </div>
      <div className="text-base font-semibold mb-4" style={{ color: '#F5F5F5' }}>{today}</div>
      <div className="space-y-2">
        {events.map((evt, i) => (
          <div key={i} className="glass-inner flex items-center gap-3 p-3">
            <div className="w-1 h-8 shrink-0 rounded-full" style={{ backgroundColor: evt.color }} />
            <div className="font-mono text-sm font-semibold w-14" style={{ color: 'rgba(201, 169, 110, 0.7)' }}>{evt.time}</div>
            <div className="text-base font-medium" style={{ color: '#F5F5F5' }}>{evt.title}</div>
          </div>
        ))}
      </div>
    </NeoCard>
  );
}
