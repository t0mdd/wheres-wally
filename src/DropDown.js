import styled, { css } from "styled-components";

const transformTimeInSeconds = 0.3;

const Wrapper = styled.div`
  overflow: hidden;
  z-index: 1;
  position: absolute;
  ${( { coordinates } ) => coordinates && css`
    top: ${coordinates.y}px;
    left: ${coordinates.x}px;  
  `}
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  ${( { visible } ) => (
    visible ? 
    css`
      opacity: 1;    
      transform: translateY(0);
      transition: transform ${transformTimeInSeconds}s, opacity ${transformTimeInSeconds}s;
    ` :
    css`
      opacity: 0.5;
      transform: translateY(-100%);
      transition: transform ${transformTimeInSeconds}s;
      transition: transform ${transformTimeInSeconds}s, opacity ${transformTimeInSeconds}s;
    `
  )}
`;

const DropDown = ( { coordinates, visible, handleClose, handleChoice } ) => {
  return (
    <Wrapper coordinates={coordinates} className='dropdown'>
      <ContentContainer visible={visible}>
        <button className='close-button' onClick={handleClose}>X</button>
        <button className='dropdown-button' onClick={() => handleChoice('wally')}>Wally</button>
        <button className='dropdown-button' onClick={() => handleChoice('wilma')}>Wilma</button>
      </ContentContainer>
    </Wrapper>
  )
};

export default DropDown;
