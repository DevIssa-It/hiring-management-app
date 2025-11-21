import { getMatchColor } from '../../utils/skillsMatching';

interface SkillMatchBadgeProps {
  percentage: number;
}

export const SkillMatchBadge = ({ percentage }: SkillMatchBadgeProps) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(percentage)}`}>
      <span className="mr-1">🎯</span>
      {percentage}% Match
    </div>
  );
};
