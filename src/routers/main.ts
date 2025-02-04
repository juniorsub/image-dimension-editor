import { Router } from "express";
import * as pingController from '../controllers/ping';
import * as uploadController from '../controllers/upload';
import { generator } from "../libs/multer";


export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/upload', generator.array('arquivo', 10), uploadController.generator);
