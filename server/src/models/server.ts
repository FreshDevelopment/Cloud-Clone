import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/users';
import authRoutes from '../routes/auth';
import dbConnection from '../database/config';

class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		users: '/api/users',
		auth: '/api/auth',
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
		this.middlewares();
		this.routes();
		this.connectDB();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.apiPaths.users, userRoutes);
		this.app.use(this.apiPaths.auth, authRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		});
	}
}

export default Server;
