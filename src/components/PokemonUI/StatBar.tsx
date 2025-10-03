import React, { memo } from 'react';

type TStatBarProps = {
  name: string;
  value: number;
  color: string;
  maxValue?: number;
};

const StatBar: React.FC<TStatBarProps> = ({
  name,
  value,
  color,
  maxValue = 255,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-sm font-medium">{name}</div>
      <div className="relative h-4 flex-1 rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${color} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="w-12 text-right text-sm font-bold">{value}</div>
    </div>
  );
};

export default memo(StatBar);
