console.log("APP INICIANDO");

let dataGlobal = [];

fetch('data/basicos.json')
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar JSON");
    return res.json();
  })
  .then(data => {
    console.log("DATA OK", data.length);
    dataGlobal = data;
    mostrarAparatos();
  })
  .catch(err => {
    document.getElementById("contenido").innerHTML =
      "<h2 style='color:red'>Error cargando datos</h2>";
    console.error(err);
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

  const dificultades = ["A","B","C","D"]; // FORZADAS

  cont.innerHTML = `<h2>${aparato}</h2>` +
    dificultades.map(d =>
      `<button onclick="mostrarTabla('${aparato}','${d}')">${d}</button>`
    ).join('');
}

function mostrarTabla(aparato, dificultad) {
  const cont = document.getElementById("contenido");

  const elementos = dataGlobal
    .filter(d => d.aparato === aparato && d.dificultad === dificultad)
    .sort((a,b) => a.orden - b.orden);

  let html = `<h2>${aparato} - ${dificultad}</h2><table>`;

  elementos.forEach(e => {
    html += `<tr><td>${e.orden}</td><td>${e.elemento}</td></tr>`;
  });

  html += "</table><br><button onclick='mostrarAparatos()'>Volver</button>";

  cont.innerHTML = html;
}
