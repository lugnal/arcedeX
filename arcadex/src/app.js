import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io  = new Server(server,{
    cors: {origin: "*"}
});

io.on("Connection", Socket => {
    console.log("Jogador Conectado:", socket.id)

    socket.on("disconnect", () =>{
    console.log("Jogador Saiu:", socket.id)
    });
});


export default app

