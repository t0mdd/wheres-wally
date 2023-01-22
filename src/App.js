/* eslint-disable jsx-a11y/img-redundant-alt */
import './App.css';
import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import wheresWally from './wheresWally.jpg';
import wally from './wally.webp';
import wilma from './wilma.webp';

const { log } = console;

const ProgressImage = ( { src, found } ) => {
  return (
    <img 
    alt='Progress image'
    src={src} 
    className={found ? '' : 'monochrome'}
    >
    </img>
  );
}

const ProgressBar = ( { srcs, characterFound } ) => {
  return (
    <div className='progress-bar'>
      <ProgressImage src={srcs.wally} found={characterFound.wally}></ProgressImage>
      <ProgressImage src={srcs.wilma} found={characterFound.wilma}></ProgressImage>
    </div>
  )
};

const characterBoxes = {
  wally: {
    xMin: 0.62,
    yMin: 0.69,
    xMax: 0.635,
    yMax: 0.725,
  },
  wilma: {
    xMin: 0.785,
    yMin: 0.256,
    xMax: 0.801,
    yMax: 0.29,
  }
}

const getBoundingRect = (ref) => ref.current.getBoundingClientRect();

const getRelativeClickCoordinates = ( { viewportRelativeCoordinates, ref } ) => {
  const { x: clickX, y: clickY } = viewportRelativeCoordinates;
  const { x: rectStartX, y: rectStartY, width, height } = getBoundingRect(ref);
  return({
    x: (clickX - rectStartX) / width,
    y: (clickY - rectStartY) / height,
  });
}

const coordinatesInBox = ( { x, y, xMin, yMin, xMax, yMax } ) => {
  return xMin <= x && x <= xMax && yMin <= y && y <= yMax;
};

const DropDownContainer = styled.div`
  ${( { visible } ) => (
    visible ? 
    css`
      transform: scaleY(1);
      transform-origin: top;
      transition: transform 0.3s;
    ` :
    css`
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.3s;
    `
  )}
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  ${( { coordinates } ) => coordinates && css`
    top: ${coordinates.y}px;
    left: ${coordinates.x}px;  
  `}
`;

const DropDown = ( { coordinates, visible, handleClose, handleChoice } ) => {
  return (
    <DropDownContainer coordinates={coordinates} visible={visible}>
      <button onClick={handleClose}>X</button>
      <button onClick={() => handleChoice('wally')}>Wally</button>
      <button onClick={() => handleChoice('wilma')}>Wilma</button>
    </DropDownContainer>
  )
};

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

function App() {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [characterFound, setCharacterFound] = useState({
    wally: false,
    wilma: false,
  });
  const [lastClickCoordinates, setLastClickCoordinates] = useState(null);
  const [lastRelativeClickCoordinates, setLastRelativeClickCoordinates] = useState(null);
  const handleMainPictureClick = ( { clickEvent, ref } ) => {
    const viewportRelativeCoordinates = { x: clickEvent.clientX, y: clickEvent.clientY };
    const absoluteCoordinates = { x: clickEvent.pageX, y: clickEvent.pageY };
    setLastRelativeClickCoordinates(
      getRelativeClickCoordinates( { viewportRelativeCoordinates, ref } )
    );
    setLastClickCoordinates(absoluteCoordinates);
  };
  
  useEffect(
    () => {
      if (lastClickCoordinates) {
        setDropDownVisible(true)
      }
    },
    [lastClickCoordinates]
  );
  
  const handleChoice = (choice) => {
    if (coordinatesInBox({ 
      ...lastRelativeClickCoordinates, ...characterBoxes[choice]
    })) {
      setCharacterFound({
        ...characterFound,
        [choice]: true,
      })
    }
    setDropDownVisible(false);
  }

  return (
    <div class='app'>
      <ProgressBar
      srcs = {({wally, wilma})}
      characterFound={characterFound}
      >
      </ProgressBar>
      <MainPicture 
      src={wheresWally}
      onClick={handleMainPictureClick}>
      </MainPicture>
      <DropDown
      coordinates={lastClickCoordinates}
      visible={dropDownVisible}
      handleClose={() => setDropDownVisible(false)}
      handleChoice={handleChoice}
      >
      </DropDown>
    </div>
  );
}

export default App;
