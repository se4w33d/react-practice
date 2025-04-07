import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'


function Accordion( {items} ) {
  
  const [openIndex, setIndex] = useState(null);

  function handleContent(index) {
    console.log("click me!");
    setIndex(openIndex === index ? null : index);
  }

  return (
    <>
      {
        items.map((item, index) => (
          <div className={`accordion-card ${openIndex === index ? 'open' : ''}`} key={index}>
            <h3 className='accordion-header' onClick={()=>handleContent(index)}>
              {item.title}
              <span className='icon'> + </span>
            </h3>

            <p className='accordion-content'
              style={{ display: openIndex===index ? 'block' : 'none'}}
            >
              {item.content}
            </p>
          </div>
        ))
      }
    </>
  )
}



function App() {

  const data = [
    {
      title: "What is Github and how does it work?",
      content:
        "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
    },
    {
      title: "How do I see GitHub's availability?",
      content: "Check our real-time status report",
    },
    {
      title: "Why is GitHub so popular?",
      content:
        "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
    },
  ]

  return (
    <>
      <Accordion items={data}/>
    </>
  )
}

export default App
