import { useState } from 'react'
import './App.css'
import QRCode from 'react-qr-code'


function App() {

  const [input, setInput] = useState('')
  const [qrcode, setQrcode] = useState('')

  function handleGenerate() {
    setQrcode(input)
    setInput('')
  }

  return (
    <>
      <div className='input-container'>
        <input
          name='text-input'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Enter your text here'
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>

      <div className='qrcode'>
        <QRCode 
          value={qrcode}
        />
      </div>
    </>
  )
}

export default App
