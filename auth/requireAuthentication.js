const requireAuthentication = (request, response, next) => {
	if(request.isAuthentication()){
		return next();
	} else{
		response.redirect('/');
	}
};

module.exports = requireAuthentication;