const ImageGallery = {
  highlight: document.querySelector('.highlight  img'),
  previews: document.querySelectorAll('.gallery-preview img'),

  setImage (event) {
    const { target } = event

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
    target.classList.add('active')
    ImageGallery.highlight.src = target.src
  }
}
