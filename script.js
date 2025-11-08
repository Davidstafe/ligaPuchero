function mostrarFecha() {
  let seleccion = document.getElementById("fechaSelector").value;
  let fechas = document.querySelectorAll(".fecha");
  fechas.forEach(f => f.style.display = "none");
  document.getElementById(seleccion).style.display = "block";
}

// === CONFIGURACIÓN INICIAL ===
document.addEventListener("DOMContentLoaded", () => {
  ocultarSecciones();
});

function ocultarSecciones() {
  const secciones = document.querySelectorAll(".tabla-container");
  secciones.forEach(sec => sec.style.display = "none");
}

// === MOSTRAR UNA LIGA ===
function mostrarLiga(nombreLiga) {
  ocultarSecciones(); // Limpia lo anterior
  document.querySelector("header").style.display = "none"; // oculta el inicio
  cargarDatos(nombreLiga);
}

// === CARGAR DATOS DESDE EL JSON ===
async function cargarDatos(nombreLiga) {
  try {
    const response = await fetch(`data/${nombreLiga}.json`);
    const datos = await response.json();

    mostrarTabla(datos.tabla);
    mostrarGoleadores(datos.goleadores);
    mostrarAmonestados(datos.amonestados);
    mostrarFixture(datos.fixture);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

// === FUNCIONES PARA MOSTRAR DATOS ===
function mostrarTabla(tabla) {
  const tbody = document.querySelector("section:nth-of-type(1) tbody");
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
  document.querySelector("section:nth-of-type(1)").style.display = "block";
}

function mostrarGoleadores(goleadores) {
  const tbody = document.querySelector("section:nth-of-type(2) tbody");
  tbody.innerHTML = goleadores.map(g => `
    <tr><td>${g.nombre}</td><td>${g.equipo}</td><td>${g.goles}</td></tr>
  `).join("");
  document.querySelector("section:nth-of-type(2)").style.display = "block";
}

function mostrarAmonestados(amonestados) {
  const tbody = document.querySelector("section:nth-of-type(3) tbody");
  tbody.innerHTML = amonestados.map(a => `
    <tr><td>${a.equipo}</td><td>${a.jugador}</td><td>${a.amarillas}</td><td>${a.rojas}</td></tr>
  `).join("");
  document.querySelector("section:nth-of-type(3)").style.display = "block";
}

function mostrarFixture(fixture) {
  const contenedor = document.getElementById("contenedorFechas");
  contenedor.innerHTML = fixture.map(f => `
    <div class="fecha">
      <h3>Fecha ${f.fecha}</h3>
      ${f.partidos.map(p => `<p>${p}</p>`).join("")}
    </div>
  `).join("");
  document.querySelector("section:nth-of-type(4)").style.display = "block";
}

// === MOSTRAR INICIO ===
function mostrarInicio() {
  ocultarSecciones();
  const header = document.querySelector("header");
  header.style.display = "block";

  const quienesSomos = document.querySelector(".quienes-somos");
  if (quienesSomos) quienesSomos.style.display = "block";
}
