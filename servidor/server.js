const f = require('fastify')()
f.register(require('fastify-cors'))

const variables = {}
console.log('Variables:', variables)

const ops = '*/'
f.post('/calcular', async req => {
  const { x, y, op } = req.body

  // Validación
  if (!ops.includes(op) || typeof x !== 'number' || typeof y !== 'number')
    throw { error: 'Solicitud Inválida' }
  else if (op === '/' && y === 0) throw { error: 'División entre cero' }

  console.log(`Calculando '${x} ${op} ${y}'...`)
  variables[op] = eval(x + op + y)
  console.log('Variables:', variables)

  return { resultado: variables[op] }
})

const opsGuardar = '+-'
f.post('/guardar', async req => {
  const { op, resultado } = req.body

  // Validación
  if (!opsGuardar.includes(op) || typeof resultado !== 'number')
    throw { error: 'Solicitud Inválida' }

  variables[op] = resultado
  console.log('Variables:', variables)
})

f.listen(8000)
