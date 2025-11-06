export function clampRating(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value < 0) return 0;
  if (value > 5) return 5;
  return value;
}

export function renderStars(value: number) {
  const rounded = Math.round(clampRating(value));
  return '★'.repeat(rounded).padEnd(5, '☆');
}

export function formatReviewDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(date);
}
