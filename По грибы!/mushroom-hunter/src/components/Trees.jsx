import { useRef } from "react";
import * as THREE from "three";
export default function Trees(){
    const trees=[]
    const treeRefs=useRef([]);
    for (let i=0; i<60; i++){
        const x=(Math.random()-0.5)*100
        const z=(Math.random()-0.5)*100
        const height=8+Math.random()*2
        trees.push(
            <group ref={(ref) => {treeRefs.current[i]=ref;}} key={i} position={[x,0,z]}>
                <mesh position={[0,height/2,0]} castShadow>
                    <cylinderGeometry args={[0.2,0.2,height]} />
                    <meshStandardMaterial color={'brown'} />
                </mesh>
                <mesh position={[0,height+1,0]} castShadow>
                    <sphereGeometry args={[1.5,8,8]} />
                    <meshStandardMaterial color={'darkgreen'}/>
                </mesh>
            </group>
        )
    }
    return <>{trees}</>
}