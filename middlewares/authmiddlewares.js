const jwt = require('jsonwebtoken');

const authentication = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai')
            if(decoded){
                req.body.userId = decoded.userId 
                next()
            }else{
                res.send({"msg": "Please Login!!!"})
            }
        } catch (error) {
            res.send({"msg": error.message})
        }
    }else{
        res.send({"msg": "Please Login!!!"})
    }
}

module.exports = {authentication}