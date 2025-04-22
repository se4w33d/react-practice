import { useState } from 'react';
import { FaStar } from 'react-icons/fa6'
import './StarRating.css'

function StarRating({ numOfStar }) {
    
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const starList = [...Array(numOfStar)];

  function handleClick(index) {
    setRating(index);
  }

  function handleOnHover(index) {
    setHoverRating(index);
  }

  function handleOnLeave() {
    setHoverRating(rating);
  }
  
  return (
    <>
      <div className='star-rating'>
        {
          starList.map((_, index) => {
            index += 1;

            return (
              <FaStar 
                key={index} size={30} 
                className={index <= (hoverRating || rating) ? 'active' : 'inactive'}
                onClick={() => handleClick(index)}
                onMouseOver={() => handleOnHover(index)}
                onMouseLeave={() => handleOnLeave()} />
            )
          })
        }
      </div>
    </>
  )
}

export default StarRating