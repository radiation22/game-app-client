import React, { useRef, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import gif from "../../assets/run.gif";

const RunningBoy = () => {
  const group = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(gif, (gltf) => {
      const model = gltf.scene;

      model.position.set(0, 0, 0);
      model.scale.set(0.01, 0.01, 0.01);
      model.rotation.set(0, Math.PI, 0);

      group.current.add(model);
    });
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return <group ref={group} />;
};

export default RunningBoy;
