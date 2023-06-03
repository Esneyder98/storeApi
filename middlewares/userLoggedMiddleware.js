function userLoggedMiddleware(req, res, next) {
	if(!req.session.userLogged){
        return res.status(401).json({
			errors: "Debe Loguearse para poder acceder",
		  });
    }else{
		next();
	}
    
	
}

module.exports = userLoggedMiddleware;