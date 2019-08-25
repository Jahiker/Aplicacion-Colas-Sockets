//Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

//Escucha de conexiones y desconexiones del servidor
socket.on('connect', function() {
    console.log('Conectado al Servidor');
});
socket.on('disconnect', function() {
    console.log('Se perdio la conexion al servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});