function getButton (content) {
  return [...document.querySelectorAll('button')].filter(b => b.innerText === content).pop()
}

window.addEventListener('keydown', function (event) {
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

  if (event.key === 't' || event.key === 'T') {
    const button = getButton('Translate') || getButton('翻訳')
    if (button) {
      button.click()
    }
  }
  if (event.key === 's' || event.key === 'S') {
    const button = getButton('Listen') || getButton('読み上げ')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'c' || event.key === 'C') {
    const button = getButton('Copy text') || getButton('テキストをコピー')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'a' || event.key === 'A') {
    const query = document.querySelector('h2').innerText.replace(/\"/g, '').trim()
    if (query) {
      this.window.open(`http://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank')
    }
  }


  if(event.key === 'g' || event.key === 'G') {
    // Get the selected text
    const query = document.querySelector('h2').innerText.replace(/\"/g, '').trim()
    if (query) {
      this.window.open(`https://jisho.org/search/${encodeURIComponent(query)}`, '_blank')
    }
  }
  if(event.key === 'h' || event.key === 'H') {
    // Get the selected text
    const query = document.querySelector('h2').innerText.replace(/\"/g, '').trim()
    if (query) {
      this.window.open(`https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(query)}`, '_blank')
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