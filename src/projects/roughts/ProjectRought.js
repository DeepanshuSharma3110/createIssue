import express from 'express';
import ProjectController from '../controller/projectController.js';
import { jwtAuth } from '../../middleware/jwtAuth.js';
const projectRought = express.Router();
const productController = new ProjectController();

//get
projectRought.get('/add', productController.getAdd);
projectRought.get('/all',productController.all);
projectRought.get('/:project_id/delete',productController.deleteProject);

//post
projectRought.post('/add',productController.postAdd);

//get
export default projectRought;