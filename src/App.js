import { useRef, useState } from 'react';
import './App.css';

function App() {
  const currentAudio = useRef()
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('02 : 13');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Jamal Kudu',
    songArtist: 'Harshavardhan Rameshwar',
    songSrc: './assets/songs/1.m4a',
    songAvatar: './assets/images/1.jpg',
    songBg:'./assets/bgimages/b1.jpg'
    
  })

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }
  

  const handleNextSong = ()=>{
    const nextIndex = musicIndex === musicArray.length - 1 ? 0 : musicIndex + 1;
    setMusicIndex(nextIndex);
    updateCurrentMusicDetails(nextIndex);
  }

  const handlePrevSong = ()=>{
    const prevIndex = musicIndex === 0 ? musicArray.length - 1 : musicIndex - 1;
    setMusicIndex(prevIndex);
    updateCurrentMusicDetails(prevIndex);
  }

  const updateCurrentMusicDetails = (number)=>{
    let musicObject = musicArray[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
      songBg: musicObject.songBg
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = ()=>{
    //total length 
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength);

    // Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }

  const musicArray = [
    {
      songName: 'Jamal Kudu',
      songArtist: 'Harshavardhan Rameshwar',
      songSrc: './assets/songs/1.m4a',
      songAvatar: './assets/images/1.jpg',
      songBg:'./assets/bgimages/b1.jpg'
      
    },
    {
      songName: 'Tu hai kahan',
      songArtist: 'AUR',
      songSrc: './assets/songs/2.m4a',
      songAvatar: './assets/images/2.jpg',
      songBg:'./assets/bgimages/b2.jpg'
    },
    {
      songName: 'Heeriye',
      songArtist: 'Arijit Singh',
      songSrc: './assets/songs/3.m4a',
      songAvatar: './assets/images/3.jpg',
      songBg:'./assets/bgimages/b3.jpg'
    },
    {
      songName: 'Apa Fer Milaange',
      songArtist: 'Savi Kahlonr',
      songSrc: './assets/songs/4.m4a',
      songAvatar: './assets/images/4.jpg',
      songBg:'./assets/bgimages/b4.jpg'
    },
    {
      songName: 'Chaand Baaliyan',
      songArtist: 'Aditya A',
      songSrc: './assets/songs/5.m4a',
      songAvatar: './assets/images/5.jpg',
      songBg:'./assets/bgimages/b5.jpg'
    },
    {
      songName: 'Girls Like You',
      songArtist: 'Maroon 5',
      songSrc: './assets/songs/6.m4a',
      songAvatar: './assets/images/6.jpg',
      songBg:'./assets/bgimages/b6.jpg'
    }
  
  ]

  
 


  return (
    <>
    <div className="container">
      <audio src='./assets/songs/1.m4a' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <img src={currentMusicDetails.songBg}  className='background' alt="bg" />


      
      <div className="music-Container">
        <p className='musicPlayer'>Music Player</p>
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} alt="song Avatar" id='songAvatar' className={isAudioPlaying ? 'animateAvatar' : ''} />
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play '}  playBtn `} onClick={handleAudioPlay} ></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
        </div>
      </div>
    
     
     
   
      
    </div>
    </>
  );
}

export default App;