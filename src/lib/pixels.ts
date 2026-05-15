export type SpriteName = "fact_graph" | "agent" | "neuron" | "book" | "data";

export interface SpriteFrame {
  grid: number[][];
  primaryColor: string;
  secondaryColor: string;
}

export const spriteDefinitions: Record<SpriteName, SpriteFrame[]> = {
  fact_graph: [
    {
      grid: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
      ],
      primaryColor: "#84CC16",
      secondaryColor: "#F59E0B",
    },
  ],
  agent: [
    {
      grid: [
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 2, 2, 0, 1, 1],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#EF4444",
    },
  ],
  neuron: [
    {
      grid: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 2, 2, 0, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [0, 1, 0, 2, 2, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ],
      primaryColor: "#A78BFA",
      secondaryColor: "#F59E0B",
    },
  ],
  book: [
    {
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#F5F0E8",
    },
  ],
  data: [
    {
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 2, 0, 2, 1],
        [1, 0, 1, 0, 2, 0, 2, 1],
        [1, 1, 1, 0, 2, 2, 2, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#84CC16",
    },
  ],
};

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  name: SpriteName,
  size: number,
  frameIndex: number,
  hovered: boolean,
) {
  const frames = spriteDefinitions[name];
  const frame = frames[Math.min(frameIndex, frames.length - 1)];
  const cellSize = size / 8;

  ctx.clearRect(0, 0, size, size);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const val = frame.grid[y][x];
      if (val === 0) continue;
      ctx.fillStyle =
        val === 1
          ? hovered
            ? frame.secondaryColor
            : frame.primaryColor
          : hovered
            ? frame.primaryColor
            : frame.secondaryColor;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
