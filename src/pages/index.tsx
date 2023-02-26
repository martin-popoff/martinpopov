import Image from "next/image";
import { Ubuntu_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";
import ThreeDee from "@/components/ThreeDee";
import Head from "next/head";

const ubuntu_mono = Ubuntu_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: -50, y: -50 });
  const [face, setFace] = useState("fa-face-smile ");

  const h1 = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1,
      },
    },
  };

  const easeInOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  };

  const letter_anim = {
    hidden: { y: "100%", opacity: 0 },
    show: { y: "0%", opacity: 1 },
  };

  const face_anim = {
    up: {
      y: ["0%", "-50%", "-60%", "-50%", "0%"],
      scale: [1, 1, 1.25, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.3, 0.5, 0.7, 1],
      },
    },
    down: { y: "0%" },
  };

  const message = "We will return after this short message!";

  const handleMouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <main
      className={`${ubuntu_mono.className} flex h-[100vh] flex-col items-center justify-center gap-8 p-4`}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Head>
        <title>mrp.</title>
      </Head>
      <motion.span
        className="pointer-events-none absolute top-0  left-0 z-40 block h-20 w-20 rounded-full backdrop-invert"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
      />
      <motion.div
        animate={{ opacity: 1 }}
        className="relative h-12 w-40 opacity-0"
      >
        <Image
          src="/logo-alt.png"
          fill
          alt="mrp."
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.h1
        className="relative block px-2 text-xl text-white md:text-3xl"
        variants={h1}
        initial="hidden"
        animate="show"
      >
        {message.split("").map((letter, index) => (
          <motion.span
            key={index}
            className={`inline-block translate-y-full  ${
              letter === " "
                ? "mr-2"
                : "before:top-1/2 before:left-0 before:block before:h-1 before:w-full before:bg-primary/100 after:absolute after:top-full after:left-0 after:mt-1 after:block after:h-1 after:w-full after:bg-primary/30"
            }`}
            variants={letter_anim}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ delay: message.length * 0.1 + 2 }}
        className="absolute -z-10 h-4/5  max-h-[25rem] w-4/5 max-w-[25rem] opacity-0"
      >
        <ThreeDee />
      </motion.div>
      <div
        className="fixed bottom-0 left-0 z-30 h-20 w-20"
        onMouseOver={() => setTimeout(() => setFace("fa-face-smile-wink"), 500)}
        onMouseLeave={() => setTimeout(() => setFace("fa-face-smile"), 500)}
      ></div>
      <motion.i
        variants={face_anim}
        animate={face == "fa-face-smile-wink" ? "up" : "down"}
        initial="down"
        className={`fa-solid ${face} pointer-events-none absolute bottom-8 left-8 z-50 text-2xl text-zinc-900`}
      />
      <motion.p
        className="talk fixed bottom-4 text-transparent opacity-0"
        animate={{ opacity: 1 }}
        transition={{ delay: message.length * 0.1 + 5 }}
      >
        Too eager to talk? Message{" "}
        <a
          href="mailto:me@martinpopov.com?subject=Hey, let's talk! 👋"
          className="transition-colors hover:bg-primary hover:text-white"
        >
          me@martinpopov.com
        </a>
      </motion.p>
    </main>
  );
}
