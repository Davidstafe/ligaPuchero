// === CONFIGURACIÓN INICIAL ===
document.addEventListener("DOMContentLoaded", () => {
  ocultarSecciones();
  mostrarInicio(); // Al cargar, muestra solo "Quiénes Somos"
});

// === FUNCIONES BASE ===
function ocultarSecciones() {
  const secciones = document.querySelectorAll(".tabla-container");
  secciones.forEach(sec => sec.style.display = "none");
}

function ocultarQuienesSomos() {
  const quienesSomos = document.getElementById("quienesSomos");
  if (quienesSomos) quienesSomos.style.display = "none";
}

function mostrarQuienesSomos() {
  const quienesSomos = document.getElementById("quienesSomos");
  if (quienesSomos) quienesSomos.style.display = "flex";
}

// === MOSTRAR UNA LIGA ===
function mostrarLiga(nombreLiga) {
  ocultarSecciones();
  ocultarQuienesSomos();
  cargarDatos(nombreLiga);
}

// === VOLVER AL INICIO ===
function mostrarInicio() {
  ocultarSecciones();
  mostrarQuienesSomos();
}

// === CARGAR DATOS DESDE JSON ===
async function cargarDatos(nombreLiga) {
  try {
    const response = await fetch(`data/${nombreLiga}.json`);
    const datos = await response.json();

    mostrarTabla(datos.tabla);
    mostrarGoleadores(datos.goleadores);
    mostrarExpulsados(datos.expulsados);
    mostrarResultados(datos.resultados);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

// === FUNCIONES PARA MOSTRAR DATOS ===
function mostrarTabla(tabla) {
  const seccion = document.querySelectorAll(".tabla-container")[0];
  const tbody = seccion.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = tabla.map(fila => `
    <tr>
      <td>${fila.pos}</td>
      <td>${fila.equipo}</td>
      <td>${fila.pts}</td>
      <td>${fila.pj}</td>
      <td>${fila.g}</td>
      <td>${fila.e}</td>
      <td>${fila.p}</td>
      <td>${fila.df}</td>
    </tr>`).join("");

  seccion.style.display = "block";
}

function mostrarGoleadores(goleadores) {
  const seccion = document.querySelectorAll(".tabla-container")[1];
  const tbody = seccion.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = goleadores.map(g => `
    <tr><td>${g.nombre}</td><td>${g.equipo}</td><td>${g.goles}</td></tr>
  `).join("");

  seccion.style.display = "block";
}

function mostrarExpulsados(expulsados) {
  const seccion = document.querySelectorAll(".tabla-container")[2];
  const tbody = seccion.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = expulsados.map(e => `
    <tr><td>${e.equipo}</td><td>${e.jugador}</td></tr>
  `).join("");

  seccion.style.display = "block";
}

function mostrarResultados(resultados) {
  const seccion = document.querySelectorAll(".tabla-container")[3];
  const contenedor = document.getElementById("contenedorFechas");
  if (!contenedor) return;

  contenedor.innerHTML = resultados.map(f => `
    <div class="fecha">
      <h3>Fecha ${f.fecha}</h3>
      ${f.partidos.map(p => `<p>${p}</p>`).join("")}
    </div>
  `).join("");

  seccion.style.display = "block";
}
