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
import LetterA from "@/components/LetterA";

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

const A = () => {
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(5);
  const [stiffness, setStiffness] = useState(5);

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <Head>
        <title>mrp. | 36 days of type | b</title>
      </Head>
      <h1 className="-skew-y-3 bg-primary px-2 text-lg text-zinc-900">
        36 days of type @ A
      </h1>
      <div className="relative flex h-[40rem] w-[40rem] items-center justify-center overflow-hidden border-4 border-zinc-900 bg-zinc-100 ring ring-primary">
        <LetterA />
      </div>
      <p className="bg-primary px-2 text-right text-zinc-900">
        Using: ThreeJS & AsciiRenderer
      </p>
    </main>
  );
};

export default A;
