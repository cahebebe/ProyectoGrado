
var estado = 0;

function setup() {
	pinMode(0, OUTPUT);
	
	IoEClient.setup({
		type: "Alarma",
		states: [{
			name: "Estado",
			type: "bool",
			controllable: true
		}]
	});
	
	IoEClient.onInputReceive = function(input) {
		processData(input, true);
	}
	
	attachInterrupt(0, function() {
		processData(customRead(0), false);
	})
	
	setEstado(estado);
	
	
	EmailClient.setup(
		"alertas@central.com",
		"10.1.1.10",
		"alertas",
		"alertas"
	);
	
	EmailClient.onSend = function(status) {
		Serial.println("Enviado: " + status);
	};
	
	Serial.println("Alarma Armada");
}

function processData(data, bIsRemote) {
	if ( data.length <= 0  )
		return;
	setEstado(parseInt(data));
}

function setEstado(nuevoEstado) {
	estado = nuevoEstado;

	if(estado === 0) {
		customWrite(0, '0');
	} else {
		customWrite(0, '1');
		EmailClient.send("bomberos@central.com", "Alerta!!!", "Alerta por Inundacion");
	}

	
	customWrite(0, estado);
	IoEClient.reportStates(estado);
	setDeviceProperty(getName(), "state", estado);
}
