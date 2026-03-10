'use client';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 mb-6" 
      style={{ borderBottom: '1px solid rgba(201, 169, 110, 0.2)' }}>
      <div className="flex items-center gap-4">
        <span className="text-4xl">👑</span>
        <div>
          <h1 className="text-3xl font-black tracking-tight" 
            style={{ 
              background: 'linear-gradient(135deg, #D4AF37, #C9A96E, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            RICHGO Command Center
          </h1>
          <p className="text-sm mt-1" style={{ color: '#B0B0B0' }}>
            리치고TV · OpenClaw · 부동산 자동화
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: 'rgba(46, 204, 113, 0.15)', 
            color: '#2ECC71',
            border: '1px solid rgba(46, 204, 113, 0.3)' 
          }}>
          ● ALL SYSTEMS GO
        </span>
      </div>
    </header>
  );
}
