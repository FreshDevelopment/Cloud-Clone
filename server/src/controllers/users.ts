import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
	const { from = 0, limit = 5 } = req.query;
	const query = { condition: true };

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).limit(Number(limit)).skip(Number(from)),
	]);

	res.json({
		total,
		users,
	});
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await User.find({ condition: true, _id: id });

	res.status(200).json({
		user,
	});
};

export const postUser = async (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body;
	const user = new User({ firstName, lastName, email, password });

	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(password, salt);

	await user.save();

	res.status(201).json({
		user,
	});
};

export const putUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id, password, google, ...rest } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		rest.password = bcrypt.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, rest, { new: true });

	res.status(200).json({
		user,
	});
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await User.findByIdAndUpdate(
		id,
		{ condition: false },
		{ new: true }
	);

	res.json({
		user,
	});
};
