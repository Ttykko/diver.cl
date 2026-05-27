const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    try{

        const header = req.headers.authorization;

        console.log("HEADER:", header);

        if(!header){

            return res.status(403).json({
                success:false,
                message:'NO HEADER'
            });

        }

        const token = header.split(' ')[1];

        console.log("TOKEN EXTRAIDO:", token);

        console.log(
            "JWT_SECRET_KEY:",
            process.env.JWT_SECRET_KEY
        );

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        console.log(
            "JWT OK:",
            decoded
        );

        req.user = decoded;

        next();

    }catch(err){

        console.error(
            "❌ JWT ERROR:",
            err.message
        );

        return res.status(403).json({
            success:false,
            message:err.message
        });

    }

};