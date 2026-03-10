'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface NeoLineChartProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
}

const tooltipStyle = {
  background: 'rgba(26, 26, 46, 0.9)',
  border: '1px solid rgba(201, 169, 110, 0.3)',
  borderRadius: '8px',
  fontFamily: "'JetBrains Mono'",
  fontSize: '12px',
  color: '#F5F5F5',
};

export function NeoLineChart({ data, dataKey, xKey = 'time', color = '#C9A96E', height = 200 }: NeoLineChartProps) {
  return (
    <div className="lux-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(201, 169, 110, 0.1)" />
          <XAxis dataKey={xKey} tick={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fill: '#B0B0B0' }} stroke="rgba(201, 169, 110, 0.2)" />
          <YAxis tick={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fill: '#B0B0B0' }} stroke="rgba(201, 169, 110, 0.2)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface NeoBarChartProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
}

export function NeoBarChart({ data, dataKey, xKey = 'name', color = '#C9A96E', height = 200 }: NeoBarChartProps) {
  return (
    <div className="lux-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(201, 169, 110, 0.1)" />
          <XAxis dataKey={xKey} tick={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fill: '#B0B0B0' }} stroke="rgba(201, 169, 110, 0.2)" />
          <YAxis tick={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fill: '#B0B0B0' }} stroke="rgba(201, 169, 110, 0.2)" />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey={dataKey} fill={color} stroke="rgba(201, 169, 110, 0.3)" strokeWidth={1} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface NeoDonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export function NeoDonutChart({ data, height = 200 }: NeoDonutChartProps) {
  return (
    <div className="lux-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} innerRadius={40} outerRadius={70} dataKey="value" stroke="rgba(13, 13, 13, 0.5)" strokeWidth={2}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
