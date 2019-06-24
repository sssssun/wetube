const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer=document.querySelector("#jsVideoPlayer video");
const playButton=document.getElementById("jsPlayButton");
const volumeButton=document.getElementById("jsVolumeButton");
const fullscreenButton=document.getElementById("jsFullScreenButton");
const currentTime=document.getElementById("CurrentTime");
const totalTime=document.getElementById("TotalTime");
const volumeRange=document.getElementById("jsVolume");
const playRange=document.getElementById("jsTime");

function handlePlayClick(){
    if(videoPlayer.paused){
        //element 에서 제공하는 함수 : play, pause, muted,,,
        videoPlayer.play();
        playButton.innerHTML='<i class="fas fa-pause"></i>'
        
    }else{
        videoPlayer.pause();
        playButton.innerHTML='<i class="fas fa-play"></i>'
        
    }

}

function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted=false;
        volumeButton.innerHTML='<i class="fas fa-volume-up"></i>'
        volumeRange.value=videoPlayer.volume;
    }else{
        videoPlayer.muted=true;
        volumeButton.innerHTML='<i class="fas fa-volume-mute"></i>'
        volumeRange.value=0;
    }
}

function ExitFullScreen(){
    //videoContainer.exitFullscreen();
    fullscreenButton.innerHTML='<i class="fas fa-expand"></i>'
    fullscreenButton.addEventListener("click",FullScreen);
    document.exitFullscreen();
}

function FullScreen(){
    
    videoContainer.requestFullscreen();
    fullscreenButton.innerHTML='<i class="fas fa-compress"></i>'
    fullscreenButton.removeEventListener("click",FullScreen);
    fullscreenButton.addEventListener("click",ExitFullScreen);
    
}

//mycode
function getTotalTime(){
    const duration=videoPlayer.duration.toFixed(2);
    if(duration){
        totalTime.innerText=duration;
    }
    
}
//

const dateFormat = (seconds) => {
    const secondsNumber=parseInt(seconds, 10);
    let curhours=Math.floor(secondsNumber/3600);
    let curmins = Math.floor((secondsNumber-curhours*3600) / 60);
    let cursecs = secondsNumber-curhours*3600-curmins*60;
    
    if(curhours < 10) {
        curhours=`0${curhours}`;
    }
    if(curmins < 10){ 
        curmins = `0${curmins}`;
    }
    if(cursecs < 10){ 
        cursecs = `0${cursecs}`; 
    }
    
    return `${curhours}:${curmins}:${cursecs}`;
}

function getCurrentTime(){
    currentTime.innerText=dateFormat(Math.floor(videoPlayer.currentTime));
}

function setTotalTime(){
    const total=dateFormat(videoPlayer.duration);
    totalTime.innerText=total;
    setInterval(getCurrentTime,1000);
}

function handleEnded(){
    videoPlayer.currentTime=0;
    playButton.innerHTML='<i class="fas fa-play"></i>'
}

function handleVolume(event){
    console.log(event.target.value);
    videoPlayer.volume=event.target.value;
}

function handlePlay(event){

    const seconds=videoPlayer.duration*(event.target.value/100);
    console.log(parseFloat(seconds));
    const current=parseFloat(seconds);
    videoPlayer.currentTime=current;
    getCurrentTime();
    
    
}

function init(){
    videoPlayer.volume=0.5;
    playButton.addEventListener("click", handlePlayClick);
    volumeButton.addEventListener("click",handleVolumeClick);
    fullscreenButton.addEventListener("click",FullScreen);
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
    videoPlayer.addEventListener("ended",handleEnded);
    volumeRange.addEventListener("input",handleVolume);
    playRange.addEventListener("input",handlePlay);
}


if(videoContainer){
    init();
    
}
