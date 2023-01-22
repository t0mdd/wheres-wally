import { useState } from "react";
import styled from "styled-components";

const HighscoreFormContainer = styled.div`
  background-color: white;
  border: 3px solid black;
  border-radius: 15px;
  padding: 15px;
  position: fixed;
  z-index: 1;
  left: 25%;
  top: 25%;
  width: 50%;
  display: ${ ( { visible } ) => visible ? '' : 'none'};
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
    <HighscoreFormContainer visible={visible}>
      <p>
        You found all the characters in {time} seconds!!! Great job!!!
      </p>
      <input
      value={inputText}
      onChange={(e)=>setInputText(e.target.value)}
      >
      </input>
      <button onClick={handleSubmit}
      >
        Submit highscore
      </button>
      <button onClick={cleanUp}>
        Close
      </button>
    </HighscoreFormContainer>
  );
};

export default HighscoreForm;
