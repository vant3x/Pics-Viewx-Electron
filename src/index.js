'use strict'

// El objeto app nos permite controlar el ciclo de vida de la app

// El objeto BrowserWindows nos permite cargar todo el contenido visual de la app

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

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
  let win = new BrowserWindow({
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
