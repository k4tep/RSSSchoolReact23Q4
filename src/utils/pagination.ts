export default function paginationLine(params: number) {
  const count = Math.floor(params / 10);
  return Array.from(
    { length: params / 10 > count || count < 1 ? count + 1 : count },
    (v, k) => k + 1
  );
}
