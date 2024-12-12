import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLightHelper } from "three";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    // console.log(state)
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    // ref.current.rotation.z += delta;

    // ref.current.position.z = Math.sin(state.clock.elapsedTime)*2;
    // ref.current.position.x = Math.sin(state.clock.elapsedTime)*2;
    // ref.current.position.y = Math.sin(state.clock.elapsedTime)*2;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, args, color }) => {
  const ref = useRef();
  const [isHovred, setisHovred] = useState(false);
  const [isClicked, setisClicked] = useState(false)
  useFrame((state, delta) => {
    // console.log(state)
    // ref.current.rotation.x += delta ;
    const speed = isHovred ? 1 : 0.2
    ref.current.rotation.y += delta * speed;
    // ref.current.rotation.z += delta;

    // ref.current.position.z = Math.sin(state.clock.elapsedTime);
    // ref.current.position.x = Math.sin(state.clock.elapsedTime)*2;
    // ref.current.position.y = Math.sin(state.clock.elapsedTime)*2;
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setisHovred(true);
      }}
      onPointerLeave={()=>{
        setisHovred(false)
      }}
      onClick={()=>{
        setisClicked(!isClicked)
      }}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial color={isHovred ? "orange" : "blue"} wireframe />
    </mesh>
  );
};

const Touras = ({ position, args, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const TourasKnot = ({ position, args }) => {
  const ref = useRef();

  const {color,radius} = useControls({color:"lightblue",
    radius:{
      value:5,
      min:1,
      max:10,
      step:0.5,
    },
  })

  // useFrame((state, delta) => {
  //   // console.log(state)
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   // ref.current.rotation.z += delta;

  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  //   // ref.current.position.x = Math.sin(state.clock.elapsedTime)*2;
  //   // ref.current.position.y = Math.sin(state.clock.elapsedTime)*2;
  // });

  return (
    <mesh position={position}>
      <torusKnotGeometry args={[radius,...args]} />
      {/* <meshStandardMaterial color={color} />
       */}
       <MeshWobbleMaterial factor={5} speed={1} color={color} />
    </mesh>
  );
};

const Secne = ()=>{
  const dirLightRef = useRef();

  const {lightColor, lightIntensity} = useControls({lightColor:"white",
  lightIntensity:{
    value:0.5,
    min:0,
    max:5,
    step:0.1
  },
  })

  useHelper(dirLightRef, DirectionalLightHelper,0.5,"white")

  return (
    <>
       <directionalLight position={[0, 0, 2]}  ref={dirLightRef} intensity={lightIntensity} color={lightColor} />
      <ambientLight intensity={0.1}   />
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} size={[1, 1, 1]} color={"red"} />
        <Cube position={[-1, 1, 0]} size={[1, 1, 1]} color={"blue"} />
      </group> */}
      {/* <Cube position={[0,0,0]} size={[1,1,1]} color={"orange"} /> */}
      {/* <Sphere position={[0, 0, 0]} args={[1, 30, 30]} color={"orange"} /> */}
      {/* <Touras position={[-2,2,0]} args={[1,0.2,30,30,8]} color={"blue"} /> */}

      <TourasKnot position={[0,0,0]} args={[0.1,1000,50]} color={"hotpink"} />
      <OrbitControls enableZoom={false} />
    </>
  )
}

function App() {
  return (
    <Canvas>
     <Secne />
    </Canvas>
  );
}

export default App;
