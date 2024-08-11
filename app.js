import express from 'express';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser';

import userRought from './src/user/rought/userRought.js';
import projectRought from './src/projects/roughts/ProjectRought.js';
import commentRought from './src/comments/rought/commentRought.js';
import path from 'path';

import { jwtAuth } from './src/middleware/jwtAuth.js';


dotenv.config();

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(cookieParser());



//setup ejs as a viewing engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(),'public'));


// Serve static files from the public directory
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.redirect('/api/projects/all')
    //res.status(201).render('pages/home/home',{error:null,})
})


app.use('/api/user',userRought);
app.use('/api/projects',projectRought)
app.use('/api/comment/',commentRought)







export default app;