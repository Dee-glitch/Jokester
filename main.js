const buttons = document.querySelectorAll('.btn');
const prog = document.getElementById('progBtn');
const misc = document.getElementById("miscBtn");
const spooky = document.getElementById("spookyBtn");

// Disable/enable button
function toggleBtn() {
  buttons.forEach((button) => {
    button.disabled = !button.disabled;
  })
  
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
async function getJokes(jokeCategory) {
  let joke = '';
  
  try {
    const apiUrl =
      `https://v2.jokeapi.dev/joke/${jokeCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
    const response = await fetch(apiUrl);
    
    if(response.ok) {
      const data = await response.json();
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
          joke = data.joke;
      }
      
      tellMe(joke);
      toggleBtn();
    }

  } catch (error) {
      document.body.textContent = error.message;
  }
}

prog.addEventListener('click', () => {
  getJokes('Programming')
});
misc.addEventListener("click", () => {
  getJokes('Miscellaneous')
});
spooky.addEventListener("click", () => {
  getJokes('Spooky')
});

