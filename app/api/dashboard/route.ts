import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_PATH = join(process.cwd(), 'data', 'dashboard.json');

// GET: 대시보드 데이터 읽기
export async function GET() {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read dashboard data' }, { status: 500 });
  }
}

// POST: 대시보드 데이터 업데이트 (크론잡에서 호출)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 기존 데이터 읽기
    let existing: Record<string, unknown> = {};
    try {
      existing = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
    } catch {}
    
    // 부분 업데이트 (merge)
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    
    writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return NextResponse.json({ ok: true, updatedAt: updated.updatedAt });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
