
    var video = document.querySelector('.recording');
var output = document.querySelector('.output');
var start = document.querySelector('#startButton');
var stop = document.querySelector('#stopButton');
var anc = document.querySelector(".download-anc")
var recordingStatus = document.querySelector("#recordingStatus")
var data = [];
  
start.addEventListener('click', (e) => {
    start.style.display = "none";
    stop.style.display = "block";
// In order record the screen with system audio
var recording = navigator.mediaDevices.getDisplayMedia({
    video: {
        mediaSource: 'screen',
    },
    audio: true,
})
    .then(async (e) => {
        video.style.display = "block";
        recordingStatus.innerHTML = "Recording Status: Recording"
        // For recording the mic audio
        let audio = await navigator.mediaDevices.getUserMedia({ 
            audio: true, video: false })
  
        // Assign the recorded mediastream to the src object 
        video.srcObject = e;
  
        // Combine both video/audio stream with MediaStream object
        let combine = new MediaStream(
            [...e.getTracks(), ...audio.getTracks()])
  
        /* Record the captured mediastream
           with MediaRecorder constructor */
        let recorder = new MediaRecorder(combine);
  
            recorder.start();
            alert("recording started")
  
            // For a fresh start
            data = []
  
        stop.addEventListener('click', (e) => {
            start.style.display = "block";
            stop.style.display = "none";
            video.style.display = "none";
            output.style.display = "block";
            anc.style.display = "block";
            recordingStatus.innerHTML = "Recording Status: Stopped"
            // Stops the recording  
            recorder.stop();
            alert("recording stopped")
        });
  
        /* Push the recorded data to data array 
          when data available */
        recorder.ondataavailable = (e) => {
            data.push(e.data);
        };
  
        recorder.onstop = () => {
  
            /* Convert the recorded audio to 
               blob type mp4 media */
            let blobData = new Blob(data, { type: 'video/mp4' });
  
            // Convert the blob data to a url
            let url = URL.createObjectURL(blobData)
  
            // Assign the url to the output video tag and anchor 
            output.src = url
            anc.href = url
        };
    });
});