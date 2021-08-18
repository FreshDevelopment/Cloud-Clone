import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_URI}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('Data base online');
	} catch (error) {
		console.log(error);
		throw new Error('Error when initializing the database');
	}
};

export default dbConnection;
