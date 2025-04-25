import React, { useEffect, useState } from 'react'
import './App.css'

const URL = 'https://dummyjson.com/products?limit=20&'

function LoadMoreData( {url} ) {

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);


  async function fetchData(url) {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}skip=${count}`);
      const json = await response.json();
      console.log(json);
      if (count==0) {
        setProducts(json.products);
      } else {
        setProducts([...products, ...json.products])
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (url) fetchData(url);
  }, [count])

  function handleLoadMore() {
    setCount(prevCount => {
      const newCount = prevCount + 20;
      if (newCount === 80) {
        setIsDisabled(true);
      }
      return newCount;
    })
    
  }

  if (isLoading) {
    return <div>Loading data...</div>
  }

  return (
    <>
      <div className='products-container'>
        {
          products.map((product) => 
            <div className='product' key={product.id}>
              <img src={product.thumbnail} />
              <p>{product.title}</p>
            </div>
          )
        }
      </div>
      <div className='btn-container'>
        <button onClick={handleLoadMore} disabled={isDisabled}>Load more product</button>
      </div>
    </>
  )
}


function App() {

  return (
    <>
      <div>
        <LoadMoreData url={URL} />
      </div>
    </>
  )
}

export default App
