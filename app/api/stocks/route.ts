import { NextResponse } from 'next/server';

interface StockData {
  name: string;
  code: string;
  price: string;
  change: string;
  changeRate: string;
  direction: 'up' | 'down' | 'flat';
  market: string;
}

// 아이티센글로벌 + 금/은 시세
const STOCKS = [
  { code: '124500', name: '아이티센글로벌', market: 'KOSPI' },
];

async function fetchNaverStock(code: string): Promise<StockData | null> {
  try {
    const res = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${code}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    const item = data?.result?.areas?.[0]?.datas?.[0];
    if (!item) return null;

    const direction = item.rf === '2' ? 'up' : item.rf === '5' ? 'down' : 'flat';
    return {
      name: STOCKS.find(s => s.code === code)?.name || item.nm,
      code,
      price: item.nv?.toLocaleString() || '0',
      change: item.cv?.toLocaleString() || '0',
      changeRate: item.cr?.toFixed(2) || '0',
      direction,
      market: STOCKS.find(s => s.code === code)?.market || '',
    };
  } catch {
    return null;
  }
}

async function fetchGoldSilver() {
  try {
    // 금/은 국제시세 (네이버 API)
    const res = await fetch(
      'https://m.stock.naver.com/front-api/marketIndex/productDetail?category=precious_metals&reutersCode=GCcv1',
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    const gold = data?.result;

    const resSilver = await fetch(
      'https://m.stock.naver.com/front-api/marketIndex/productDetail?category=precious_metals&reutersCode=SIcv1',
      { next: { revalidate: 300 } }
    );
    const silverData = await resSilver.json();
    const silver = silverData?.result;

    return { gold, silver };
  } catch {
    return { gold: null, silver: null };
  }
}

export async function GET() {
  const [itsenglobal, metals] = await Promise.all([
    fetchNaverStock('124500'),
    fetchGoldSilver(),
  ]);

  return NextResponse.json({
    stocks: [itsenglobal].filter(Boolean),
    gold: metals.gold,
    silver: metals.silver,
    updatedAt: new Date().toISOString(),
  });
}
