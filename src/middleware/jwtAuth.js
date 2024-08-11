import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    const authHeader = req.cookies.Authorization;

    //req.headers['Authorization'];

    if(!authHeader){
        return res.status(401).render('pages/login/login',{title:'login',error:null});
    }
    const token = authHeader;

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user=payload;
        next();
    }catch(err){
        console.log('Token verification failed',err);
        return res.status(401).render('pages/login/login',{title:'login',error:'Invalid User'});
    }
}

export {jwtAuth};