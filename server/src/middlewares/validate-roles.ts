import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const isAdminRole = async (
	req: Request | any,
	res: Response,
	next: NextFunction
) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'There is no token in the petition',
		});
	}

	try {
		const { _id }: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		const user = await User.findById(_id);

		if (!user) {
			return res.status(401).json({
				msg: 'Token not valid',
			});
		}

		if (!user.condition) {
			return res.status(401).json({
				msg: 'Token not valid',
			});
		}

		if (user.role !== 'ADMIN_ROLE') {
			return res.status(401).json({
				msg: 'Token not valid',
			});
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({
			error,
			msg: 'Token not valid',
		});
	}
};
