

module.exports = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || req.headers.origin || '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ccess-Control-Request-Method, Access-Control-Request-Headers');
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		res.status(200);

		if (!Object.keys(req.body).length)
			return res.end();
	}

	next();
}