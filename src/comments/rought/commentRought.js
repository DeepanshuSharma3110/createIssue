import express from 'express';
import CommentController from '../controller/commentController.js';


const commentController = new CommentController();
const commentRought = express.Router();
//get
commentRought.get('/add',commentController.getAdd);
commentRought.get('/:project_id/addComment',commentController.getAdd)
commentRought.get('/:project_id/checkIssue',commentController.getComment);

//post
commentRought.post('/add',commentController.postAdd);
//commentRought.post('/add-comment',commentController.)



export default commentRought;
