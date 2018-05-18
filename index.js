'use strict'

// El objeto app nos permote controlar el ciclo de vida de la app

// El objeto BrowserWindows nos permite cargar todo el contenido visual de la app

const { app, BrowserWindow } = require('electron');

console.dir(app)

app.on('before-quit', () => {
    console.log('Saliendo...')
})

// Esperar a que el app esté listo para mostrar ventana

app.on('ready', () => {
    let win = new BrowserWindow()

    // Evento closed es cuando se cierra la ventana
    win.on('closed', () => {
        win = null
        app.quit()
    })
})

