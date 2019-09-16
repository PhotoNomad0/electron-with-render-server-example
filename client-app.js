let output = document.querySelector('#output')
let num = 1;

document.querySelector('#factorial').addEventListener('click', async () => {
  let result = await send('make-factorial', { num: num++ })
  output.innerHTML = result
})

document.querySelector('#call').addEventListener('click', async () => {
  let result = await send('ring-ring', { message: 'this is james' })
  output.innerHTML = result
})
