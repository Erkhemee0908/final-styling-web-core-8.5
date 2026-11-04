// Moves the "current" class to whichever button in a group is clicked.
// buttons: a NodeList or array of elements
// currentClass: the modifier class to move, e.g. 'menu-nav__button--current'
// onSelect (optional): runs after a button is selected, gets the clicked button
export function makeSwitchable(buttons, currentClass, onSelect) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((other) => other.classList.remove(currentClass))
      button.classList.add(currentClass)
      if (onSelect) onSelect(button)
    })
  })
}
