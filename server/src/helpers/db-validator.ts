import User from '../models/user';
import Role from '../models/role';
import { ObjectId } from 'mongoose';

export const emailExists = async (email: string) => {
	const emailExists = await User.findOne({ email });
	if (emailExists) {
		throw new Error('Email is already in use');
	}
};

export const isRoleValid = async (role: string) => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(
			`Role is required, make sure is a valid one, actual role value: ${role}`
		);
	}
};

export const existsUserById = async (id: ObjectId) => {
	const existsUser = await User.findById(id);
	if (!existsUser) {
		throw new Error(`Id does not exists: ${id}`);
	}
};
