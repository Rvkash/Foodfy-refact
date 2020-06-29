const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', function () {
    const title = card.getAttribute('name')
    let valor = 0
    for (const card of cards) {
      if (title === card.getAttribute('name')) {
        window.location.href = `/recipes/${valor}`
      }

      valor++
    }
  })
}
