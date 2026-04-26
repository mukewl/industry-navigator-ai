"use client";

import { motion } from "framer-motion";

// Adapted from kokonutd's BackgroundPaths (21st.dev community component).
// Only the FloatingPaths sub-component is kept. Visual modifications:
//  1. Path count tunable via PATH_COUNT constant (originally 36 in source).
//  2. Color delivered via `currentColor` — set the parent's `text-*` class to
//     control hue.
//  3. strokeOpacity capped at 0.45 (effective peak ~0.27 after the
//     animate-opacity multiplier).
//  4. Stroke widths reduced to 0.4 + i * 0.02 (max ~0.78px) for refinement.

const PATH_COUNT = 30;

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: PATH_COUNT }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.4 + i * 0.02,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={Math.min(0.45, 0.12 + path.id * 0.018)}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export default FloatingPaths;
