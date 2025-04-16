import { useState } from "react"
import './RandomColor.css'

function RandomColor() {
  const [colorType, setColorType] = useState('hex');
  const [color, setColor] = useState({r:0,g:0,b:128});

  function GenerateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor({r:r,g:g,b:b});
  }

  function HexColor(r,g,b) {
    const hexMe = (c) => {
      const code = c.toString(16);
      return code.length == 1 ? "0" + code : code;
    };
    return '#' + hexMe(r) + hexMe(g) + hexMe(b); 
  }

  function RgbColor(r,g,b) {
    return `rgb(${r},${g},${b})`;
  }

  const hexCode = HexColor(color.r, color.g, color.b);
  document.body.style.backgroundColor = hexCode;
  
  return (
    <>
      <div className="button-container">
        <button onClick={()=>setColorType('hex')}>Set Hex Color</button>
        <button onClick={()=>setColorType('rgb')}>Set RGB Color</button>
        <button onClick={GenerateRandomColor}>Generate Random Color</button>
      </div>

      <div className="display-container">
        <p>{colorType == 'hex' ? 'Hex Color' : 'RGB Color'}</p>
        <h2>{colorType == 'hex' ? hexCode : RgbColor(color.r,color.g,color.b)}</h2>
      </div>    
    </>
  )
}

export default RandomColor