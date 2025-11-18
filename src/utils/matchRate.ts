import type { ApplicationData, JobFormConfiguration } from '@/types';

export function calculateMatchRate(applicant: ApplicationData | null | undefined, jobConfig: JobFormConfiguration): number {
  if (!applicant || !jobConfig) return 0;
  
  let score = 0;
  let maxScore = 0;
  
  try {
    Object.entries(jobConfig).forEach(([key, requirement]) => {
      if (requirement === 'mandatory') {
        maxScore += 2;
        const value = applicant[key as keyof ApplicationData];
        if (value !== undefined && value !== null && value !== '') score += 2;
      } else if (requirement === 'optional') {
        maxScore += 1;
        const value = applicant[key as keyof ApplicationData];
        if (value !== undefined && value !== null && value !== '') score += 1;
      }
    });
  } catch (error) {
    console.error('Error calculating match rate:', error);
    return 0;
  }
  
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}