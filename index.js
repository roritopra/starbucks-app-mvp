import { express, Server, cors, os } from './dependencies.js'
const PORT = 5050; // No cambiar
const IPaddress ='192.168.20.21'; // Cambiar por la IP del computador
const SERVER_IP = IPaddress;

const app = express();
app.use(cors({ origin: "*" })); // Esta linea de codigo es para seguridad
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi` });
});
// Run on terminal: ngrok http 5050;

const ioServer = new Server(httpServer, { path: '/real-time' });

app.post('/user', (request, response) => {
    console.log(request.body);
    response.end();
})
//Donde epieza a funcionar la definicion de socket
ioServer.on('connection',(socket) =>{
    console.log(socket.id);
    socket.on('saludo',(message)=> {
        console.log(message);
        socket.broadcast.emit('display-saludo',message);
    });
});

ioServer.on('connection', function(socket) {
    socket.on('eventoDeClick', function(salta) { 
      console.log("-------------Recibido---------");
      console.log(salta, typeof salta);
      socket.broadcast.emit('display-salto', salta);
    });
    socket.on('controller-change-screen', function(screen) {
        socket.broadcast.emit('change-display-screen', screen);
      });
  });


