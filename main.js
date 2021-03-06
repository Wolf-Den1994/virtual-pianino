const keys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const pianoKeys = document.querySelectorAll('.piano-key');

function playSoundKey(e) {
   if (e.repeat) return;
   const audio = document.querySelector(`audio[data-code="${e.code}"]`);
   const key = document.querySelector(`.piano-key[data-code="${e.code}"]`);
   if (!audio) return;
   audio.currentTime = 0;
   audio.play();
   key.classList.add('piano-key-active');
}

function playSoundMouse(e) {
   const mouse = document.querySelector(`audio[data-code="${e.toElement.dataset.code}"]`);
   const key = document.querySelector(`.piano-key[data-code="${e.toElement.dataset.code}"]`);
   if (!mouse) return;
   mouse.currentTime = 0;
   mouse.play();
   key.classList.add('piano-key-active');
   keys.forEach(key => {
      key.addEventListener('mouseover', playSoundMouse);
      key.addEventListener('mouseout', () => {
         key.classList.remove('piano-key-active');
      });
   });
}

function stopSoundMouse(e) {
   keys.forEach(key => {
      key.removeEventListener('mouseover', playSoundMouse);
      key.classList.remove('piano-key-active');
   });
}

function stopSoundKey(e) {
   keys.forEach(key => {
      key.classList.remove('piano-key-active');
   })
}

window.addEventListener('keydown', playSoundKey);
window.addEventListener('keyup', stopSoundKey);
keys.forEach(key => key.addEventListener('mousedown', playSoundMouse));
window.addEventListener('mouseup', stopSoundMouse);


function toggleScreen() {
   if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
   } else {
      if (document.fullscreenEnabled) {
         document.exitFullscreen();
      }
   }
}

fullscreen.addEventListener('click', toggleScreen);


function switchToNotes() {
   if (!btnNotes.classList.contains('btn-active') && btnLetters.classList.contains('btn-active')) {
      btnNotes.classList.add('btn-active');
      btnLetters.classList.remove('btn-active');
      pianoKeys.forEach(pianoKey => pianoKey.classList.remove('letter'));
   }
}

function switchToLettes() {
   if (btnNotes.classList.contains('btn-active') && !btnLetters.classList.contains('btn-active')) {
      btnNotes.classList.remove('btn-active');
      btnLetters.classList.add('btn-active');
      pianoKeys.forEach(pianoKey => pianoKey.classList.add('letter'));
   }
}

btnNotes.addEventListener('click', switchToNotes);
btnLetters.addEventListener('click', switchToLettes);