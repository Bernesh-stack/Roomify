import { useLocation } from 'react-router';

const Visualizer = () => {
  const location = useLocation();
  const {initialImage, name} = location.state || {};

  return (
    <section className="visualizer">
      <h1>{name || "Untitled Project"}</h1>
      {/* <img src={initialImage} alt={name} /> */}
      <div className='visualizer'>
        {
          initialImage && (
            <div className="image-container">
              {/* <img src={initialImage} alt={name} /> */}
              <h2>Source Image</h2>
              <img src={initialImage} alt={name} />
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Visualizer
