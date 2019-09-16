let electron = require('electron')
let { app, BrowserWindow } = require('electron')
let { fork } = require('child_process')
let findOpenSocket = require('./find-open-socket')
let isDev = require('electron-is-dev')

let clientWin
let serverWin

function createWindow(socketName) {
  clientWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/client-preload.js'
    }
  })

  clientWin.loadFile('client-index.html')

  clientWin.webContents.on('did-finish-load', () => {
    clientWin.webContents.send('set-socket', {
      name: serverSocket
    })
  })
}

function createBackgroundWindow(socketName) {
  const win = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: isDev,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(`file://${__dirname}/server-dev.html`)

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-socket', { name: socketName })
  })

  serverWin = win
}


app.on('ready', async () => {
  serverSocket = await findOpenSocket()

  createWindow(serverSocket)
  createBackgroundWindow(serverSocket)
})

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill()
    serverProcess = null
  }
})
