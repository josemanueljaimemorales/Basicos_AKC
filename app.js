let dataGlobal = [];

fetch('data/basicos.json')
  .then(res => res.json())
  .then(data => {
    dataGlobal = data;
    mostrarAparatos();
  });

function mostrarAparatos() {
  const cont = document.getElementById("contenido");

  const aparatos = [...new Set(dataGlobal.map(d => d.aparato))];

  cont.innerHTML = aparatos.map(a =>
    `<button onclick="mostrarDificultad('${a}')">${a}</button>`
  ).join('');
}

function mostrarDificultad(aparato) {
  const cont = document.getElementById("contenido");

  const dificultades = [...new Set(
    dataGlobal
      .filter(d => d.aparato === aparato)
      .map(d => d.dificultad)
  )];

  cont.innerHTML = dificultades.map(d =>
    `<button onclick="mostrarTabla('${aparato}','${d}')">${d}</button>`
  ).join('');
}

function mostrarTabla(aparato, dificultad) {
  const cont = document.getElementById("contenido");

  const elementos = dataGlobal
    .filter(d => d.aparato === aparato && d.dificultad === dificultad)
    .sort((a,b) => a.orden - b.orden);

  let html = "<h2>" + aparato + " - " + dificultad + "</h2>";
  html += "<table>";

  elementos.forEach(e => {
    html += `<tr><td>${e.orden}</td><td>${e.elemento}</td></tr>`;
  });

  html += "</table>";
  html += `<br><button onclick="mostrarAparatos()">⬅ Volver</button>`;

  cont.innerHTML = html;
}
