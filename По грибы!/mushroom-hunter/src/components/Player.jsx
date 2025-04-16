import { useThree,useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const SPEED=5
const rotationSpeed=0.002
export default function Player(){
    const {camera,gl,scene}=useThree()
    const keys=useRef({})
    const direction=useRef(new THREE.Vector3())
    const mouseMovement=useRef({x:0,y:0})

    const playerRef=useRef(new THREE.Object3D())
    const pitchRef=useRef(new THREE.Object3D())

    useEffect(()=>{
        playerRef.current.position.set(0,2,5)
        pitchRef.current.add(camera)
        playerRef.current.add(pitchRef.current)
        scene.add(playerRef.current)
        const onKeyDown=(e)=>keys.current[e.code]=true
        const onKeyUp=(e)=>keys.current[e.code]=false
        window.addEventListener("keydown",onKeyDown)
        window.addEventListener("keyup",onKeyUp)
        const onClick=()=>{
            gl.domElement.requestPointerLock()
        }

        const onMouseMove=(e)=>{
            if (document.pointerLockElement===gl.domElement){
                mouseMovement.current.x=e.movementX
                mouseMovement.current.y=e.movementY
            }
        }

        gl.domElement.addEventListener("click",onClick)
        document.addEventListener("mousemove",onMouseMove)

        return ()=>{
            window.removeEventListener("keydown",onKeyDown)
            window.removeEventListener("keyup",onKeyUp)
            document.removeEventListener("mousemove",onMouseMove)
        }
    },[])

    useFrame((_,delta)=>{
        playerRef.current.rotation.y-=mouseMovement.current.x*rotationSpeed
        pitchRef.current.rotation.x-=mouseMovement.current.y*rotationSpeed
        pitchRef.current.rotation.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,pitchRef.current.rotation.x))
        mouseMovement.current.x=0
        mouseMovement.current.y=0

        direction.current.set(0,0,0)
        if(keys.current["KeyW"]) direction.current.z-=1
        if(keys.current["KeyS"]) direction.current.z+=1
        if(keys.current["KeyA"]) direction.current.x+=1
        if(keys.current["KeyD"]) direction.current.x-=1
        direction.current.normalize()

        const angle=playerRef.current.rotation.y
        const dx=direction.current.x*Math.cos(angle)-direction.current.z*Math.sin(angle)
        const dz=direction.current.x*Math.sin(angle)+direction.current.z*Math.cos(angle)

        playerRef.current.position.x+=dx*SPEED*delta
        playerRef.current.position.z+=dz*SPEED*delta
    })
    return(
        <mesh position={[0,1,0]} castShadow>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}