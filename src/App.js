/* eslint-disable jsx-a11y/img-redundant-alt */
import './App.css';
import DropDown from './DropDown';
import MainPicture from './MainPicture';
import ProgressBar from './ProgressBar';
import HighscoreForm from './HighscoreForm';
import HighScores from './Highscores';
import { useState, useEffect } from 'react';
import wheresWally from './wheresWally.jpg';
import wheresWallyHint from './wheresWallyHint.jpg';
import wally from './wally.webp';
import wilma from './wilma.webp';
import ring from './ring.svg';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const pipe = (...functions) => {
  return functions.reduce((f, g) => (x) => f(g(x)));
};

const firebaseConfig = {
  apiKey: "AIzaSyCBdNy-ja2pwbOJUXdeS9IVkTn5WZgWZlk",
  authDomain: "wheres-wally-c8fb8.firebaseapp.com",
  projectId: "wheres-wally-c8fb8",
  storageBucket: "wheres-wally-c8fb8.appspot.com",
  messagingSenderId: "1021758615269",
  appId: "1:1021758615269:web:224decdacd2356e720ae0c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const highscoresRef = collection(db, 'highscores');
const topHighscoresQuery = query(highscoresRef, orderBy('time', 'asc'), limit(10));

const startTimestamp = +new Date();

const getTopHighscores = async () => {
  const querySnapshot = await getDocs(topHighscoresQuery);
  const topHighscores = [];
  querySnapshot.forEach((doc) => topHighscores.push(doc.data()));
  return topHighscores;
};

const submitHighscore = async ( { name, time } ) => {
  const docRef = await addDoc(highscoresRef, {
    name,
    time,
  });
};

const timeElapsedSinceStart = () => (
  (+new Date() - startTimestamp) / 1000
);

const getCharacterBox = async (character) => {
  const boxRef = doc(db, "character-boxes", character);
  const boxSnap = await getDoc(boxRef);
  console.log(boxSnap.data())
  return boxSnap.data();
};

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

const App = () => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [highscoreFormVisible, setHighscoreFormVisible] = useState(false);
  const [highscoresVisible, setHighscoresVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
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
  
  const toggleHintVisible = () => {
    setHintVisible(!hintVisible);
  };

  const handleChoice = async (choice) => {
    const characterBox = await getCharacterBox(choice);
    if (coordinatesInBox({ 
      ...lastRelativeClickCoordinates, ...characterBox
    })) {
      setCharacterFound({
        ...characterFound,
        [choice]: true,
      })
    }
    setDropDownVisible(false);
  };

  const handleSubmitHighscore = ( { name, time } ) => {
    submitHighscore( { name, time } );
    setHighscoresVisible(false);
  };

  const handleHighscoreFormClose = () => {
    setHighscoreFormVisible(false);
  };

  useEffect(
    () => {
      if (lastClickCoordinates) {
        setDropDownVisible(true)
      }
    },
    [lastClickCoordinates]
  );
  
  useEffect(
    () => {
      if (Object.values(characterFound).every((isFound) => isFound)) {
        setTimeTaken(timeElapsedSinceStart());
        setHighscoreFormVisible(true);
      }
    },
    [characterFound]
  )

  return (
    <div className='app'>
      <ProgressBar
      srcs = {({wally, wilma})}
      characterFound={characterFound}
      >
      </ProgressBar>
      <MainPicture 
      src={hintVisible ? wheresWallyHint : wheresWally}
      onClick={handleMainPictureClick}
      >
      </MainPicture>
      <DropDown
      coordinates={lastClickCoordinates}
      visible={dropDownVisible}
      handleClose={() => setDropDownVisible(false)}
      handleChoice={handleChoice}
      >
      </DropDown>
      <HighscoreForm
      visible={highscoreFormVisible}
      time={timeTaken}
      submitHighscore={handleSubmitHighscore}
      handleClose={handleHighscoreFormClose}
      >
      </HighscoreForm>
      <div class="footer-buttons">
        <button
        onClick={() => setHighscoresVisible(true)}
        className='show-highscores-button'
        >
          Show Highscores
        </button>
        <button onClick={toggleHintVisible}>
          {hintVisible ? 'Hide hint' : 'Show hint'}
        </button>
      </div>
      <HighScores 
      getTopHighscores={getTopHighscores}
      visible={highscoresVisible}
      handleClose={() => setHighscoresVisible(false)}
      ></HighScores>
    </div>
  );
}

export default App;
