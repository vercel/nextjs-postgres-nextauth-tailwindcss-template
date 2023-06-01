export const formatDate = (date?: string) => {
  if (!date) return '';
  const dateObj = new Date(date);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return dateObj.toLocaleDateString('es-ES', options as any);
};