import React, { useEffect, useRef, useState } from 'react';
import { getAllMemes } from '../api/meme';
import { Meme } from '../types';
import { text } from 'stream/consumers';
interface DraggableText{
    text:string;
    x:number;
    y:number;
}
export const MemeGenerator: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentMeme,setCurrentMeme]=useState<Meme | null>(null);
  const [texts,setTexts]=useState<DraggableText[]>([]);
  const [inputValue,setInputValue]=useState('');
  const [isAdding,setIsAdding]=useState(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const draggingTextIndex=useRef<number | null>(null);
  const offset=useRef<{x:number;y:number}>({x:0,y:0});
  useEffect(()=>{
    (async()=>{
        const json=await getAllMemes();
        setMemes(json.data.memes);
        setCurrentMeme(json.data.memes[0]);
    })();
  },[]);
  useEffect(()=>{
    if (!currentMeme) return;
    const canvas=canvasRef.current;
    if (!canvas) return;
    const ctx=canvas.getContext("2d");
    if (!ctx) return;
    const img=new Image();
    img.crossOrigin='anonymous';
    img.src=currentMeme.url;
    img.onload=()=>{
        canvas.width=img.width;
        canvas.height=img.height;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img,0,0);
        ctx.font='36px Impact';
        ctx.fillStyle='white';
        ctx.strokeStyle='black';
        ctx.lineWidth=3;
        ctx.textAlign='center';
        texts.forEach(({text,x,y})=>{
            ctx.fillText(text,x,y);
            ctx.strokeText(text,x,y);
        })
    };
  },[currentMeme,texts]);
const addText=()=>{
    setIsAdding(true);
};
const saveMeme=()=>{
    const canvas=canvasRef.current;
    if (!canvas) return;
    const link=document.createElement('a');
    link.href=canvas.toDataURL('image/png');
    link.download='meme.png';
    link.click();
};
const nextMeme=()=>{
    if (memes.length===0) return;
    const random = memes[Math.floor(Math.random()*memes.length)];
    setCurrentMeme(random);
    setTexts([]);
    setInputValue('');
    setIsAdding(false);
};
const handleMouseDown=(e:React.MouseEvent<HTMLCanvasElement>)=>{
    const rect=canvasRef.current!.getBoundingClientRect();
    const mouseX=e.clientX-rect.left;
    const mouseY=e.clientY-rect.top;
    for (let i=texts.length-1;i>=0;i--){
        const {x,y}=texts[i];
        const width=200;
        const height=40;
        if(
            mouseX>=x-width/2 &&
            mouseX<=x+width/2 &&
            mouseY>=y-height/2 &&
            mouseY<=y+height/2
        ){
            draggingTextIndex.current=i;
            offset.current={x:mouseX-x,y:mouseY-y};
            return;
        }
    }
};
const handleMouseMove=(e:React.MouseEvent<HTMLCanvasElement>)=>{
    if (draggingTextIndex.current===null) return;
    const rect=canvasRef.current!.getBoundingClientRect();
    const mouseX=e.clientX-rect.left;
    const mouseY=e.clientY-rect.top;
    const newTexts=[...texts];
    newTexts[draggingTextIndex.current]={
        ...newTexts[draggingTextIndex.current],
        x:mouseX-offset.current.x,
        y:mouseY-offset.current.y,
    };
    setTexts(newTexts);
};
const handleMouseUp=()=>{
    draggingTextIndex.current=null;
};
  return(
    <div className='container'>
        <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        />
        <div className='controls'>
            <button onClick={addText}>
                Добавить текст
            </button>
            {isAdding && (
                <input
                autoFocus
                value={inputValue}
                onChange={e=> setInputValue(e.target.value)}
                onKeyDown={e=> {
                    if (e.key==='Enter' && inputValue.trim() && canvasRef.current){
                        const canvas=canvasRef.current;
                        const newText:DraggableText={
                            text: inputValue.trim(),
                            x: canvas.width/2,
                            y: 50+texts.length*50,
                        };
                        setTexts([...texts,newText]);
                        setInputValue('');
                        setIsAdding(false);
                    }
                }}
                placeholder='введите текст и нажмите Enter'
                />
            )}
            <button onClick={nextMeme}>
                обновить мем
            </button>
            <button onClick={saveMeme}>
                сохранить мем
            </button>
        </div>
    </div>
  );
};
