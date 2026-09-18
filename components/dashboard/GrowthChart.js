"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function GrowthChart({ data }) {
  if (!data.length) return <div className="skeleton h-56 w-full" />;
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#6b7891", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: "#6b7891", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ stroke: "rgba(168,85,247,0.4)" }}
            contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, fontSize: 12 }}
            labelStyle={{ color: "#98a4bd" }}
            itemStyle={{ color: "#a855f7" }}
          />
          <Area type="monotone" dataKey="members" stroke="#a855f7" strokeWidth={2} fill="url(#growth)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
