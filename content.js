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
})