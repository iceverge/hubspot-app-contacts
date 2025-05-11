export const PAGE_SIZE = 10;

export const getPagination = (
  current: number,
  total: number
): (number | string)[] => {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, "...", total - 2, total - 1, total];
  }
  if (current >= total - 2) {
    return [1, 2, 3, "...", total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
};
