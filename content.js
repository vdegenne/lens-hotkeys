function getButton (content) {
  return [...document.querySelectorAll('button')].filter(b => b.innerText === content).pop()
}

window.addEventListener('keypress', function (event) {
  if (event.key === 't') {
    const button = getButton('Translate')
    if (button) {
      button.click()
    }
  }
  if (event.key === 's') {
    const button = getButton('Listen')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'c') {
    const button = getButton('Copy text')
    if (button) {
      button.click()
    }
  }
  if(event.key === 'a') {
    const query = document.querySelector('h2').innerText.replace(/\"/g, '').trim()
    if (query) {
      this.window.open(`http://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank')
    }
  }


  if(event.key === 'g') {
    // Get the selected text
    const query = document.querySelector('h2').innerText.replace(/\"/g, '').trim()
    if (query) {
      this.window.open(`https://jisho.org/search/${encodeURIComponent(query)}`, '_blank')
    }
  }
})


document.querySelectorAll('[aria-label="Copy selected text"]')[0].parentElement.remove()
// window.onload = function (e) {
//   console.log(
//   )
// }