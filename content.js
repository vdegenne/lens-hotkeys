// function getButton (content) {
//   return [...document.querySelectorAll('button')].filter(b => b.innerText === content).pop()
// }
function getButton (labels, timeoutMs = 5000) {
  if (typeof labels === 'string') {
    labels = [labels]
  }
  return new Promise(async (resolve, reject) => {
    let thebutton, resolved = false
    setTimeout(() => { reject(); resolved = true }, timeoutMs)
    while (!resolved && !(thebutton = [...document.querySelectorAll('button')].find(i => labels.includes(i.textContent)))) {
      await new Promise(r => setTimeout(r, 250))
    }
    resolve(thebutton)
  })
}
function getMoreButton () {
  return document.querySelectorAll('[href^="https://www.google.com/search"]')[0]
}

async function getCopyAllButton () {
  let thebutton
  while (!(thebutton = [...document.querySelectorAll('button')].find(i => i.textContent == 'Select all text'))) {
    await new Promise(r => setTimeout(r, 250))
  }
  return thebutton
}

function getQuery () {
  return document.querySelector('h2').innerText.replace(/\"/g, '').trim()
}

window.addEventListener('keypress', async function (event) {
  if (event.altKey || event.ctrlKey || event.shiftKey) {
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
      const button = await getButton('Select all text')
      if (button) {
        button.click()
        ;(await getButton('Copy text'))?.click()
        chrome.runtime.sendMessage({ closeThis: true });
      }
    } catch (e) {
      return
    }
  }

  if (event.key === 't' || event.key === 'T') {
    // const button = getButton('Translate') || getButton('翻訳')
    // if (button) {
    //   button.click()
    // }
    const query = getQuery()
    if (query) {
      this.window.open(`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(query)}&op=translate`)
    }
  }
  if (event.key === 's' || event.key === 'S') {
    const button = await getButton('Listen', '読み上げ')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'c' || event.key === 'C') {
    const button = await getButton('Copy text', 'テキストをコピー')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'a' || event.key === 'A') {
    const query = getQuery()
    if (query) {
      this.window.open(`http://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank')
    }
  }


  if(event.key === 'g' || event.key === 'G') {
    // Get the selected text
    const query = getQuery()
    if (query) {
      this.window.open(`https://jisho.org/search/${encodeURIComponent(query)}`, '_blank')
    }
  }
  if(event.key === 'h' || event.key === 'H') {
    // Get the selected text
    const query = getQuery()
    if (query) {
      this.window.open(`https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(query)}`, '_blank')
    }
  }

  if (event.key === 'm' || event.key === 'M') {
    const moreButton = getMoreButton()
    if (moreButton) {
      moreButton.click()
    }
  }
})




let search;

setInterval(() => {
  const annoyingCopyButton = document.querySelectorAll('[aria-label="Copy selected text"],[aria-label="選択したテキストをコピー"]')[0]
  if (annoyingCopyButton) {
    // If the button is present it is either means the page loaded or the user pasted an image
    // In that case we select the text button
    annoyingCopyButton.parentElement.remove()
    if (window.location.search !== search) {
      const button = [...document.querySelectorAll('button')].filter(b => b.innerText === 'Text' || b.innerText === 'テキスト')[0];
      button && button.click()
      search = window.location.search
    }
  }
}, 2000)