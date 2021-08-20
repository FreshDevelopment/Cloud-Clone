import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	date: {
		type: String,
		default: Date,
	},
	image: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
		enum: ['ADMIN_ROLE', 'USER_ROLE', 'MANAGER_ROLE', 'STUDENT_ROLE'],
	},
	active: {
		type: Boolean,
		default: true,
	},
	identification: {
		type: String,
		required: [true, 'Identification is required'],
	},
	Grade: {
		type: Number,
		required: [true, 'Grade is required'],
	},
});

export default model('User', UserSchema);
