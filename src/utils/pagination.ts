export default function paginationLine(params: number) {
  const count = Math.round(params / 10) + 1;
  return Array.from({ length: count }, (v, k) => k + 1);
}
