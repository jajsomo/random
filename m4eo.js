// importamos los módulos necesarios
var express = require('express');

// creamos el servidor a partir de la factoría
var app = express();

// MW para enviar la página con los formularios
app.get('/preguntas', function(req,res){
	res.send('<html><body>'
		+ '<form method="get" action="/respuesta">'
		+ '<input type="hidden" name="pregunta" value="america"/></br>'
		+ '¿Quién descubrió América? '
		+ '<input type="text" name="respuesta" value="Escriba la respuesta"/>'
		+ '<input type="submit" value="Enviar"/>'
		+ '</form>'
		+ '<p>'
		+ '<form method="get" action="/respuesta">'
		+ '<input type="hidden" name="pregunta" value="portugal"/></br>'
		+ '¿Cuál es la capital de Portugal? '
		+ '<input type="text" name="respuesta" value="Escriba la respuesta"/>'
		+ '<input type="submit" value="Enviar"/>'
		+ '</form>'
		+ '</body></html>');
});

// MW para tratar las respuestas
app.get('/respuesta', function(req,res){
	var mensaje = "Respuesta correcta";

	if(req.query.pregunta === 'america') {
		if(req.query.respuesta !== 'Cristóbal Colón'){
			mensaje = "La respuesta no es correcta. Cristóbal Colón descubrió América.";
		}
	} else if (req.query.pregunta === 'portugal'){
		if(req.query.respuesta !== 'Lisboa'){
			mensaje = "La respuesta no es correcta. La capital de Portugal es Lisboa.";
		}
	} else { // no debería ejecutarse nunca si no se modificar el parámetro oculto
		mensaje = "La pregunta no es válida"
	}

	res.send('<html><body>'
		+ '<h1>' + mensaje + '</h1>'
		+ '<a href="http://localhost:8000/preguntas">Volver a la página principal</a>'
		+ '</body></html>');
});

// MW para mostrar mensaje si se introduce cualquier otra URL
app.get('*', function(req,res){
	res.send('<html><body>'
		+ '<a href="http://localhost:8000/preguntas">http://localhost:8000/preguntas</a>'
		+ '</body></html>'
		);
});

app.listen(8000);
console.log("Servidor listo en http://localhost:8000");