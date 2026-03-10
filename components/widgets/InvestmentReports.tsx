'use client';

import { useEffect, useState } from 'react';
import NeoCard from '@/components/ui/NeoCard';

interface Report {
  ticker: string;
  name: string;
  market: string;
  date: string;
  price: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
  highlight: string;
  shareNoteLink: string;
}

export default function InvestmentReports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.investmentReports) {
          setReports(data.investmentReports);
        }
      })
      .catch(() => {});
  }, []);

  const dirColor = (dir: string) =>
    dir === 'up' ? '#E74C3C' : dir === 'down' ? '#3498DB' : '#B0B0B0';
  const dirSign = (dir: string) =>
    dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  const flagEmoji = (market: string) =>
    market === 'KOSDAQ' || market === 'KOSPI' ? '🇰🇷' : '🇺🇸';

  return (
    <NeoCard span="lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h3 className="text-sm font-semibold uppercase tracking-widest gold-text">
            투자분석 리포트
          </h3>
        </div>
        <span className="text-sm" style={{ color: '#B0B0B0' }}>
          /투자분석 으로 생성
        </span>
      </div>

      {reports.length === 0 ? (
        <div className="glass-inner p-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <div className="text-lg" style={{ color: '#B0B0B0' }}>
            아직 리포트가 없어요
          </div>
          <div className="text-sm mt-1" style={{ color: '#666' }}>
            텔레그램에서 /투자분석 종목명 을 입력하면 자동 생성!
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((r, i) => (
            <a
              key={i}
              href={r.shareNoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-inner p-4 block hover:opacity-80 transition-all"
              style={{ borderLeft: `4px solid ${dirColor(r.direction)}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{flagEmoji(r.market)}</span>
                  <span className="text-lg font-bold" style={{ color: '#F5F5F5' }}>
                    {r.name}
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded"
                    style={{ background: 'rgba(201, 169, 110, 0.15)', color: '#C9A96E' }}>
                    {r.ticker}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#888' }}>
                    {r.market}
                  </span>
                </div>
                <span className="text-sm" style={{ color: '#888' }}>{r.date}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black" style={{ color: '#F5F5F5' }}>
                    {r.price}
                  </span>
                  <span className="text-lg font-bold" style={{ color: dirColor(r.direction) }}>
                    {dirSign(r.direction)} {r.change}
                  </span>
                </div>
                <span className="text-sm px-3 py-1 rounded-full"
                  style={{ background: 'rgba(201, 169, 110, 0.1)', color: '#C9A96E', border: '1px solid rgba(201, 169, 110, 0.3)' }}>
                  리포트 보기 →
                </span>
              </div>

              <div className="mt-2 text-sm" style={{ color: '#B0B0B0' }}>
                💡 {r.highlight}
              </div>
            </a>
          ))}
        </div>
      )}
    </NeoCard>
  );
}
