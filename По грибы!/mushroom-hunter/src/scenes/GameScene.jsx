import Forest from "../components/Forest"
import Player from "../components/Player"


export default function GameScene(){
    return(
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10,10,5]} intensity={1} castShadow />
            <Forest />
            <Player />
            
        </>
    )
}