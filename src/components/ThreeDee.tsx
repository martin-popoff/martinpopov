import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three-stdlib";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AsciiRenderer({
  renderIndex = 1,
  bgColor = "black",
  fgColor = "white",
  characters = " .:-+*=%@#",
  invert = true,
  color = false,
  resolution = 0.2,
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color, resolution]);

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [fgColor, bgColor]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = "0";
    gl.domElement.parentNode!.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      gl.domElement.parentNode!.removeChild(effect.domElement);
    };
  }, [effect]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);

  // This component returns nothing, it is a purely logical
  return <></>;
}

function Cat() {
  const { scene } = useGLTF("/dingus_the_cat.glb");
  const ref = useRef({ rotation: { y: 0 } });
  useFrame(
    (state, delta) => (ref.current.rotation.y = ref.current.rotation.y += delta)
  );
  return (
    <primitive object={scene} scale={0.15} ref={ref} rotation={[0.5, 0, 0]} />
  );
}

const ThreeDee = () => {
  return (
    <Canvas className="w-full">
      <color attach="background" args={["#000"]} />
      <spotLight position={[20, 20, 20]} angle={0.25} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Cat />

      <AsciiRenderer fgColor="white" bgColor="#18181b" />
    </Canvas>
  );
};

export default ThreeDee;
