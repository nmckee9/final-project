import React from 'react'
import neutral from '../images/neutral.png';

const Neutral = () => {
  return (
    <img
      src={neutral}
      style={{ width: '50px'}}
      alt='Neutral'
      className='mood'
    />
  )
}

export default Neutral