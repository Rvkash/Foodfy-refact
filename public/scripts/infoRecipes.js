const modalOverlay = document.querySelector('.modal-overlay')
const ul = document.querySelector('.hide-ingredientes')
const p1 = document.querySelector('.hide-prepare')
const p2 = document.querySelector('.hide-information')

document
  .querySelector('.esconder')
  .addEventListener('click', function () {
    if (!ul.classList.contains('display')) {
      ul.classList.add('display')
    } else {
      ul.classList.remove('display')
    }
  })

document
  .querySelector('.mostrar')
  .addEventListener('click', function () {
    if (p1.classList.contains('display')) {
      p1.classList.remove('display')
    } else {
      p1.classList.add('display');
    }
  })

document
  .querySelector('.esconder-information')
  .addEventListener('click', function () {
    if (!p2.classList.contains('display')) {
      p2.classList.add('display')
    } else {
      p2.classList.remove('display')
    }
  })
document.querySelector('.button').addEventListener('click', function () {
  if (button.innerHTML == 'Esconder') {
    button.innerHTML = 'Mostrar'
  } else {
    button.innerHTML = 'Esconder'
  }
})
