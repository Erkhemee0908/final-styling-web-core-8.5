import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'

// The slider turns off at this width. A section can set its own
// with data-slider-until, e.g. data-slider-until="1120"
const DEFAULT_SLIDER_UNTIL = 768

// Slider: on below the breakpoint, off at the breakpoint and wider
function initSlider(section) {
  const sliderEl = section.querySelector('.card-slider__slider')
  const paginationEl = section.querySelector('.card-slider__pagination')
  if (!sliderEl) return

  const until = section.dataset.sliderUntil || DEFAULT_SLIDER_UNTIL
  const wide = window.matchMedia(`(min-width: ${until}px)`)
  let swiper = null

  function toggleSwiper() {
    if (wide.matches) {
      if (swiper) {
        swiper.destroy(true, true)
        swiper = null
      }
    } else if (!swiper) {
      swiper = new Swiper(sliderEl, {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: paginationEl,
          clickable: true
        }
      })
    }
  }

  toggleSwiper()
  wide.addEventListener('change', toggleSwiper)
}

// Show all / Hide button
function initExpand(section) {
  const expandButton = section.querySelector('.card-slider__expand-button')
  const expandImage = section.querySelector('.card-slider__expand-image')
  const expandText = section.querySelector('.card-slider__expand-text')

  if (!expandButton) return

  expandButton.addEventListener('click', () => {
    const isExpanded = section.classList.toggle('card-slider--expanded')
    expandText.textContent = isExpanded ? 'Hide' : 'Show all'
    expandImage.src = isExpanded
      ? 'img/style-project__hide.svg'
      : 'img/style-project__expand.svg'
  })
}

// Sets up every .card-slider on the page
export function initCardSliders() {
  document.querySelectorAll('.card-slider').forEach((section) => {
    initSlider(section)
    initExpand(section)
  })
}
