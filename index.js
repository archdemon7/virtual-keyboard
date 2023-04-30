import { keys } from './keys.js';

const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');
body.append(container);

const title = document.createElement('div');
container.append(title);
title.classList.add('title');

const firstTitleSection = document.createElement('div');
firstTitleSection.classList.add('title-section');
title.append(firstTitleSection);

const firstTitleText = document.createElement('p');
firstTitleText.classList.add('title-text');
firstTitleText.textContent = 'RSS';
firstTitleSection.append(firstTitleText);

const secondTitleSection = document.createElement('div');
secondTitleSection.classList.add('title-section');
title.append(secondTitleSection);

const secontTitleText = document.createElement('p');
secontTitleText.classList.add('title-text');
secontTitleText.textContent = 'Virtual';
secondTitleSection.append(secontTitleText);

const thirdTitleSection = document.createElement('div');
thirdTitleSection.classList.add('title-section');
title.append(thirdTitleSection);

const thirdTitleText = document.createElement('p');
thirdTitleText.classList.add('title-text');
thirdTitleText.textContent = 'keyboard';
thirdTitleSection.append(thirdTitleText);

const textarea = document.createElement('textarea');
textarea.cols = 100;
textarea.rows = 10;
container.append(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
container.append(keyboard);

const doubleKeys = ['Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight'];
for (let keyboardKey in keys) {
  const button = document.createElement('div');
  button.classList.add('button');
  button.setAttribute('keyName', keys[keyboardKey].code);
  if (doubleKeys.includes(keyboardKey)) {
    button.classList.add('double-button');
  } else if (keyboardKey === 'Space') {
    button.classList.add('whitespace');
  }
  button.innerHTML = keys[keyboardKey].key;
  keyboard.append(button)
}





