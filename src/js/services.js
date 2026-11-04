import { makeSwitchable } from './switchable'

// "Read more" / "Hide" for the services text
function initReadMore() {
  const wrapper = document.querySelector('.services__p')
  if (!wrapper) return

  const text = wrapper.querySelector('.services__text')
  const button = wrapper.querySelector('.services__read-more')
  const label = wrapper.querySelector('.services__read-more-text')

  const isExpanded = () => wrapper.classList.contains('services__p--expanded')

  function setExpanded(expanded) {
    wrapper.classList.toggle('services__p--expanded', expanded)
    button.setAttribute('aria-expanded', expanded)
    label.textContent = expanded ? 'Hide' : 'Read more'
    // Full height when open, back to the CSS line limit when closed
    text.style.maxHeight = expanded ? `${text.scrollHeight}px` : ''
  }

  // Hide the button when the whole text already fits in the collapsed height
  function checkFits() {
    if (isExpanded()) {
      text.style.maxHeight = `${text.scrollHeight}px`
      return
    }
    const fits = text.scrollHeight <= text.clientHeight + 1
    wrapper.classList.toggle('services__p--fits', fits)
  }

  button.addEventListener('click', () => setExpanded(!isExpanded()))
  window.addEventListener('resize', checkFits)
  checkFits()
}

export function initServices() {
  const servicesMenu = document.querySelector('.services__menu')
  makeSwitchable(
    servicesMenu.querySelectorAll('.services__item'),
    'services__item--current'
  )

  initReadMore()
}
