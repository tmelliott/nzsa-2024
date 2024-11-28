export const size = (x: number, ratio?: number) =>
  `min(${x}vh, ${x * (ratio ?? 4 / 3)}vw)`;
