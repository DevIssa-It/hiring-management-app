import type { ApplicationData, JobFormConfiguration } from '@/types';

export function calculateMatchRate(applicant: ApplicationData, jobConfig: JobFormConfiguration): number {
  let score = 0;
  let maxScore = 0;
  Object.entries(jobConfig).forEach(([key, requirement]) => {
    if (requirement === 'mandatory') {
      maxScore += 2;
      if (applicant[key as keyof ApplicationData]) score += 2;
    } else if (requirement === 'optional') {
      maxScore += 1;
      if (applicant[key as keyof ApplicationData]) score += 1;
    }
  });
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}