const jwt = require('jsonwebtoken');

const generateJwt = (_id = '') => {
	return new Promise((resolve, reject) => {
		const payload = { _id };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: '4h',
			},
			(err: Error, token: string) => {
				if (err) {
					console.log(err);
					reject('Could not generate JWT');
				} else {
					resolve(token);
				}
			}
		);
	});
};

export default generateJwt;
