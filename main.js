var SpeechRecognition = window.webkitSpeechRecognition;
var recognize = new SpeechRecognition();
var counterhi = 1;
if(localStorage.getItem("counter") == null){
    localStorage.setItem("counter", counterhi)
} else {
    counterhi = localStorage.getItem("counter");
}

function startRecording(){
    document.getElementById("textbox").innerHTML = "";
    recognize.start()
}

recognize.onresult = function(event){
    console.log(event)
    var result = event.results[0][0].transcript;
    console.log(result);
    document.getElementById("textbox").innerHTML = result;
    if(result == "take my selfie"){
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "Your Selfie Will be Taken in 5 Seconds"
    var otter = new SpeechSynthesisUtterance(speak_data);
    synth.speak(otter);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="id" src="' + data_uri + '">';
    })
}

function save(){
    var link = document.getElementById("download");
    var img_var = document.getElementById("id").src;
    link.href = img_var;
    link.download = "selfie-" + counterhi + ".png"
    link.click();
    counterhi++
    localStorage.setItem("counter", counterhi)
}