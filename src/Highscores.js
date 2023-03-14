import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const transformTimeInSeconds = 0.3;

const HighscoresContainer = styled.div`
  font-family: 'Courier New';
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  background-color: white;
  border: 3px solid black;
  border-radius: 15px;
  padding: 15px;
  position: fixed;
  z-index: 1;
  height: max(auto, 20%);
  width: max-content;
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

const HighScores = ( { getTopHighscores, visible, handleClose } ) => {
  const [highscores, setHighscores] = useState(null);
  useEffect(() => {
    if (!visible) return;
    (async () => {
      const topHighscores = await getTopHighscores();
      setHighscores(topHighscores);
    })();
  }, [visible])
  return (
    <HighscoresContainer visible={visible} className='highscores-container'>
      <CloseButtonContainer>
        <button
        onClick={handleClose}
        className='close-button'
        >
          X
        </button>
      </CloseButtonContainer>
      {
        highscores ? (
          <ol>
            {highscores.map((highscore, index) => (
              <li key={index}>
                {highscore.name}: {highscore.time} seconds
              </li>
            ))}
          </ol>
        ) :
        <p> No highscores added yet...</p>
      }
    </HighscoresContainer>
  );
}

export default HighScores;
