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

let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'RU';
let shiftPressed = false;
let capsPressed = false;
let capsPressedCount = 1;
const pressedKeys = new Set();
const doubleKeys = ['Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight'];

function initKeyboard() {
  for (let keyboardKey in keys) {
    let { value } = takeLetter(keyboardKey);
    const button = document.createElement('div');
    button.classList.add('button');
    button.setAttribute('keyName', keys[keyboardKey].code);
    if (doubleKeys.includes(keyboardKey)) {
      button.classList.add('double-button');
    } else if (keyboardKey === 'Space') {
      button.classList.add('whitespace');
    }
    button.innerHTML = value;
    keyboard.append(button)
  }
}

initKeyboard();

const keysForPress = document.querySelectorAll('.button');

function saveLang() {
  localStorage.setItem('lang', lang);
}

function switchLang() {
  if (pressedKeys.has('Control') && pressedKeys.has('Alt')){
    if (lang == 'RU') {
      lang = 'EN';
      if (capsPressed == true && shiftPressed == false) {
        keyboardUp();
      } else if (capsPressed == false && shiftPressed == true) {
        keyboardUp();
      } else if (capsPressed == true && shiftPressed == true) {
        keysForPress.forEach(element => {
          let keyName = element.getAttribute('keyName');
          let { value, keyShift } = takeLetter(keyName);
          if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
            element.innerHTML = value;
          } else if (keyShift) {
            element.innerHTML = value;
          }
        })
      } else if (capsPressed == false && shiftPressed == false) {
        keyboardDown();
      }
    } else {
      lang = 'RU';
      if (capsPressed == true && shiftPressed == false) {
        keyboardUp();
      } else if (capsPressed == false && shiftPressed == true) {
        keyboardUp();
      } else if (capsPressed == true && shiftPressed == true) {
        keysForPress.forEach(element => {
          let keyName = element.getAttribute('keyName');
          let { value, keyShift } = takeLetter(keyName);
          if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
            element.innerHTML = value;
          } else if (keyShift) {
            element.innerHTML = value;
          }
        })
      } else if (capsPressed == false && shiftPressed == false) {
        keyboardDown();
      }
    }
  }
  saveLang()
}

keysForPress.forEach(el => {
  el.addEventListener('click', () => {
    let keyName = el.getAttribute('keyName');
    if (keyName == 'ShiftLeft' || keyName == 'ShiftRight') {
      return;
    }
    textarea.focus();
    addText(keyName)
  })
  el.addEventListener('mousedown', () => {
    let keyName = el.getAttribute('keyName');
    if (keyName == 'ShiftLeft' || keyName == 'ShiftRight') {
      shiftPressed = true;
      keyboardUp();
    } else if (keyName == 'CapsLock') {
      if (capsPressed == false) {
        capsPressed = true;
        capsPressedCount += 1;
        el.classList.add('active');
        keyboardUp();
      } else if (capsPressedCount == 3) {
        capsPressedCount += 1;
      }
    } else if (keyName == 'ControlLeft' || keyName == 'ControlRight') {
      pressedKeys.add('Control');
      switchLang();
    } else if (keyName == 'AltLeft' || keyName == 'AltRight') {
      pressedKeys.add('Alt');
      switchLang();
    }
  })
  el.addEventListener('mouseup', () => {
    let keyName = el.getAttribute('keyName');
    if (keyName == 'ShiftLeft' || keyName == 'ShiftRight') {
      keyboardDown();
      shiftPressed = false;
    } else if (keyName == 'CapsLock') {
      if (capsPressedCount == 2) {
        capsPressedCount += 1;
      } else if (capsPressedCount == 4) {
        capsPressed = false;
        capsPressedCount = 1;
        keysForPress.forEach(element => {
          let keyName = element.getAttribute('keyName');
          let { value, keyShift } = takeLetter(keyName);
          if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
            element.innerHTML = value.toUpperCase();
          } else if (keyShift) {
            element.innerHTML = value;
          }
        })
        el.classList.remove('active');
      } 
    } else if (keyName == 'ControlLeft' || keyName == 'ControlRight') {
      pressedKeys.delete('Control');
    } else if (keyName == 'AltLeft' || keyName == 'AltRight') {
      pressedKeys.delete('Alt');
    }
  })
})

document.addEventListener('keydown', e => {
  if (!(e.code in keys)) {
    return;
  }
  e.preventDefault();
  textarea.focus();
  if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
    shiftPressed = true;
    keyboardUp();
    keysForPress.forEach(element => {
      if (element.getAttribute('keyName') === e.code) {
        element.classList.add('active');
      }
    })
  } else if (e.code == 'ControlLeft' || e.code == 'ControlRight') {
    pressedKeys.add('Control');
    switchLang();
  } else if (e.code == 'AltLeft' || e.code == 'AltRight') {
    pressedKeys.add('Alt');
    switchLang();
  } else if (e.code == 'CapsLock') {
    if (capsPressed == false) {
      capsPressed = true;
      capsPressedCount += 1
      keyboardUp();
      keysForPress.forEach(element => {
        if (element.getAttribute('keyName') === e.code) {
          element.classList.add('active');
        }
      })
    } else if (capsPressedCount == 3) {
      capsPressedCount += 1;
    }
  } else {
    addText(e.code);
    keysForPress.forEach(element => {
      if (element.getAttribute('keyName') === e.code) {
        element.classList.add('active');
      }
    }) 
  }
})

document.addEventListener('keyup', e => {
  if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
    keyboardDown();
    keysForPress.forEach(element => {
      if (element.getAttribute('keyName') === e.code) {
        element.classList.remove('active');
      }
    })
    shiftPressed = false;
  } else if (e.code == 'ControlLeft' || e.code == 'ControlRight') {
    pressedKeys.delete('Control');
  } else if (e.code == 'AltLeft' || e.code == 'AltRight') {
    pressedKeys.delete('Alt');
  } else if (e.code == 'CapsLock') {
    if (capsPressedCount == 2) {
      capsPressedCount += 1;
    } else if (capsPressedCount == 4) {
      capsPressed = false;
      capsPressedCount = 1;
      keysForPress.forEach(element => {
        let keyName = element.getAttribute('keyName');
        let { value, keyShift } = takeLetter(keyName);
        if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
          element.innerHTML = value.toUpperCase();
        } else if (keyShift) {
          element.innerHTML = value;
        }
        if (element.getAttribute('keyName') === e.code) {
          element.classList.remove('active');
        }
      })
    }
  } else {
    keysForPress.forEach(element => {
      if (element.getAttribute('keyName') === e.code) {
        element.classList.remove('active');
      }
    })
  }
})

window.onkeydown = e => {
    if (e.code == 'AltLeft' || e.code == 'AltRight') {
      e.preventDefault();
    }
}

function addText(keyName) {
  let event;
  let { value, keyShift } = takeLetter(keyName);
  if (capsPressed == false && shiftPressed == true) {
    keyShift ? event = keyShift : event = value.toUpperCase();
  } else if (capsPressed == false && shiftPressed == false) {
    event = value
  } else if (capsPressed == true && shiftPressed == true) {
    keyShift ? event = keyShift : event = value;
  } else if (capsPressed == true && shiftPressed == false) {
    keyShift ? event = value : event = value.toUpperCase();
  }
  let n = 1;
  let k = 1
  let posStart = textarea.selectionStart;
  let posEnd = textarea.selectionEnd;
  let oldValue = textarea.value;
  if (keyName == 'CapsLock' || keyName == 'ShiftLeft' || keyName == 'ShiftRight' || keyName == 'ControlLeft'
    || keyName == 'MetaLeft' || keyName == 'AltLeft' || keyName == 'AltRight' || keyName == 'ControlRight') {
      return;
  } else if(keyName == 'Enter') {
    event = '\n';
  } else if(keyName == 'Tab') {
    n = 4;
    k = 4;
    event = '    ';
  } else if (keyName == 'Backspace') {
    if (posStart == 0) return;
    posStart = posStart - 1;
    event = '';
    n = 0;
    k = -1;
  } else if (keyName == 'Delete') {
    posEnd = posEnd + 1;
    event = '';
    n = 0;
    k = -1;
  }
  textarea.value = `${oldValue.slice(0, posStart)}${event}${oldValue.slice(posEnd, oldValue.length)}`;
  textarea.selectionStart = posStart + n;
  textarea.selectionEnd = posEnd + k;
}

function takeLetter(keyName) {
  let value;
  let keyShift;
  if (lang == 'EN') {
    value = keys[keyName].key;
    keyShift = keys[keyName].keyEnShift;
  } else if (lang == 'RU') {
    if (keys[keyName].keyRu) {
      value = keys[keyName].keyRu;
    } else {
      value = keys[keyName].key;
    }
    keyShift = keys[keyName].keyRuShift;
  }
  return {value, keyShift};
}

function keyboardUp() {
  if (capsPressed == true && shiftPressed == false) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value.toUpperCase();
      } else {
        element.innerHTML = value;
      }
    })
  } else if (capsPressed == false && shiftPressed == false) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value.toUpperCase();
      } else if (keyShift) {
        element.innerHTML = keyShift;
      }
    })
  } else if (capsPressed == true && shiftPressed == true) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value;
      } else if (keyShift) {
        element.innerHTML = keyShift;
      }
    })
  } else if (capsPressed == false && shiftPressed == true) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value.toUpperCase();
      } else if (keyShift) {
        element.innerHTML = keyShift;
      }
    })
  }
}


function keyboardDown() {
  if (capsPressed == true && shiftPressed == false) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value.toUpperCase();
      }  else if (keyShift) {
        element.innerHTML = keyShift;
      }
    })
  } else if (capsPressed == false && shiftPressed == false) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value;
      } else if (keyShift) {
        element.innerHTML = value;
        console.log(keyName)
      }
    })
  } else if (capsPressed == true && shiftPressed == true) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value.toUpperCase();
      } else if (keyShift) {
        element.innerHTML = value;
      }
    })
  } else if (capsPressed == false && shiftPressed == true) {
    keysForPress.forEach(element => {
      let keyName = element.getAttribute('keyName');
      let { value, keyShift } = takeLetter(keyName);
      if (value.length == 1 && /^([а-яё]+|[a-z]+)$/i.test(value)) {
        element.innerHTML = value;
      } else if (keyShift) {
        element.innerHTML = value;
      }
    })
  }
}





