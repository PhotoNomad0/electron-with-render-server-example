const { remote, ipcRenderer } = require('electron')
const handlers = require('./server-handlers')
const {channelFactorial, channelMakeCall} = require('./constants')

const version = remote.app.getVersion()
let uiWin = null;

function getUiWin() {
  if (!uiWin) {
    uiWin = remote.getGlobal('uiWin');
  }
  return uiWin;
}

function sendReply(channel, factorial) {
  const uiWin = getUiWin();
  if (uiWin) {
    uiWin.webContents.send(channel, factorial);
  }
}

ipcRenderer.on(channelFactorial, (event, num) => {
  console.log(channelFactorial, num);
  const factorial = handlers.makeFactorial(num);
  sendReply(channelFactorial, factorial);
});

ipcRenderer.on(channelMakeCall, (event, call) => {
  console.log(channelMakeCall, call);
  const callResponse = handlers.ringRing(call);
  sendReply(channelMakeCall, callResponse);
});

console.log("server", version)
