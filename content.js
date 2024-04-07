// function copyToClipboard(e) {
//   if (navigator.clipboard)
//     return navigator.clipboard.writeText(e).catch(function (e) {
//       throw void 0 !== e
//         ? e
//         : new DOMException('The request is not allowed', 'NotAllowedError');
//     });
//   var o = document.createElement('span');
//   (o.textContent = e),
//     (o.style.whiteSpace = 'pre'),
//     document.body.appendChild(o);
//   var t = window.getSelection(),
//     r = window.document.createRange();
//   t.removeAllRanges(), r.selectNode(o), t.addRange(r);
//   var n = !1;
//   try {
//     n = window.document.execCommand('copy');
//   } catch (e) {
//     console.log('error', e);
//   }
//   return (
//     t.removeAllRanges(),
//     window.document.body.removeChild(o),
//     n
//       ? Promise.resolve()
//       : Promise.reject(
//           new DOMException('The request is not allowed', 'NotAllowedError')
//         )
//   );
// }
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => console.log('Text copied to clipboard'))
    .catch((error) => console.error('Error copying text:', error));
}

function getLensSelection() {
  const spans = [...document.querySelectorAll('span')].filter(
    (s) => s.id == 'translate' || !s.classList.length,
  );
  const translateSpanIndex = spans.findIndex((s) => s.id == 'translate');
  if (translateSpanIndex >= 0) {
    const valueSpan = spans[translateSpanIndex + 1];
    if (valueSpan) {
      return valueSpan.textContent?.trim().replace(/^"|"$/g, '');
    }
  }
}

function getButton(labels, timeoutMs = 5000) {
  if (typeof labels === 'string') {
    labels = [labels];
  }
  return new Promise(async (resolve, reject) => {
    let thebutton,
      resolved = false;
    setTimeout(() => {
      reject();
      resolved = true;
    }, timeoutMs);
    while (
      !resolved &&
      !(thebutton = [...document.querySelectorAll('button')].find((i) =>
        labels.includes(i.textContent),
      ))
    ) {
      await new Promise((r) => setTimeout(r, 250));
    }
    resolve(thebutton);
  });
}
function getMoreButton() {
  return document.querySelectorAll(
    '[href^="https://www.google.com/search"]',
  )[0];
}

async function getCopyAllButton() {
  let thebutton;
  while (
    !(thebutton = [...document.querySelectorAll('button')].find(
      (i) => i.textContent == 'Select all text',
    ))
  ) {
    await new Promise((r) => setTimeout(r, 250));
  }
  return thebutton;
}

// let _lastVisibileSelection;

// document.addEventListener('selectionchange', () => {
//   const selection = window.getSelection().toString();
//   if (selection) {
//     _lastVisibileSelection = selection;
//   }
// });
// document.dispatchEvent(new Event('selectionchange'));

function _getSelection() {
  // return document.querySelector('h2').innerText.replace(/\"/g, '').trim()
  return window.getSelection().toString().replace(/\s/g, '').trim();
}

async function selectAll() {
  // We be quicking so we don't clog the execution and can translate
  // a partial selection if there is one.
  const button = await getButton('Select all text', 100);
  if (button) {
    button.click();
    return true;
  }
  return false; // no selection was made
}

async function translateSelection() {
  const query = _getSelection();
  if (query) {
    this.window.open(
      `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(
        query,
      )}&op=translate`,
    );
  }
}

async function translateAll() {
  if (!(await selectAll())) {
    return;
  }
  await translateSelection();
}

/**
 * Main
 */
window.addEventListener('keypress', async function (event) {
  if (event.altKey || event.ctrlKey) {
    return;
  }
  // if (event.altKey && (event.key === 't' || event.key === 'T')) {
  //   event.stopPropagation()
  //   event.preventDefault()
  //   const button = [...document.querySelectorAll('button')].filter(b => b.innerText === 'Text')[0]
  //   if (button) {
  //     button.click()
  //   }
  //   return
  // }
  if (event.key == 'f') {
    try {
      const button = await getButton('Select all text');
      if (button) {
        button.click();
        (await getButton('Copy text'))?.click();
        chrome.runtime.sendMessage({ closeThis: true });
      }
    } catch (e) {
      return;
    }
  }

  if (event.code == 'KeyT') {
    if (event.shiftKey) {
      await selectAll();
    }
    await translateSelection();
    // const query = getSelection()
    // if (query) {
    //   this.window.open(`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(query)}&op=translate`)
    // }
  }
  if (event.key === 's' || event.key === 'S') {
    const button = await getButton(['Listen', '読み上げ']);
    if (button) {
      button.click();
    }
  }
  if (event.key === 'c' || event.key === 'C') {
    // const button = await getButton(['Copy text', 'テキストをコピー'])
    // if (button) {
    //   button.click()
    // }
    const lensValue = getLensSelection();
    if (lensValue) {
      copyToClipboard(lensValue);
    }
  }
  if (event.key === 'a' || event.key === 'A') {
    const query = _getSelection();
    if (query) {
      this.window.open(
        `http://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`,
        '_blank',
      );
    }
  }

  if (event.key === 'g' || event.key === 'G') {
    // Get the selected text
    const query = _getSelection();
    if (query) {
      this.window.open(
        `https://jisho.org/search/${encodeURIComponent(query)}`,
        '_blank',
      );
    }
  }
  if (event.key === 'h' || event.key === 'H') {
    // Get the selected text
    const query = _getSelection();
    if (query) {
      this.window.open(
        `https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(
          query,
        )}`,
        '_blank',
      );
    }
  }

  if (event.key === 'm' || event.key === 'M') {
    const moreButton = getMoreButton();
    if (moreButton) {
      moreButton.click();
    }
  }
});

window.addEventListener('translate-all', translateAll);
window.addEventListener('translate', (e) => {
  e.stopImmediatePropagation();
  if (_getSelection()) {
    translateSelection();
  } else {
    translateAll();
  }
});
window.addEventListener('copy-selected', async (e) => {
  e.stopImmediatePropagation();
  try {
    await selectAll();
  } catch (err) {}
  const selection = _getSelection();
  if (selection) {
    copyToClipboard(selection.replace(/\s/g, ''));
  }
});

let search;

setInterval(() => {
  const annoyingCopyButton = document.querySelectorAll(
    '[aria-label="Copy selected text"],[aria-label="選択したテキストをコピー"]',
  )[0];
  if (annoyingCopyButton) {
    // If the button is present it is either means the page loaded or the user pasted an image
    // In that case we select the text button
    annoyingCopyButton.parentElement.remove();
    if (window.location.search !== search) {
      const button = [...document.querySelectorAll('button')].filter(
        (b) => b.innerText === 'Text' || b.innerText === 'テキスト',
      )[0];
      button && button.click();
      search = window.location.search;
    }
  }
}, 1200);
