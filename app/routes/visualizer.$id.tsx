import Button from 'components/ui/Button';
import { generate3DView } from 'lib/ai.action';
import { Box, Download, Share } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Visualizer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {initialImage, name,initialRender} = location.state || {};
  const hasInitialGenerated = useRef(false);

  const [isProcessing,setisProcessing] = useState(false);
 const [currentImage,setCurrentImage] =  useState<string |null>(initialRender || null);

const handleBack = () => navigate('/');

const runGeneration = async() =>{
  if(!initialImage ) return;

  try{
      setisProcessing(true);
      const result = await generate3DView({sourceImage: initialImage});

      if(result.renderedImage){
        setCurrentImage(result.renderedImage);
        // update in db\

      }
  }
  catch(e){
      console.warn("Failed to generate 3D view:", e);
  }
  finally{
      setisProcessing(false);
  }
}

useEffect(() =>{
  if(!initialImage || !hasInitialGenerated.current) return;
  if(initialRender){
    setCurrentImage(initialRender);
    hasInitialGenerated.current = true;
    return;
  }
hasInitialGenerated.current = true;
runGeneration()
},[initialImage,initialRender])


  return (


    
      <div className='visualizer'>
        <nav className='topbar'>
            <div className='brand'>
              <Box className="logo"/>
              <span className='name'>
                       Roomify
              </span>
            </div>
            <Button variant='ghost' size='sm' onClick={handleBack} className='exit'>
              <X className="icon" /> Exit Editor
            </Button>
        </nav>


        <section className='content'>
          <div className='panel'>
          <div className='panel-header'>
            <div className='panel-meta'> 
              <p>Project</p>
              <h2>{'untitled Project'}</h2>
              <p className='note'>Created by you</p>
            </div>
            <div className='panel-actions'>
              <Button
              size='sm'
              onClick={()=> {}}
              className='export'
              disabled={!currentImage}
              >

                <Download className='w-4 h-4 mr-2'/>
                Export
              </Button>

              <Button
              size='sm'
              onClick={() =>{}}
              className='share'
              
              >
                <Share className='w-4 h-4 mr-2'/>
                Share
              </Button>

            </div>
          </div>

          <div className={`render-area ${isProcessing ? 'is-processing' : ''}`}>
           {currentImage ?(
            <img src={currentImage} alt ="Ai rendered" className=''/>
           )}
          </div>
          </div>

        </section>
        
      </div>

  )
}

export default Visualizer
