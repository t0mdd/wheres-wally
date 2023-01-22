/* eslint-disable jsx-a11y/img-redundant-alt */

import { useRef } from 'react';

const MainPicture = ( { src, onClick } ) => {
  //onClick = ( { clickEvent, ref } ) => ...
  const ref = useRef(null);
  return (
    <img 
    alt='Main picture'
    src={src} 
    ref={ref} 
    onClick={(e) => {onClick( { clickEvent: e, ref } )}} 
    className='main-picture'
    >
    </img>
  );
};

export default MainPicture;
