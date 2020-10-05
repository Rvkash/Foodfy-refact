const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', function () {
    const title = card.getAttribute('id')
    let valor = 1
    for (const card of cards) {
      if (title === card.getAttribute('valor')) {
        window.location.href = `/infoRecipes/${valor}`
      }

      valor++
    }
  })
}
