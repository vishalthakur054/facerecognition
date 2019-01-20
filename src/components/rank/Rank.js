import React from 'react';


const Rank = ({name,entries}) => {
  return(
      <div className='center'>
        <div className='white f3'>
            {name} {',your Rank is...'}
        </div>
        <div className='white f3'>
             {entries}
        </div>
      </div>
    );
}

export default Rank; 