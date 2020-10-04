const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', function () {
    const title = card.getAttribute('id')
    let id = 1
    for (const card of cards) {
      if (title === card.getAttribute('id')) {
        window.location.href = `/infoRecipes/${id}`
      }

      valor++
    }
  })
}
