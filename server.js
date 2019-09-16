let serverHandlers = require('./server-handlers')
let ipc = require('./server-ipc')

let isDev, version

let { ipcRenderer, remote } = require('electron')
isDev = true
version = remote.app.getVersion()

ipcRenderer.on('set-socket', (event, { name }) => {
  ipc.init(name, serverHandlers)
})

console.log(version)

