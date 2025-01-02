const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechButton = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices() {
    for(let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value= "${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`; //different languages
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function wordToVoice(word) {
    let utterance = new SpeechSynthesisUtterance(word);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechButton.addEventListener("click", function(e){
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            wordToVoice(textarea.value);
        }
        if(textarea.value.length > 80) {
            setInterval(function(){
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechButton.innerText = "Convert to Voice";
                }else {

                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechButton.innerText = "Pause Voice";
            }else {
                synth.pause();
                isSpeaking = false;
                speechButton.innerText = "Resume Voice"
            }
        }else{
            speechButton.innerText = "Convert to Voice";
        }
    }
});