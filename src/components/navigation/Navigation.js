import React from 'react'


const Navigation = ({onRouteChange, isSignedIn}) => {

    if(isSignedIn)
    {
        return(
            <nav className='tr'>
                <p 
                onClick={() => onRouteChange('signout')}
                className='f3 link dim underline pa3 pointer '>Sign Out</p>
            </nav>
        );
    }
    else{
        return(
            <nav className='tr'>
                <p 
                onClick={() => onRouteChange('signin')}
                className='f3 link dim underline pa3 pointer '>Sign in
                </p>
                <p 
                onClick={() => onRouteChange('register')}
                className='f3 link dim underline pa3 pointer '>Register
                </p>
            </nav>
        );
    }
}

export default Navigation; 