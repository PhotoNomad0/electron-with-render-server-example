let electron = require('electron')
let { app, BrowserWindow } = require('electron')
let { fork } = require('child_process')
let findOpenSocket = require('./find-open-socket')
let isDev = require('electron-is-dev')

global.uiWin = null;
global.serverWin = null;

function createWindow() {
  uiWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/client-preload.js'
    }
  })

  uiWin.loadFile('client-index.html')
}

function createBackgroundWindow(socketName) {
  serverWin = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: isDev,
    webPreferences: {
      nodeIntegration: true
    }
  })
  serverWin.loadURL(`file://${__dirname}/server-dev.html`)
}

app.on('ready', async () => {
  createWindow()
  createBackgroundWindow()
})

app.on('before-quit', () => {
})
