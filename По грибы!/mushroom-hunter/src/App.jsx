import {Canvas} from "@react-three/fiber"
import GameScene from "./scenes/GameScene"
import "./App.css"

export default function App(){
  return(
    <div className="canvas-container">
    <Canvas shadows camera={{position:[0,2,5],fov:75}}>
      <GameScene />
    </Canvas>
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "8px",
      height: "8px",
      marginLeft: "-4px",
      marginTop: "-4px",
      background: "black",
      borderRadius: "50%",
      zIndex: 10,
      pointerEvents: "none"
    }} />

    </div>
  )
}