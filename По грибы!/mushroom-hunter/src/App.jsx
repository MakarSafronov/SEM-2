import {Canvas} from "@react-three/fiber"
import GameScene from "./scenes/GameScene"
import "./App.css"
import BookIcon from "./components/BookIcon"
import { useState,useEffect } from "react"
import BookUI from "./components/BookUI"

export default function App(){
  const [bookOpen,setBookOpen]=useState(false)
  useEffect(()=>{
    const handleKeyDown=(e)=>{
      if(e.key==="t" || e.key==="T" || e.key==="е" || e.key==="Е"){
        setBookOpen((prev)=>!prev)
      }
    }
    window.addEventListener("keydown",handleKeyDown)
    return () => window.removeEventListener("keydown",handleKeyDown)
  },[])
  return(
    <div className="canvas-container" style={{position:"relative"}}>
    <Canvas shadows camera={{position:[0,2,5],fov:75}}>
      <GameScene />
    </Canvas>
    <BookIcon onClick={()=>setBookOpen(true)} />
    <BookUI visible={bookOpen} onClose={()=>setBookOpen(false)} />
    </div>
  )
}