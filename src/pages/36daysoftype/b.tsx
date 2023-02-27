import React, { useEffect, useState } from "react";
import {
  animate,
  AnimationControls,
  motion,
  TargetAndTransition,
} from "framer-motion";
import { damp } from "three/src/math/MathUtils";
import Image from "next/image";
import Head from "next/head";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max) - max / 2;
}

const easeInOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

const limit = 400;
const range = 200;

const B = () => {
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(5);
  const [stiffness, setStiffness] = useState(5);

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <Head>
        <title>mrp. | 36 days of type | b</title>
      </Head>
      <h1 className="-skew-y-3 bg-primary px-2 text-lg text-zinc-900">
        36 days of type @ B
      </h1>
      <div className="relative flex h-[40rem] w-[40rem] items-center justify-center overflow-hidden border-4 border-zinc-900 bg-zinc-100 ring ring-primary">
        <p className="absolute absolute  z-20 block text-[288pt] text-zinc-100">
          B
        </p>
        <Bubble
          colorA="violet-500/20"
          colorB="pink-500/30"
          damping={damping}
          mass={mass}
          stiffness={stiffness}
        />
        <Bubble
          colorA="orange-400/20"
          colorB="pink-600/30"
          damping={damping}
          mass={mass}
          stiffness={stiffness}
        />
        <Bubble
          colorA="red-400/20"
          colorB="amber-500/30"
          damping={damping}
          mass={mass}
          stiffness={stiffness}
        />
        <Bubble
          colorA="lime-400/20"
          colorB="teal-600/30"
          damping={damping}
          mass={mass}
          stiffness={stiffness}
        />
        <Image src="/b.png" alt="b" fill className="hidden"></Image>
        <span className="hidden from-violet-500/20 from-orange-400/20 from-red-400/20 from-lime-400/20 to-pink-500/30 to-pink-600/30 to-amber-500/30 to-teal-600/30" />
      </div>
      <p className="bg-primary px-2 text-right text-zinc-900">
        Using: Tailwind & Framer Motion
      </p>
    </main>
  );
};

export default B;

type BubbleProps = {
  colorA: string;
  colorB: string;
  damping: number;
  mass: number;
  stiffness: number;
};

const Bubble = ({ colorA, colorB, damping, mass, stiffness }: BubbleProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const a = getRandomInt(range);
      const b = getRandomInt(range);
      setPos((prevPosition) => ({
        x:
          prevPosition.x +
          (a + prevPosition.x > limit || a + prevPosition.x < -limit ? -a : a),
        y:
          prevPosition.y +
          (b + prevPosition.y > limit || b + prevPosition.y < -limit ? -b : b),
      }));
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <motion.div
        animate={pos}
        transition={{ type: "spring", damping, mass, stiffness }}
        className="absolute z-30 flex h-40 w-40 items-center justify-center"
      >
        <div
          className={`absolute z-40 h-40 w-40 rounded-full bg-gradient-to-t from-${colorA} to-${colorB} blur-sm`}
        />
        <div
          className={`absolute z-40 h-[9rem] w-[9rem] rounded-full bg-gradient-to-t from-${colorA} to-${colorB} blur-[1px] backdrop-blur-[4px]`}
        />
        <div
          className={`absolute z-40 h-[9.25rem] w-[9.25rem] rounded-full bg-gradient-to-t from-${colorA} to-${colorB} blur-[2px] backdrop-blur-[3px]`}
        />
        <div
          className={`absolute z-40 h-[9.5rem] w-[9.5rem] rounded-full bg-gradient-to-t from-${colorA} to-${colorB} blur-[3px] backdrop-blur-[2px]`}
        ></div>
        <div
          className={`absolute z-40 h-[9.75rem] w-[9.75rem] rounded-full bg-gradient-to-t from-${colorA} to-${colorB} blur-[4px] backdrop-blur-[1px]`}
        />
        <div className="absolute z-30 h-[9.5rem] w-[9.5rem] rounded-full backdrop-invert"></div>
      </motion.div>
      <motion.div
        animate={pos}
        transition={{ type: "spring", damping, mass, stiffness }}
        className="absolute z-10 h-[9.5rem] w-[9.5rem] rounded-full bg-zinc-900 "
      ></motion.div>
    </React.Fragment>
  );
};
