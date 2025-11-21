interface DeadlineBadgeProps {
  deadline: Date;
}

export const DeadlineBadge = ({ deadline }: DeadlineBadgeProps) => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  const getColor = () => {
    if (daysLeft < 0) return 'bg-red-100 text-red-800';
    if (daysLeft <= 3) return 'bg-orange-100 text-orange-800';
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getText = () => {
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getColor()}`}>
      {getText()}
    </span>
  );
};
