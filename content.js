function getButton (content) {
  return [...document.querySelectorAll('button')].filter(b => b.innerText === content).pop()
}

window.addEventListener('keydown', function (event) {
  if (event.altKey && (event.key === 't' || event.key === 'T')) {
    event.stopPropagation()
    event.preventDefault()
    const button = [...document.querySelectorAll('button')].filter(b => b.innerText === 'Text')[0]
    if (button) {
      button.click()
    }
    return
  }

  if (event.key === 't' || event.key === 'T') {
    const button = getButton('Translate')
    if (button) {
      button.click()
    }
  }
  if (event.key === 's' || event.key === 'S') {
    const button = getButton('Listen')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'c' || event.key === 'C') {
    const button = getButton('Copy text')
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


document.querySelectorAll('[aria-label="Copy selected text"]')[0].parentElement.remove()
// window.onload = function (e) {
//   console.log(
//   )
// }