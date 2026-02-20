import { Box } from 'lucide-react'
import React from 'react'
import Button from './ui/Button'


const handleAuth=async()=>{}
const isSignedIn=true
const username = 'John Doe'
const Navbar = () => {
  return (
    <header className='navbar'>
       <nav className='inner'>
            <div className='left'>
                <div className='brand'>
                    <Box className='logo'/>
                    <span className='name'>Rommify</span>
                </div>
                <ul className='links'>
                    <a href='#'>Product</a>
                    <a href='#'>Pricing</a>
                    <a href='#'>Community</a>
                    <a href='#'>Enterprise</a>

                </ul>
            </div>

            <div className='actions'>
                {isSignedIn ? (
                    <>
                        <span className='greeting'>
                            {username?`hi, ${username}`:'Signed in'}
                        </span>
                        <Button size='sm' onClick={handleAuth} className='btn'>
                            Log out
                        </Button>
                    
                    </>


                ):(
                    <>
                <Button size="sm" variant="ghost" onClick={handleAuth}>
                    Login
                </Button>
                <a href='#upload' className='cta'>Get Started</a>
                    </>
                    
                )}

            </div>
        </nav>
        
        </header>
  )
}

export default Navbar