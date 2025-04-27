import { useMemo } from "react"
import * as THREE from "three"
import Mushroom from "./Mushroom"

export default function Forest(){
    const geometry=useMemo(()=>{
        const geom=new THREE.PlaneGeometry(200,200,100,100)
        const pos=geom.attributes.position

        for (let i=0;i<pos.count;i++){
            const y=2*Math.sin(pos.getX(i)*0.1)+2*Math.cos(pos.getY(i)*0.1)
            pos.setZ(i,y)
        }
        pos.needsUpdate=true
        geom.computeVertexNormals()
        geom.rotateX(-Math.PI/2)
        return geom
    },[]);
    const mushroomPositions=[];
    for(let i=0;i<10;i++){
        const x=(Math.random()-0.5)*200;
        const z=(Math.random()-0.5)*200;
        mushroomPositions.push(new THREE.Vector3(x,0,z));
    }
    return(
        <>
        <mesh geometry={geometry} receiveShadow name="ground">
            <meshStandardMaterial color="green" />
        </mesh>
        {mushroomPositions.map((position,index)=>(
            <Mushroom key={index} position={position} />
        ))}
        </>
    );
}