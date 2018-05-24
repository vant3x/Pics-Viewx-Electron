import url from 'url'
import path from 'path'
import applyFilter from './filters'
import { setIpc, openDirectory } from './ipcRendererEvents'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}

function addImagesEvents () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  for (let i = 0, length1 = thumbs.length; i < length1; i++) {
    thumbs[i].addEventListener('click', function () {
      changeImage(this)
    })
  }
}

function selectEvent () {
  const select = document.getElementById('filters')

  select.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}

// quita la clase selected si ya existe y si no, la agrega
function changeImage (node) {
  if (node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

// buscar imagenes

function searchImagesEvent () {
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')

    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img')
      for (let i = 0, length1 = thumbs.length; i < length1; i++) {
        const fileUrl = url.parse(thumbs[i].src)
        const fileName = path.basename(fileUrl.pathname)
        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove('hidden')
        } else {
          thumbs[i].parentNode.classList.add('hidden')
        }
      }
      selectFirstImage()
    } else { // mostrar todas las imagenes cuando el filtro de busqueda está vacío
      const hidden = document.querySelectorAll('li.hidden')
      for (let i = 0, length1 = hidden.length; i < length1; i++) {
        hidden[i].classList.remove('hidden')
      }
    }
  })
}

function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
