const express = require('express');
const axios = require('axios');
//const SerialPort = require('serialport');
//const Readline = require('@serialport/parser-readline');

const app = express();
const port = 3000;

/*
// Configura el puerto serie (ajusta el nombre del puerto según tu configuración)
const arduinoPort = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', (data) => {
  console.log('Data from Arduino:', data);
  // Aquí puedes procesar los datos y enviarlos a la nube
  // Ejemplo de procesamiento simple:
  sendToCloud(data.trim());
});
*/

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Ruta para simular la recepción de datos desde Arduino
app.post('/send-data', (req, res) => {
  const data = req.body.sensorData;
  console.log('Data from Arduino:', data);
  sendToCloud(data);
  res.send('Data received');
});

function sendToCloud(data) {
  // Simula el envío de datos a la nube
  console.log('Sending data to cloud:', data);
  // Aquí puedes usar una API real para enviar datos a servicios como AWS IoT, Google Cloud IoT, etc.
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
