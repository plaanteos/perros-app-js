const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');

async function traerJson(url) {
  const respuesta = await fetch(url);
  return respuesta.json();
}

btnBuscar.addEventListener('click', async () => {
  const texto = inputRaza.value.trim().toLowerCase();

  contenedorResultados.innerHTML = '';

  if (texto === '') {
    contenedorResultados.textContent = 'Escribí una raza para buscar.';
    return;
  }

  const dataRazas = await traerJson('https://dog.ceo/api/breeds/list/all');
  const razasCoincidentes = Object.keys(dataRazas.message).filter(raza => raza.includes(texto));

  if (razasCoincidentes.length === 0) {
    contenedorResultados.textContent = 'No se encontraron coincidencias.';
    return;
  }

  const fotos = await Promise.all(
    razasCoincidentes.map(async raza => {
      const dataFoto = await traerJson(`https://dog.ceo/api/breed/${raza}/images/random`);
      return dataFoto.message;
    })
  );

  fotos.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    contenedorResultados.appendChild(img);
  });
});