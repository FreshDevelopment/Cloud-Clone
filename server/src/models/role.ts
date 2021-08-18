import { model, Schema } from 'mongoose';

const RoleSchema = new Schema({
	role: {
		type: String,
		required: [true, 'Role is required'],
	},
});

export default model('Role', RoleSchema);
