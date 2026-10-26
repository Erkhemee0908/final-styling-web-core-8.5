const DESKTOP_QUERY = '(max-width: 1120px)'
const ACTIVE_CLASS = 'side-menu--active'

export function initSideMenu() {
  const menu = document.querySelector('.side-menu')
  const closeButton = document.querySelector('.side-menu__close')
  const openButtons = document.querySelectorAll('#side-menu-open')
  const desktop = window.matchMedia(DESKTOP_QUERY)

  if (!menu) return

  const isOpen = () => menu.classList.contains(ACTIVE_CLASS)

  function openMenu() {
    console.log('help me')
    if (!desktop.matches) return
    menu.classList.add(ACTIVE_CLASS)
  }

  function closeMenu() {
    menu.classList.remove(ACTIVE_CLASS)
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', openMenu)
  })

  if (closeButton) {
    closeButton.addEventListener('click', closeMenu)
  }

  // Click outside the menu closes it.
  // Clicks on an open button are ignored so the menu doesn't close right after opening.
  document.addEventListener('click', (event) => {
    if (!isOpen()) return

    const clickedInsideMenu = menu.contains(event.target)
    const clickedOpenButton = event.target.closest('#side-menu-open')

    if (!clickedInsideMenu && !clickedOpenButton) {
      closeMenu()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu()
    }
  })

  desktop.addEventListener('change', (event) => {
    if (!event.matches) closeMenu()
  })

  function makeSwitchable(buttons, currentClass, onSelect) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((other) => other.classList.remove(currentClass))
        button.classList.add(currentClass)
        if (onSelect) onSelect(button)
      })
    })
  }

  makeSwitchable(
    menu.querySelectorAll('.menu-nav__button'),
    'menu-nav__button--current',
    closeMenu
  )

  makeSwitchable(
    menu.querySelectorAll('.footer__i18n-button'),
    'footer__i18n-button--current'
  )
}
