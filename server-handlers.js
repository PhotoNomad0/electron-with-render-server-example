let handlers = {}

handlers._history = []

handlers['make-factorial'] = async ({ num }) => {
  handlers._history.push(num)

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

handlers['ring-ring'] = async () => {
  console.log('picking up the phone')
  return 'hello!'
}

module.exports = handlers
