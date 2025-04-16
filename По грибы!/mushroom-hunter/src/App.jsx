import {Canvas} from "@react-three/fiber"
import GameScene from "./scenes/GameScene"
import "./App.css"

export default function App(){
  return(
    <div className="canvas-container">
    <Canvas shadows camera={{position:[0,2,5],fov:75}}>
      <GameScene />
    </Canvas>
    </div>
  )
}