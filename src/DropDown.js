import styled, { css } from "styled-components";

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

export default DropDown;
