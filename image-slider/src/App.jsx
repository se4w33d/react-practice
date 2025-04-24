import { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import './App.css'

const URL = 'https://picsum.photos/v2/list'

function ImageSlider( {url, limit} ) {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchImages(url) {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}?page=1&limit=${limit}`);
      const json = await response.json();
      setImages(json);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (url) fetchImages(url);
  }, [url]);

  function handlePrev() {
    setCurrentImage(currentImage-1);
  }

  function handleNext() {
    setCurrentImage(currentImage+1);
  }

  function handleButton(index) {
    setCurrentImage(index);
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }
  
  return (
    <>
      <BsArrowLeftCircleFill
        onClick={handlePrev}
        className={currentImage==0 ? 'arrow arrow-left hide-arrow' : 'arrow arrow-left'} size={30} />
      {
        images.map((image,index) => 
          <img 
            key={image.id}
            alt={image.download_url}
            src={image.download_url}
            className={index === currentImage ? 'current-image' : 'current-image hide-image'} />)
      }
      <BsArrowRightCircleFill
        onClick={handleNext}
        className={currentImage==images.length-1 ? 'arrow arrow-right hide-arrow' : 'arrow arrow-right'} size={30} />
      <div className='button-container'>
        {
          images.map((image,index) => (
            <button 
              key={image.id}
              onClick={()=>handleButton(index)}
              className={index == currentImage ? 'btn-active' : 'btn-inactive'}></button>
          ))
        }
      </div>
        
    </>
  )
}


function App() {

  return (
    <>
      <div className='container'>
        <ImageSlider url={URL} limit={5} />
      </div>
      
    </>
  )
}

export default App
