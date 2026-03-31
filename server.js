const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
// Ya no importa si borraste o no el express.static, este código lo va a ignorar.

let pendientes = [];
let realizadas = [];

// 1. CREAMOS LA RUTA NUEVA /tareas PARA BURLAR LA CACHÉ
app.get('/tareas', function(req, res) {
    let paginaHtml = fs.readFileSync('public/index.html', 'utf8');

    let textoPendientes = "";
    for (let i = 0; i < pendientes.length; i++) {
        textoPendientes = textoPendientes + `
            <li>
                <form action="/completar" method="POST" style="display:inline;">
                    <input type="hidden" name="id" value="${i}">
                    <input type="checkbox" onchange="this.form.submit()">
                </form>
                ${pendientes[i]}
                <a href="/eliminar?id=${i}"> <button type="button">Eliminar</button> </a>
            </li>
        `;
    }

    let textoRealizadas = "";
    for (let i = 0; i < realizadas.length; i++) {
        textoRealizadas = textoRealizadas + `
            <li>
                <input type="checkbox" checked disabled> 
                <s>${realizadas[i]}</s>
            </li>
        `;
    }

    paginaHtml = paginaHtml.replace('{{LISTA_PENDIENTES}}', textoPendientes);
    paginaHtml = paginaHtml.replace('{{LISTA_REALIZADAS}}', textoRealizadas);

    res.send(paginaHtml);
});

// 2. AGREGAR (Ahora te regresa a /tareas)
app.post('/agregar', function(req, res) {
    let tarea = req.body.nuevaTarea;

    if (tarea === "") {
        res.send('<script>alert("La caja está vacía"); window.location="/tareas";</script>');
    } else if (pendientes.includes(tarea) || realizadas.includes(tarea)) {
        res.send('<script>alert("Esta tarea ya existe"); window.location="/tareas";</script>');
    } else {
        pendientes.push(tarea);
        res.redirect('/tareas');
    }
});

// 3. COMPLETAR
app.post('/completar', function(req, res) {
    let id = req.body.id;
    let tareaTerminada = pendientes.splice(id, 1);
    realizadas.push(tareaTerminada[0]);
    res.redirect('/tareas');
});

// 4. ELIMINAR
app.get('/eliminar', function(req, res) {
    let id = req.query.id;
    pendientes.splice(id, 1);
    res.redirect('/tareas');
});

// 5. REDIRECCIÓN AUTOMÁTICA
// Si alguien entra a la página principal, lo mandamos a /tareas
app.get('/', function(req, res) {
    res.redirect('/tareas');
});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', function() {
    console.log("Servidor listo en el puerto " + port);
});
