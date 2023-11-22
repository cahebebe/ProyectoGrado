/*
*
* Módulo de Monitoreo Permanence del nivel del Rio
* y de lluvias por Carlos Bermúdez.
* 
* Nivel Rio: >= 4 & < 4.5 Alerta Amarilla
*            >= 4.5 & < 5.2 Alerta Naranja 
*            >= 5.2 Alerta Roja
*
*/

function setup() {
	pinMode(0, OUTPUT); // Pin de Alarma

	IoEClient.setup({
		type: "Modulo",
        states: [
        {
            name: "NivelRio",
            type: "number",
            unit: "m",
            decimalDigits: 2
        },
        {
            name: "CantidadLluvia",
            type: "number",
            unit: "mm",
            decimalDigits: 2
        }
        ]});

}

function loop() {
    // Lectura de Sensores
    var cantidadLluvia = Math.floor(map(analogRead(A0), 0, 1023, 0, 20) + 0.5); //valor entre 0 y 20
    var nivelRio =  Math.ceil(255.0 * analogRead(A1)) / 1023.0 / 10; //simulado en metros
    

    // Envio de datos a IoEClient
    IoEClient.reportStates([nivelRio, cantidadLluvia]);


    // Alarma Alerta Amarilla Rio
    if (nivelRio >= 4.50) {
        digitalWrite(0, HIGH);
    } else {
        digitalWrite(0, LOW);
    }
    
	delay(1000);
}