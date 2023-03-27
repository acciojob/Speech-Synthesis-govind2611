// Your script here.
const synth = window.speechSynthesis;
      const voicesDropdown = document.querySelector('#voices');
      const startButton = document.querySelector('#start');
      const stopButton = document.querySelector('#stop');
      const rateInput = document.querySelector('#rate');
      const pitchInput = document.querySelector('#pitch');
      const textInput = document.querySelector('#text');

      let voices = [];

      function populateVoices() {
        voices = synth.getVoices().filter(voice => voice.lang.includes('en'));
        voicesDropdown.innerHTML = voices
          .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
          .join('');
      }

      populateVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoices;
      }

      function speak() {
        if (synth.speaking) {
          synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
        utterance.voice = selectedVoice;
        utterance.rate = parseFloat(rateInput.value);
        utterance.pitch = parseFloat(pitchInput.value);
        synth.speak(utterance);
      }

      startButton.addEventListener('click', speak);
      stopButton.addEventListener('click', () => synth.cancel());