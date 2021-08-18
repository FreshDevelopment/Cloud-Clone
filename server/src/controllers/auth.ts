import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import generateJwt from '../helpers/generate-jwt';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: 'User / Password are not correct 1',
			});
		}

		if (!user.condition) {
			return res.status(400).json({
				msg: 'User / Password are not correct 2',
			});
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'User / Password are not correct 3',
			});
		}

		const token = await generateJwt(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({
			error,
			msg: 'Something went wrong',
		});
	}
};
