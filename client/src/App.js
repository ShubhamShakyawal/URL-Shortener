import { useState } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import BASE_URL from './helper'

function App() {
  const [ inputUrl, setInputUrl ] = useState("");
  const [ newUrl, setNewUrl ] = useState("");
  const [ qrCode, setQrCode ] = useState("");

  const shortenUrl = async () => {
    const url = BASE_URL
    const response = await axios.post(url, {
      url: inputUrl
    })
    const data = response.data;
    setNewUrl(data.shortenedUrl);

    const url2 = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=".concat(data.shortenedUrl);
    setQrCode(url2);
  }

  const btnClicked = () => {
    navigator.clipboard.writeText(newUrl); 
  }

  const downloadImage = () => {
    saveAs(qrCode, "QR Code")
  }

  return (
    <>
      <div className='bg-purple-100 min-h-screen min-w-screen font-kalam py-4'>
        <h1 className='text-5xl md:text-6xl text-center mb-6'>URL Shortener</h1>
        <div className="flex justify-center">
          <div className="w-5/6 md:w-2/3 mt-7 flex flex-col border p-2 bg-violet-200 rounded-xl">
            <h2 className='text-3xl md:text-4xl text-center my-2 '>Paste the URL to be shortened</h2>
            <div className='flex flex-row justify-center my-4'>
                <input type="text" value={inputUrl} onChange={e => setInputUrl(e.target.value)} placeholder="Enter the link here"
                  className="px-4 text-xl md:text-2xl py-1 focus:outline-none rounded-l-lg w-3/4"
                />
                <button onClick={shortenUrl} className="text-xl md:text-2xl py-1 px-2 bg-pink-400 rounded-r-lg">Shorten URL</button>
            </div>
          </div>
        </div>
        {
          newUrl === "" ? 
              null 
            :
            <div className="flex justify-center">
              <div className="w-5/6 md:w-2/3 mt-7 flex flex-col border p-2 bg-violet-200 rounded-xl">
                <div className='flex flex-row justify-center items-center my-4'>
                  <a href={newUrl} className='flex flex-row items-center hover:underline' rel="noreferrer" target="_blank">
                    <img src="link.png" alt="" className='h-4 mr-2' />
                    <span className='text-lg md:text-xl'>{newUrl}</span>
                  </a>
                  <button className='mx-2' onClick={btnClicked}><img src='copy.png' alt="" className='h-4'/></button>
                </div>
                <div className='flex flex-col justify-center items-center my-4'>
                  <img src={qrCode} alt="" className='h-48'/>
                  <button className='rounded bg-pink-400 mt-6 px-4 py-1 text-lg md:text-xl' onClick={downloadImage}>Download</button>
                </div>
              </div>
            </div>
        } 
      </div>
    </>
  );
}

export default App;