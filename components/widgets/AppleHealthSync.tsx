'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface HealthData {
  steps: number;
  heartRate: number;
  sleep: number;
  calories: number;
}

export default function AppleHealthSync() {
  const [data, setData] = useState<HealthData | null>(null);

  useEffect(() => {
    fetch('/api/widgets?type=health')
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        setData({ steps: 8432, heartRate: 72, sleep: 7.2, calories: 2150 });
      });
  }, []);

  const items = data
    ? [
        { label: 'Steps', value: data.steps.toLocaleString(), icon: '👟' },
        { label: 'Heart Rate', value: `${data.heartRate} bpm`, icon: '❤️' },
        { label: 'Sleep', value: `${data.sleep}h`, icon: '😴' },
        { label: 'Calories', value: `${data.calories} kcal`, icon: '🔥' },
      ]
    : [];

  return (
    <NeoCard span="md">
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 gold-text">Apple Health</h3>
      {data ? (
        <div className="grid grid-cols-2 gap-3">
          {items.map(item => (
            <div
              key={item.label}
              className="glass-inner p-4 text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xl font-bold" style={{ color: '#F5F5F5' }}>{item.value}</div>
              <div className="text-sm mt-1" style={{ color: '#B0B0B0' }}>{item.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center text-base animate-pulse" style={{ color: '#B0B0B0' }}>Loading...</div>
      )}
    </NeoCard>
  );
}
