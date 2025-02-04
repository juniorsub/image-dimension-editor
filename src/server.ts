import express from 'express'; 
import helmet from 'helmet';
import path from 'path';
import { mainRouter } from './routers/main';


const server = express(); 
server.use(helmet());
server.use(express.json()); 
server.use(express.urlencoded ({extended: true})); 
server.use(express.static(path.join(__dirname, '../public' )));


server.use(mainRouter);

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}/`);
}); 

