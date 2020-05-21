import React from 'react';
import { isMobile } from 'react-device-detect';
import EmptySparks from '../assets/empty.png';

const NoSparks = () => {
  return (
    <div className='m-t-20 flex-column justify-content-center'>
      <p className='text-center'>No Sparks</p>
      {!isMobile ? (
        <img src={EmptySparks} alt='avatar' width='800px' height='500px' />
      ) : (
        <img src={EmptySparks} width='410px' alt='avatar' height='340px' />
      )}
    </div>
  );
};

export default NoSparks;
