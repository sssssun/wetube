const recordContainer=document.getElementById("jsRecordContainer");
const recordBtn=document.getElementById("jsRecordBtn");
const recordPreview=document.getElementById("jsVideoPreview"); 

let streamObject;
let videoRecorder;


function handleData(event){
    const dataFile=event.data;
    const link=document.createElement("a");
    link.href=URL.createObjectURL(dataFile);
    link.download="recorded.webm";
    document.appendChild(link);
    link.click();
}


function startRecording(){
    videoRecorder=new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable",handleData);
}

function stopRecording(){
    videoRecorder.stop();
    recordBtn.removeEventListener("click",stopRecording);
    recordBtn.addEventListener("click",getVideo);
    recordBtn.innerHTML="Start recording";
}

async function getVideo(){
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            //확인객체
            audio: false,
            video: true
        });
        console.log(stream);
        console.log("hi");
        recordPreview.srcObject=stream;
        recordPreview.play();
        recordBtn.innerHTML="Stop recording";
        streamObject=stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML="Cannot record :(";
    }finally{
        recordBtn.removeEventListener("click",getVideo);
    }
}

function init(){
    recordBtn.addEventListener("click",getVideo);
}

if(recordContainer){
    init();
}
