module.exports =(role)=>{
    return  (req,res,next) =>{

        try {
            if (role) {
                if (req.user.role === role) {
                    next();
                }
                else{
                    return res.status(403).json({
                        status :403,
                        error :new Error("not admin !")
                    });

                }
                
            } else {
                next();
            }
            
        } catch (error) {
            return res.status(401).json({
                status :401,
                error :new Error("Invalide request !")
            });
        }

    }

}