export const formatSalary = (min?: number, max?: number): string => {
  if (!min || !max || min === 0 || max === 0) {
    return 'Not specified';
  }
  
  return `Rp${min.toLocaleString('id-ID')} - Rp${max.toLocaleString('id-ID')}`;
};