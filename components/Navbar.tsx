import { Box } from 'lucide-react'
import React from 'react'
import Button from './ui/Button'
import { useOutletContext } from 'react-router'
const Navbar = () => {
  const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>();

  const handleAuth = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }
      return;
    }

    try {
      await signIn();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <header className='navbar'>
      <nav className='inner'>
        <div className='left'>
          <div className='brand'>
            <Box className='logo' />
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
                {userName ? `hi, ${userName}` : 'Signed in'}
              </span>
              <Button size='sm' onClick={signOut} className='btn'>
                Log out
              </Button>
            </>
          ) : (
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
  );
};

export default Navbar