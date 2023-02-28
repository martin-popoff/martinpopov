import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

type Circle = {
  x: number;
  y: number;
  r: number;
};

type Point = {
  x: number;
  y: number;
};

function intersection(c1: Circle, c2: Circle) {
  const result = {
    intersect_occurs: true,
    point_1: { x: 0, y: 0 },
    point_2: { x: 0, y: 0 },
  };
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const dist = Math.hypot(dy, dx);

  if (dist > c1.r + c2.r) result.intersect_occurs = false;
  if (result.intersect_occurs) {
    const centroid = (c1.r * c1.r - c2.r * c2.r + dist * dist) / (2.0 * dist);
    const x2 = c1.x + (dx * centroid) / dist;
    const y2 = c1.y + (dy * centroid) / dist;
    const h = Math.sqrt(c1.r * c1.r - centroid * centroid);
    const rx = -dy * (h / dist);
    const ry = dx * (h / dist);
    result.point_1.x = x2 + rx;
    result.point_1.y = y2 + ry;
    result.point_2.x = x2 - rx;
    result.point_2.y = y2 - ry;
  }
  return result;
}

function closestPointOnCircleEdge(A: Point, B: Point, r: number) {
  const a1 = B.x - A.x;
  const b1 = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;

  let x = A.x + r * (a1 / Math.sqrt(b1));

  const a2 = B.y - A.y;
  const b2 = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;

  let y = A.y + r * (a2 / Math.sqrt(b2));

  const C = { x, y };

  return C;
}

const Test = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx);
  const springY = useSpring(my);
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pointA, setPointA] = useState({ x: 0, y: 0 });
  const [pointB, setPointB] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(30);
  const [pointC, setPointC] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    x4: 0,
    y4: 0,
    x5: 0,
    y5: 0,
    x6: 0,
    y6: 0,
  });
  const ref = useRef(null);

  const p1 = 75;
  const p2 = 75;
  const r2 = 30;

  useMotionValueEvent(springX, "change", (latest) => {
    drawBlow();
  });

  useMotionValueEvent(springY, "change", (latest) => {
    drawBlow();
  });

  const drawBlow = () => {
    const x = springX.get();
    const y = springY.get();
    const angle = Math.atan2(p2 - y, p1 - x) * (180 / Math.PI);

    const res = intersection(
      { x: p1, y: p2, r: radius + r2 },
      { x, y, r: radius + r2 }
    );
    setPointA(res.point_1);
    setPointB(res.point_2);
    const circ1 = { x: p1, y: p2 };
    const res1 = closestPointOnCircleEdge(circ1, res.point_2, r2);
    const res2 = closestPointOnCircleEdge(circ1, res.point_1, r2);
    const res3 = closestPointOnCircleEdge({ x, y }, res.point_1, radius);
    const res4 = closestPointOnCircleEdge({ x, y }, res.point_2, radius);

    const distance = Math.hypot(res.point_2.x - res1.x, res.point_2.y - res1.y);

    const balldistance = Math.hypot(circ1.x - x, circ1.y - y);

    const res5 = closestPointOnCircleEdge(res.point_1, res.point_2, distance);
    const res6 = closestPointOnCircleEdge(res.point_2, res.point_1, distance);
    if (balldistance > 120) {
      setDistance(0);
      return;
    }
    setDistance(distance);

    setPointC({
      x1: res1.x,
      y1: res1.y,
      x2: res2.x,
      y2: res2.y,
      x3: res3.x,
      y3: res3.y,
      x4: res4.x,
      y4: res4.y,
      x5: res5.x,
      y5: res5.y,
      x6: res6.x,
      y6: res6.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    let target = e.currentTarget.getBoundingClientRect();
    springX.set(e.clientX - target.left);
    springY.set(e.clientY - target.top);
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <Head>
        <title>mrp. | 36 days of type | C</title>
      </Head>
      <h1 className="-skew-y-3 bg-primary px-2 text-lg text-zinc-900">
        36 days of type @ C
      </h1>
      <motion.div
        ref={ref}
        onMouseMove={(e) => handleMouseMove(e)}
        className="relative flex h-[40rem] w-[40rem] items-center justify-center overflow-hidden border-4 border-zinc-900 bg-zinc-100 ring ring-primary"
      >
        <motion.svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="75" cy="75" r="30" />
          <g fill="transparent" stroke="transparent" className="hidden">
            <circle cx="75" cy="75" r="60" stroke="#000" fill="transparent" />
            <circle cx={pointA.x} cy={pointA.y} r="2" fill="#f00" />
            <circle cx={pointB.x} cy={pointB.y} r="2" fill="#f00" />

            <circle
              cx={pointA.x}
              cy={pointA.y}
              r={distance}
              stroke="#000"
              fill="transparent"
            />
            <circle
              cx={pointB.x}
              cy={pointB.y}
              r={distance}
              stroke="#000"
              fill="transparent"
            />
            <circle cx={pointC.x1} cy={pointC.y1} r="2" fill="#00f" />
            <circle cx={pointC.x2} cy={pointC.y2} r="2" fill="#0f0" />
            <circle cx={pointC.x3} cy={pointC.y3} r="2" fill="#f00" />
            <circle cx={pointC.x4} cy={pointC.y4} r="2" fill="#f0f" />

            <circle cx={pointC.x5} cy={pointC.y5} r="2" fill="#ff0" />
            <circle cx={pointC.x6} cy={pointC.y6} r="2" fill="#ff0" />
            <motion.circle
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              r="60"
              stroke="#000"
              fill="transparent"
            />
          </g>
          <motion.circle
            style={{
              x: springX,
              y: springY,
            }}
            r={radius}
          />

          <g
            fill="#000"
            className={` ${distance > 0 ? "" : "hidden"} transition-opacity`}
          >
            <path
              d={`M ${pointC.x1} ${pointC.y1} A 1 1 0 0 0 ${pointC.x2} ${pointC.y2} L ${pointC.x3} ${pointC.y3}  A 1 1 0 0 0 ${pointC.x4} ${pointC.y4}  L ${pointC.x1} ${pointC.y1} Z`}
            />
          </g>
          <circle cx={pointA.x} cy={pointA.y} r={distance} fill="#f4f4f5" />
          <circle cx={pointB.x} cy={pointB.y} r={distance} fill="#f4f4f5" />
        </motion.svg>
      </motion.div>
      <p className="bg-primary px-2 text-right text-zinc-900">
        Using: ThreeJS & AsciiRenderer
      </p>
      <p className="bg-zinc-100">{mx.get()}</p>
    </main>
  );
};

export default Test;
