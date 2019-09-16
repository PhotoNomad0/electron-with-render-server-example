const handlers = {}

handlers._history = []

const makeFactorial = (num ) => {
  function fact(n) {
    if (n === 1) {
      return 1
    }
    return n * fact(n - 1)
  }

  const factorial = fact(num);
  console.log('factorial(' + num + ') = ' + factorial);
  return factorial
}

const ringRing = (call) => {
  console.log('picking up the phone: ' + call)
  return 'hello!'
}

handlers.makeFactorial = makeFactorial
handlers.ringRing = ringRing

module.exports = handlers
