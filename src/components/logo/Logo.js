import React from 'react';
import Tilt from 'react-tilt';
//import babyface from './babyface.jpg';
import manface from './manface.PNG';
import './Logo.css';

const Logo = () => {
  return(
      <div className='ma4 mt0'>
          <Tilt className="Tilt br2 shadow-2"  options={{ max: 80, speed: 3 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner">
              <img style={{padding:'5px'}} src={manface} alt='logo '/>
              </div>
          </Tilt>
      </div>
    );
}

export default Logo; 