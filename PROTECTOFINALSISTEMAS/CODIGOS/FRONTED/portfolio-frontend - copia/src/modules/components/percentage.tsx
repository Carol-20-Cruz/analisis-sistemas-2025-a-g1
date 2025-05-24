import React from 'react';

interface Props {
  label: string;       
  percentage: number;   
  fromColor?: string;   
  toColor?: string;    
}

export default function Percentage({
  label,
  percentage,
  fromColor = 'from-yellow-200',
  toColor = 'to-amber-400'
}: Props) {

  return (
    <div className="flex flex-col">
      <p className="text-white font-semibold">
        {label} <span className="text-neutral-300 font-normal mb-2">{percentage}%</span>
      </p>
      <div className="w-full p-1 rounded-full bg-neutral-600">
        <div
          className={`p-[5px] h-full rounded-full bg-gradient-to-br ${fromColor} ${toColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}