const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    //Funcion para asignar el numero del siguiente ticket
    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    //Obtiene el ultimo ticket
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    //Obtiene los 4 ultimos tickets
    getUltimos4() {
        return this.ultimos4;
    }

    //Obtener el numero de escritorio que se la asigna a cada ticket
    atenderTickek(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets en cola';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTickek = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTickek);
        if (this.ultimos4.length > 4) {
            //borra el ultimo elemento del arreglo
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTickek;
    }

    //Funcion para reiniciar el conteo de tickets
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema');
    }

    //Funcion para grabar datos en el archivo data.json
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}