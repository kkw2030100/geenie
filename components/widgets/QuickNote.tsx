'use client';

import { useState, useEffect } from 'react';
import NeoCard from '@/components/ui/NeoCard';
import NeoButton from '@/components/ui/NeoButton';

export default function QuickNote() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('clawdash-note');
    if (stored) setNote(stored);
  }, []);

  const save = () => {
    localStorage.setItem('clawdash-note', note);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <NeoCard>
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 gold-text">Quick Note</h3>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Type a note..."
        className="lux-textarea w-full h-24 p-3"
      />
      <div className="flex items-center justify-between mt-3">
        <NeoButton variant="secondary" onClick={save}>Save</NeoButton>
        {saved && <span className="text-sm font-semibold" style={{ color: '#2ECC71' }}>Saved!</span>}
      </div>
    </NeoCard>
  );
}
