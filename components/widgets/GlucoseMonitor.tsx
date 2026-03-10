'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoProgress from '@/components/ui/NeoProgress';
import { NeoLineChart, NeoDonutChart } from '@/components/ui/NeoChart';

interface GlucoseData {
  current: number;
  trend: string;
  trendArrow: string;
  history: { time: string; value: number }[];
  tir: { inRange: number; high: number; low: number };
}

export default function GlucoseMonitor() {
  const [data, setData] = useState<GlucoseData | null>(null);

  useEffect(() => {
    fetch('/api/widgets?type=glucose')
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        setData({
          current: 118,
          trend: 'stable',
          trendArrow: '→',
          history: generateGlucoseHistory(),
          tir: { inRange: 72, high: 18, low: 10 },
        });
      });
  }, []);

  const tirData = data
    ? [
        { name: 'In Range', value: data.tir.inRange, color: '#2ECC71' },
        { name: 'High', value: data.tir.high, color: '#F39C12' },
        { name: 'Low', value: data.tir.low, color: '#E74C3C' },
      ]
    : [];

  return (
    <NeoCard span="lg">
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 gold-text">Glucose Monitor</h3>
      {data ? (
        <>
          <div className="flex items-center gap-5 mb-4">
            <div>
              <span className="font-mono text-5xl font-bold" style={{ color: '#F5F5F5' }}>{data.current}</span>
              <span className="text-lg ml-2" style={{ color: '#B0B0B0' }}>mg/dL</span>
            </div>
            <span className="text-3xl" style={{ color: '#C9A96E' }}>{data.trendArrow}</span>
            <NeoProgress value={data.tir.inRange} color="bg-neo-cyan" label={`TIR ${data.tir.inRange}%`} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <NeoLineChart data={data.history} dataKey="value" xKey="time" color="#2ECC71" height={140} />
            </div>
            <div>
              <NeoDonutChart data={tirData} height={140} />
            </div>
          </div>
        </>
      ) : (
        <div className="h-48 flex items-center justify-center text-base animate-pulse" style={{ color: '#B0B0B0' }}>Loading...</div>
      )}
    </NeoCard>
  );
}

function generateGlucoseHistory() {
  const points = [];
  for (let i = 23; i >= 0; i--) {
    points.push({ time: `${(24 - i).toString().padStart(2, '0')}:00`, value: Math.round(70 + Math.random() * 130) });
  }
  return points;
}
