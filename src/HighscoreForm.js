import { useState } from "react";
import styled, { css } from "styled-components";

const transformTimeInSeconds = 0.3;

const HighscoreFormContainer = styled.div`
  display: flex;
  font-family: 'Courier New';
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 3px solid black;
  border-radius: 15px;
  padding: 15px;
  position: fixed;
  transform: translateY(100%);
  z-index: 1;
  height: 20%;
  ${( { visible } ) => (
    visible ? 
    css`
      opacity: 1;    
      transform: translateY(100%);
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

const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const HighscoreForm = ( { visible, handleClose, time, submitHighscore } ) => {
  const [inputText, setInputText] = useState('');
  
  const cleanUp = () => {
    setInputText('');
    handleClose();
  };

  const handleSubmit = () => {
    submitHighscore( { name: inputText, time, } );
    cleanUp();
  };

  return (
    <HighscoreFormContainer visible={visible} className='highscore-form'>
      <CloseButtonContainer>
        <button 
        onClick={cleanUp} className='close-button'
        >
          X
        </button>
      </CloseButtonContainer>
      <p>
        You found all the characters in {time} seconds! 
      </p>
      <p>
        Enter your name below for a chance at the highscores.
      </p>
      <input
      value={inputText}
      onChange={(e)=>setInputText(e.target.value)}
      >
      </input>
      <button 
      onClick={handleSubmit}
      className='submit-highscores-button'
      >
        Submit highscore
      </button>
    </HighscoreFormContainer>
  );
};

export default HighscoreForm;
