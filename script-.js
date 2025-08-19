function mostrarFecha() {
  let seleccion = document.getElementById("fechaSelector").value; // obtiene qué fecha elegiste
  let fechas = document.querySelectorAll(".fecha"); // agarra todas las cajas de fechas
  fechas.forEach(f => f.style.display = "none"); // las oculta todas
  document.getElementById(seleccion).style.display = "block"; // muestra solo la elegida
}
