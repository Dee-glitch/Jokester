const buttons = document.querySelectorAll('.btn');
const container = document.querySelector('.container');
const loader = document.getElementById("loader");
const prog = document.getElementById('progBtn');
const misc = document.getElementById("miscBtn");
const spooky = document.getElementById("spookyBtn");

// Disable/enable button
function toggleBtn() {
  buttons.forEach((button) => {
    button.disabled = !button.disabled;
  })
}

// Passing joke to text-to-speech API
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
    loader.style.display = "block";
    const apiUrl =
      `https://v2.jokeapi.dev/joke/${jokeCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
    const response = await fetch(apiUrl);
    
    if(response.status >= 200 && response.status < 400) {
      loader.style.display = 'none';
      const data = await response.json();
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
          joke = data.joke;
      }
      tellMe(joke);
      toggleBtn();

    } else {
      throw "HTTP Error";
    }

  } catch (error) {
    container.classList.add('error');
    container.textContent = error.message;
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

