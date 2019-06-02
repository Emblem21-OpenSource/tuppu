(function (window, document) {
  const layout = document.getElementById('layout')
  const menuItems = document.getElementById('menu')
  const toggleMenu = document.getElementById('toggleMenu')
  const content = document.getElementById('main')

  function toggleClass (element, className, replacement) {
    const classes = element.className.split(/\s+/)
    const length = classes.length
    let i = 0

    var removeState

    for (; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1)
        removeState = true
        break
      } else if (classes[i] === replacement) {
        classes.splice(i, 1)
        removeState = false
        break
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className)
    } else if (removeState !== undefined) {
      classes.push(removeState ? replacement : className)
    }

    element.className = classes.join(' ')
  }

  function toggleAll (e) {
    const active = 'active'

    e.preventDefault()
    toggleClass(layout, active)
    toggleClass(menuItems, active)
    toggleClass(toggleMenu, active)
  }

  toggleMenu.onclick = function (e) {
    toggleAll(e)
  }

  menuItems.onclick = function (e) {
    toggleAll(e)
  }

  content.onclick = function (e) {
    if (menuItems.className.indexOf('active') !== -1) {
      toggleAll(e)
    }
  }
}(this, document))
