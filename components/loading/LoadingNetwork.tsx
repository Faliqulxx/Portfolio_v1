"use client";

import { motion } from "framer-motion";
import { networkNodes, networkEdges, networkCenter } from "@/lib/loading-data";
import type { LoadingStage } from "./LoadingScreen";

export default function LoadingNetwork({ stage }: { stage: LoadingStage }) {
  // "gathering" covers both the moment the graph converges into the
  // initials (reveal) and the moment it dissolves into the hero (exit).
  const gathering = stage === "reveal" || stage === "exit";
  const dissolving = stage === "exit";

  return (
    <svg
      viewBox="0 0 800 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        {networkEdges.map(([a, b], i) => {
          const from = networkNodes[a];
          const to = networkNodes[b];
          return (
            <motion.line
              key={`edge-${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(96, 165, 250, 0.45)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: stage === "particles" ? 0 : 1,
                // Edges fade out just before nodes start converging, so
                // lines never appear to "detach" from their moving nodes.
                opacity: stage === "particles" || gathering ? 0 : 0.6,
              }}
              transition={{ duration: 0.9, delay: 0.015 * i, ease: "easeInOut" }}
            />
          );
        })}
      </g>

      <g>
        {networkNodes.map((node, i) => {
          const dx = gathering ? (networkCenter.x - node.x) * (dissolving ? 1.15 : 1) : 0;
          const dy = gathering ? (networkCenter.y - node.y) * (dissolving ? 1.15 : 1) : 0;

          return (
            <motion.circle
              key={`node-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={3.2}
              fill="rgba(147, 197, 253, 0.9)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: dissolving ? 0 : 1,
                scale: dissolving ? 0.4 : gathering ? 0.5 : 1,
                x: dx,
                y: dy,
              }}
              transition={{
                duration: gathering ? 0.9 : 0.5,
                delay: 0.02 * i,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
