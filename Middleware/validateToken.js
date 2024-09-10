const jwt = require('jsonwebtoken')


// Creating a Authentication Token to Aceess (login)
exports.authenticatetoken = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1]
    if(!token){
        return res.status(404).json({message: 'Access Denied'})
    }
    try{
        const verified = jwt.verify(token, 'mytoken')
        req.user = verified
        next()
    }catch(error){
        res.status(500).json({message: 'Invalid Token'})
    }
}

