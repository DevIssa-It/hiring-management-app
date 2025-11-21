export const calculateSkillMatch = (
  requiredSkills: string[],
  candidateSkills: string[]
): number => {
  if (requiredSkills.length === 0) return 100;
  
  const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim());
  const normalizedCandidate = candidateSkills.map(s => s.toLowerCase().trim());
  
  const matches = normalizedRequired.filter(skill =>
    normalizedCandidate.includes(skill)
  );
  
  return Math.round((matches.length / normalizedRequired.length) * 100);
};

export const getMatchColor = (percentage: number): string => {
  if (percentage >= 80) return 'text-green-600 bg-green-100';
  if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
  if (percentage >= 40) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
};
