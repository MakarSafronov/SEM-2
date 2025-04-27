import { Children, useEffect,useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from 'three';
import mushCoz from 'D:/ЗагрускиD/obj_f_1500_v_752.obj';
export default function Mushroom({position}){
    const group=useRef();
    const obj=useLoader(OBJLoader,mushCoz);
    useEffect(()=>{
        if(obj){
            obj.traverse((child)=>{
                if(child.isMesh){
                    child.castShadow=true;
                    child.receiveShadow=true;
                }
            });
        }
    },[obj]
);
return(
    <group ref={group} position={position}>
        {obj && <primitive object={obj} />}
    </group>
);
}