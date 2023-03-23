import { useState } from 'react'
import axios from 'axios';

function App() {
  const [ inputUrl, setInputUrl ] = useState("");
  const [ newUrl, setNewUrl ] = useState("");
  // const [ isActive, setIsActive ] = useState(false);

  const shortenUrl = async () => {
    const url = "http://localhost:5000/"
    const response = await axios.post(url, {
      url: inputUrl
    })
    const data = response.data;
    setNewUrl(data.shortenedUrl);
  }

  const btnClicked = () => {
    navigator.clipboard.writeText(newUrl); 
    // setIsActive(true);
    // setTimeout(()=> setIsActive(false), 3000);
  }

  return (
    <>
      <div className='bg-purple-100 min-h-screen min-w-screen font-kalam'>
        <h1 className='text-6xl text-center mb-6 pt-4'>URL Shortener</h1>
        <div className="flex justify-center">
          <div className="w-5/6 md:w-2/3 mt-7 flex flex-col border p-2 bg-violet-200 rounded-xl">
            <h2 className='text-4xl text-center my-2 '>Paste the URL to be shortened</h2>
            <div className='flex flex-row justify-center my-4'>
                <input type="text" value={inputUrl} onChange={e => setInputUrl(e.target.value)} placeholder="Enter the link here"
                  className="px-4 text-2xl py-1 focus:outline-none rounded-l-lg w-3/4"
                />
                <button onClick={shortenUrl} className="text-2xl py-1 px-2 bg-violet-500 rounded-r-lg">Shorten URL</button>
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
                    <span >{newUrl}</span>
                  </a>
                  <button className='mx-2' onClick={btnClicked}><img src='copy.png' alt="" className='h-4'/></button>
                    {/* <span className={isActive ? 'triangle prompt' : 'triangle hidden'}></span> */}
                    {/* <span className={isActive ? 'bg-white px-2 prompt' : 'bg-white px-2 prompt'}>copied!!</span> */}
                </div>
              </div>
            </div>
        } 
      </div>
    </>
  );
}

export default App;