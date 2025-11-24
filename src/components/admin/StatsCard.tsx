import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-surface text-primary-main border-primary-border',
    success: 'bg-success-surface text-success-main border-success-border',
    warning: 'bg-warning-surface text-warning-main border-warning-border',
    danger: 'bg-danger-surface text-danger-main border-danger-border',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-50">{icon}</div>}
      </div>
    </div>
  );
};
