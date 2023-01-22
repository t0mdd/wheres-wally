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
      <ProgressImage 
      src={srcs.wally} 
      found={characterFound.wally}
      >
      </ProgressImage>
      <ProgressImage 
      src={srcs.wilma} 
      found={characterFound.wilma}
      >
      </ProgressImage>
    </div>
  )
};

export default ProgressBar;
