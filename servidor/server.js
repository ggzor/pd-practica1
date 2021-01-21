const f = require('fastify')()
f.register(require('fastify-cors'))

const variables = {}
console.log('Variables:', variables)

const opsGuardar = '+-*/'
f.post('/guardar', async req => {
  const { op, resultado } = req.body

  // Validación
  if (!opsGuardar.includes(op) || typeof resultado !== 'number')
    throw { error: 'Solicitud Inválida' }

  variables[op] = resultado
  console.log('Variables:', variables)

  return { ok: true }
})

f.listen(8000)
