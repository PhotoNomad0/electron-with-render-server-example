const client = require('./client-ipc');

let output = document.querySelector('#output')
let num = 1;

document.querySelector('#factorial').addEventListener('click', async () => {
  let result = await client.getFactorial(num++);
  output.innerHTML = result
})

document.querySelector('#call').addEventListener('click', async () => {
  let result = await client.makeCall('this is james' );
  output.innerHTML = result
})
