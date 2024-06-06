const express = require('express');
const cors = require('cors'); 
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
//const SerialPort = require('serialport');
//const Readline = require('@serialport/parser-readline');

const app = express();
const port = 3000;

// Configura SendGrid
sgMail.setApiKey('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');

// Configura Twilio
const twilioClient = twilio('AC4bcabb9bf1c8361706dc3e32fa61c0df', '0f98f70dda2d1988f6a004be449e1651');

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
app.use(cors()); 
app.use(express.json());

let latestSensorData = null;
let criticalLevel = 50; // Definir nivel crítico

// Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Ruta para simular la recepción de datos desde Arduino
app.post('/send-data', (req, res) => {
  const data = req.body.sensorData;
  console.log('Data from Arduino:', data);

  const distance = parseInt(data.match(/\d+/)[0], 10);
  if (distance <= criticalLevel) {
    sendAlerts(data);
  }

  sendToCloud(data);
  res.send('Data received');
});


// Ruta para obtener los últimos datos del sensor
app.get('/latest-data', (req, res) => {
    res.json({ sensorData: latestSensorData });
  });

function sendToCloud(data) {
  // Simula el envío de datos a la nube
  console.log('Sending data to cloud:', data);
  // Aquí puedes usar una API real para enviar datos a servicios como AWS IoT, Google Cloud IoT, etc.
}
app.post('/send-alerts', async (req, res) => {
  var { data } = req.body;
  sendAlerts(data);
  res.json({ results: data });
});

function sendAlerts(data) {
    sendEmailAlert(data);
    sendSMSAlert(data);
    sendPushNotification(data);
  }

  function sendEmailAlert(data) {
    const msg = {
      to: 'danielaaguilar2207@gmail.com',
      from: 'danielaaguilar2207@gmail.com',
      subject: 'Nivel de Agua Crítico Detectado',
      text: `Se ha detectado un nivel crítico de agua: ${data}`,
    };
  
    sgMail.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });

      console.log('Email sent:', data);
  }

  
function sendSMSAlert(data) {
  twilioClient.messages.create({
    body: `Nivel de Agua Crítico Detectado: ${data}`,
    from: '+14092079488', // Tu número Twilio
    to: '+50684059784' // Número del destinatario
  })
  .then(message => {
    console.log('SMS sent:', message.sid);
  })
  .catch(error => {
    console.error('Error sending SMS:', error);
  });
}


function sendPushNotification(data) {
    // Implementa la lógica de notificaciones push según el servicio que uses (Firebase, OneSignal, etc.)
    console.log('Push notification sent:', data);
  }


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
