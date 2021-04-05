const button = document.querySelector('button');
const audioElement = document.getElementById('audio');

// Disable/enable button
function toggleBtn() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "f004756715f64f679431c5138b61e47c",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

  // Get jokes from joke API
  async function getJokes() {
    let joke = '';
    const apiUrl =
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
          joke = `${data.setup} ... ${data.delivery}`;
      } else {
          joke = data.joke;
      }
      
      //text-to-speech
      tellMe(joke);
      
      // Disable button
      toggleBtn();
    } catch (error) {
        document.querySelector('.container').textContent = error.message;
    }
  }
  
  button.addEventListener('click', getJokes);
  audioElement.addEventListener('ended', toggleBtn);

