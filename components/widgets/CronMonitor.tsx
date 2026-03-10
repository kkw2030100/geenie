'use client';

import { useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoBadge from '@/components/ui/NeoBadge';

interface CronJob {
  name: string;
  emoji: string;
  schedule: string;
  scheduleLabel: string;
  status: 'success' | 'failed' | 'running';
}

const MY_JOBS: CronJob[] = [
  { name: 'youtube-gem-digest', emoji: '🎬', schedule: '0 */12 * * *', scheduleLabel: '00:00 / 12:00', status: 'success' },
  { name: '부동산 호재 수집', emoji: '🏠', schedule: '0 7 * * *', scheduleLabel: '매일 07:00', status: 'success' },
  { name: 'AI 트렌드 리포트', emoji: '🤖', schedule: '30 9 * * *', scheduleLabel: '매일 09:30', status: 'success' },
  { name: 'OpenClaw 업데이트', emoji: '🔄', schedule: '0 9 * * 1', scheduleLabel: '매주 월 09:00', status: 'success' },
];

export default function CronMonitor() {
  const [jobs] = useState<CronJob[]>(MY_JOBS);

  const statusVariant = (s: CronJob['status']) =>
    s === 'success' ? 'success' as const : s === 'failed' ? 'error' as const : 'warning' as const;

  return (
    <NeoCard span="md">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⏱️</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">크론잡 모니터</h3>
      </div>
      <div className="space-y-2">
        {jobs.map(job => (
          <div key={job.name} className="glass-inner flex items-center justify-between p-3 px-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{job.emoji}</span>
              <div>
                <div className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{job.name}</div>
                <div className="text-sm" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>{job.scheduleLabel}</div>
              </div>
            </div>
            <NeoBadge variant={statusVariant(job.status)}>{job.status}</NeoBadge>
          </div>
        ))}
      </div>
    </NeoCard>
  );
}
