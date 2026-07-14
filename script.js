// Estado simple de la aplicación: guarda la raza buscada y las fotos recibidas.
const estado = {
  raza: '',
  fotos: []
};

// Referencias a los elementos del DOM que se usan durante la búsqueda.
const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');

// Limpia el contenedor y muestra un mensaje al usuario.
function mostrarMensaje(texto) {
  contenedorResultados.innerHTML = '';
  contenedorResultados.textContent = texto;
}

// Recorre las URLs guardadas en estado.fotos y crea una imagen por cada una.
function render() {
  contenedorResultados.innerHTML = '';

  estado.fotos.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Foto de un perro ${estado.raza}`;
    contenedorResultados.appendChild(img);
  });
}

// Consulta la Dog API usando la raza ingresada y actualiza el estado con las fotos.
function buscarPerros() {
  estado.raza = inputRaza.value.trim().toLowerCase();
  estado.fotos = [];

  if (estado.raza === '') {
    mostrarMensaje('Escribí una raza para buscar.');
    return;
  }

  mostrarMensaje('Buscando fotos...');

  fetch(`https://dog.ceo/api/breed/${estado.raza}/images/random/6`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`La raza "${estado.raza}" no existe o no pudo consultarse.`);
      }

      return response.json();
    })
    .then(data => {
      estado.fotos = data.message;
      render();
    })
    .catch(error => {
      console.error('Error al buscar fotos de perros:', error);
      mostrarMensaje('No se pudieron obtener fotos para esa raza.');
    });
}

// Ejecuta la búsqueda cuando el usuario hace click en el botón.
btnBuscar.addEventListener('click', buscarPerros);

// También permite buscar presionando Enter dentro del input.
inputRaza.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    buscarPerros();
  }
});