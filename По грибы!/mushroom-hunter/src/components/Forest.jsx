export default function Forest(){
    return(
        <mesh reciveShadow rotation={[-Math.PI/2,0,0]}>
            <planeGeometry args={[100,100]} />
            <meshStandardMaterial color="green" />
        </mesh>
    )
}