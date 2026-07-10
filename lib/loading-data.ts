// Data for the cinematic loading sequence (components/loading/*).
// Node/edge coordinates are hardcoded (not Math.random()) so the server
// render and the first client render are pixel-identical — no hydration
// mismatch, and the animation only ever runs after mount.

export type NetworkNode = { id: number; x: number; y: number };
export type NetworkEdge = [number, number];

// Positions live in an 800x400 viewBox, loosely centered on (400, 200).
export const networkNodes: NetworkNode[] = [
  { id: 0, x: 80, y: 60 },
  { id: 1, x: 180, y: 140 },
  { id: 2, x: 140, y: 260 },
  { id: 3, x: 260, y: 80 },
  { id: 4, x: 300, y: 220 },
  { id: 5, x: 380, y: 320 },
  { id: 6, x: 420, y: 120 },
  { id: 7, x: 480, y: 240 },
  { id: 8, x: 560, y: 60 },
  { id: 9, x: 600, y: 180 },
  { id: 10, x: 660, y: 300 },
  { id: 11, x: 700, y: 100 },
  { id: 12, x: 720, y: 220 },
  { id: 13, x: 240, y: 340 },
  { id: 14, x: 500, y: 340 },
  { id: 15, x: 620, y: 40 },
];

export const networkEdges: NetworkEdge[] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [2, 4],
  [4, 5],
  [3, 6],
  [6, 7],
  [4, 7],
  [6, 8],
  [8, 9],
  [7, 9],
  [9, 10],
  [9, 11],
  [11, 12],
  [10, 12],
  [8, 15],
  [11, 15],
  [5, 14],
  [10, 14],
  [2, 13],
  [13, 4],
];

export const networkCenter = { x: 400, y: 200 };

export const roleTitles = [
  "Artificial Intelligence",
  "Data Science",
  "AI Automation",
  "Full Stack Development",
] as const;

export const bootMessages = [
  "Initializing AI...",
  "Loading Knowledge Base...",
  "Preparing Portfolio...",
  "Optimizing Experience...",
  "System Ready",
] as const;
