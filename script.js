const estado = {
  raza: '',
  fotos: []
};

const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');

function render() {
  estado.fotos.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    contenedorResultados.appendChild(img);
  });
}

async function buscarRazasCoincidentes(texto) {
  const respuesta = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await respuesta.json();
  const todasLasRazas = Object.keys(data.message);

  return todasLasRazas.filter(raza => raza.includes(texto.toLowerCase()));
}

async function traerFotoDeRaza(raza) {
  const respuesta = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
  const data = await respuesta.json();
  return data.message;
}

btnBuscar.addEventListener('click', async () => {
  estado.raza = inputRaza.value.trim();

  contenedorResultados.innerHTML = '';

  if (estado.raza === '') {
    contenedorResultados.textContent = 'Escribí una raza para buscar.';
    return;
  }

  const razasCoincidentes = await buscarRazasCoincidentes(estado.raza);

  if (razasCoincidentes.length === 0) {
    contenedorResultados.textContent = 'No se encontraron coincidencias.';
    estado.fotos = [];
    return;
  }

  estado.fotos = await Promise.all(razasCoincidentes.map(traerFotoDeRaza));

  render();
});