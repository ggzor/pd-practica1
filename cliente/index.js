async function calcular() {
  try {
    const req = await hacerPost('http://localhost:8000/calcular', {
      x: Number(x.value),
      y: Number(y.value),
      op: op.value,
    })
    procesarResultado(await req.json())
  } catch (ex) {
    procesarResultado({ error: 'No se pudo conectar al servidor' })
  }
}

function hacerPost(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function procesarResultado({ resultado, error }) {
  solucion.innerHTML = resultado ?? error
  solucion.removeAttribute('hidden')
  solucion.className = `notification is-${
    (typeof resultado !== 'undefined' && 'primary') || 'danger'
  }`
}

function corregir(nombre) {
  const elemento = document.getElementById(nombre)
  elemento.value = Number(elemento.value)
}
