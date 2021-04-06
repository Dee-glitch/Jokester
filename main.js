const button = document.querySelector('button');

// Disable/enable button
function toggleBtn() {
  button.disabled = !button.disabled;
}

// Passing joke to API
function tellMe(joke) {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = 'en-US';
  speech.text = joke;
  speechSynthesis.speak(speech);
  speech.addEventListener('end', toggleBtn)
}

// Get jokes from joke API
async function getJokes() {
  let joke = '';
  
  try {
    const apiUrl =
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
    } else {
        joke = data.joke;
    }
    
    tellMe(joke);
    toggleBtn();

  } catch (error) {
      document.body.textContent = error.message;
  }
}

button.addEventListener('click', getJokes);

