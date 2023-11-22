function setup() {
	pinMode(0, OUTPUT);
	Serial.println("Simulacion Lluvia");
}

function loop() {
	customWrite(0, '1');
	delay(2000);
	customWrite(0, '0');
	delay(5000);
}
