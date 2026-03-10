'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoBadge from '@/components/ui/NeoBadge';

export default function AgentStatus() {
  const [status, setStatus] = useState({
    name: '지니 🧞',
    model: 'claude-opus-4-6',
    context: '200K',
    channel: 'Telegram + WebChat',
    version: '2026.3.8',
    host: 'Mac mini (M4)',
    online: true,
  });

  return (
    <NeoCard>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🧞</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">AI 에이전트</h3>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full pulse-gold" style={{ backgroundColor: '#2ECC71' }} />
        <span className="text-xl font-bold" style={{ color: '#F5F5F5' }}>{status.name}</span>
        <NeoBadge variant="success">ONLINE</NeoBadge>
      </div>

      <div className="space-y-3">
        <div className="glass-inner p-3 flex justify-between">
          <span className="text-base" style={{ color: '#B0B0B0' }}>모델</span>
          <span className="text-base font-semibold" style={{ color: '#D4AF37' }}>{status.model}</span>
        </div>
        <div className="glass-inner p-3 flex justify-between">
          <span className="text-base" style={{ color: '#B0B0B0' }}>컨텍스트</span>
          <span className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{status.context}</span>
        </div>
        <div className="glass-inner p-3 flex justify-between">
          <span className="text-base" style={{ color: '#B0B0B0' }}>채널</span>
          <span className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{status.channel}</span>
        </div>
        <div className="glass-inner p-3 flex justify-between">
          <span className="text-base" style={{ color: '#B0B0B0' }}>버전</span>
          <span className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{status.version}</span>
        </div>
        <div className="glass-inner p-3 flex justify-between">
          <span className="text-base" style={{ color: '#B0B0B0' }}>호스트</span>
          <span className="text-base font-semibold" style={{ color: '#F5F5F5' }}>{status.host}</span>
        </div>
      </div>
    </NeoCard>
  );
}
