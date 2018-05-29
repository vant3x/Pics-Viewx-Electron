'use strict'
// El objeto app nos permite controlar el ciclo de vida de la app
// El objeto BrowserWindows nos permite cargar todo el contenido visual de la app
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'
import fs from 'fs'
import filesize from 'filesize'
import isImage from 'is-image'
import path from 'path'

let win

if (process.env.NODE_ENV === 'development') {
  devtools()
}
// Imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
  console.log('Saliendo...')
})

// Esperar a que el app esté listo para mostrar ventana
app.on('ready', () => {
  // creando una nueva ventana y agregando las caracteristicas de la ventana
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'Hola Mundo!',
    center: true,
    maximizable: false,
    minHeight: 300,
    minWidth: 500,
    show: false
  })

  // once solo se ejecuta una vez
  win.once('ready-to-show', () => {
    win.show()
  })
  // Detectando el evento closed es cuando se cierra la ventana
  win.on('closed', () => {
    win = null
    app.quit()
  })
  win.loadURL(`file://${__dirname}/renderer/index.html`)
  win.toggleDevTools()
})
// --- Abrir directorio e imagenes ---
ipcMain.on('open-directory', (event) => {
  dialog.showOpenDialog(win, {
    title: 'Seleccione la nueva ubicación',
    buttonLabel: 'Abrir ubicación',
    properties: ['openDirectory']
  },
  (dir) => {
    const images = []
    if (dir) {
      fs.readdir(dir[0], (err, files) => {  // eslint-disable-line
        for (var i = 0, length1 = files.length; i < length1; i++) { // eslint-disable-line
          if (isImage(files[i])) { // eslint-disable-line
            let imageFile = path.join(dir[0], files[i])
            let stats = fs.statSync(imageFile)
            let size = filesize(stats.size, {round: 0})
            images.push({filename: files[i], src: `file://${imageFile}`, size: size}) // eslint-disable-line
          }
        }
        console.log(images)
      })
    }
  })
}) // eslint-disable-line