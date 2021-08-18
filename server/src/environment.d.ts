declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: strin;
			MONGO_URI: string;
			SECRETORPRIVATEKEY: string;
		}
	}
}

export {};
