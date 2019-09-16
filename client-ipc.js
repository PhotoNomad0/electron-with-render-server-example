const { remote, ipcRenderer } = require('electron');
const {channelFactorial, channelMakeCall} = require('./constants');

let serverWin = null;

function getServerWin() {
  if (!serverWin) {
    serverWin = remote.getGlobal('serverWin');
  }
  return serverWin;
}

function sendMessage(channel, data) {
  const serverWin = getServerWin();
  if (serverWin) {
    serverWin.webContents.send(channel, data);
    return true;
  }
  return false;
}

let factorialCallback = null;
ipcRenderer.on (channelFactorial, (event, num) => {
  console.log (channelFactorial, num);
  if(factorialCallback) {
    factorialCallback(num);
  }
});

let makeCallCallback = null;
ipcRenderer.on (channelMakeCall, (event, call) => {
  console.log (channelMakeCall, call);
  if(makeCallCallback) {
    makeCallCallback(call);
  }
});

async function getFactorial(num) {
  const factorial = await new Promise((resolve, reject) => {
    factorialCallback = (results) => {
      resolve(results);
    };
    const sent = sendMessage(channelFactorial, num);
    if (!sent) {
      reject('not sent');
    }
  });
  factorialCallback = null;
  console.log('factorial(' + num + ') = ' + factorial);
  return factorial;
}

async function makeCall(call) {
  const callResponse = await new Promise((resolve, reject) => {
    makeCallCallback = (results) => {
      resolve(results);
    };
    const sent = sendMessage(channelMakeCall, call);
    if (!sent) {
      reject('not sent');
    }
  });
  makeCallCallback = null;
  console.log('makeCall(' + call + ') = ' + callResponse);
  return callResponse;
}

const client = {};
client.getFactorial = getFactorial;
client.makeCall = makeCall;
module.exports = client;