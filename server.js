const express = require('express');
const cors = require('cors'); 
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

const app = express();
const port = 3000;

// Configura SendGrid
sgMail.setApiKey('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');

// Configura Twilio
const twilioClient = twilio('AC4bcabb9bf1c8361706dc3e32fa61c0df', '0f98f70dda2d1988f6a004be449e1651');

// Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAqKOn3OSypEEF4FB1YgMRSYbMRKbx7DKQ",
  authDomain: "redesiot-5d82d.firebaseapp.com",
  projectId: "redesiot-5d82d",
  storageBucket: "redesiot-5d82d.appspot.com",
  messagingSenderId: "284556005575",
  appId: "1:284556005575:web:47bb7de37f4f1ae6ceeee2",
  databaseURL: "https://redesiot-5d82d-default-rtdb.firebaseio.com"
};

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(cors()); 
app.use(express.json());

// Inicializar firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);
const dbRef = ref(db);

let allRecords = [];

// Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Escucha cambios en la base y actualiza la lista
onValue(dbRef, (snapshot) => {
  allRecords = [];
  snapshot.forEach((childSnapshot) => {
    const record = childSnapshot.val();
    allRecords.push(record);
  })
});

app.get('/getData', (req, res) => {
  res.json(allRecords);
});

// Enviar alertas 
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
    console.log('Push notification sent:', data);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
