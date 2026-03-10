import React from 'react'
const location = useLocation()
const {initialImage,name} = location.state || {};



const visualizer = () => {
  return (
    <section className="visualizer">
      <h1>{name ||"Untitled Project"}</h1>
      {/* <img src={initialImage} alt={name} /> */}
      <div className='visualizer'>
    {
      initialImage && (
        <div className="image-container">
          {/* <img src={initialImage} alt={name} />
          */}
          <h2>Source Image</h2>
           <img src={initialImage} alt={name} />
          </div>
      )
    }

      </div>
    </section>
  )
}

export default visualizer