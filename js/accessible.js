const toggleBtn = document.getElementById('toggle-accessible')
let accessible = localStorage.getItem('[longer-tweets] accessible')

function setAccessible (accessible) {
  if (accessible) {
    document.documentElement.classList.add('accessible')
    document.documentElement.classList.remove('normal')
    toggleBtn.textContent = 'Disable accessible theme'
  } else {
    document.documentElement.classList.add('normal')
    document.documentElement.classList.remove('accessible')
    toggleBtn.textContent = 'Enable accessible theme'
  }
}

if (accessible) {
  setAccessible(true)
}

toggleBtn.addEventListener('click', () => {
  accessible = !accessible
  setAccessible(accessible)
  if (accessible) {
    localStorage.setItem('[longer-tweets] accessible', 'please')
  } else {
    localStorage.removeItem('[longer-tweets] accessible')
  }
})
