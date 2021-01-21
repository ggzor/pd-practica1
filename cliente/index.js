async function calcular() {
  const x = Number(xinput.value)
  const y = Number(yinput.value)
  const op = opinput.value

  try {
    const req = await hacerPost('http://localhost:8000/calcular', {
      x,
      y,
      op,
    })

    mostrarResultado(await req.json())
  } catch (ex) {
    mostrarResultado({ error: 'No se pudo conectar al servidor' })
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

function mostrarResultado({ resultado, error }) {
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
