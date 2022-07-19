import mongoose from "mongoose";
import { config } from "./config";

const { host, dbName } = config.db;

export async function startDb() {
	return mongoose
		.connect(
			// TODO: Fix mongodb authentication
			// `mongodb://${DB_USER}:${DB_PWD}@mongodb:27017/rates-db`,
			`mongodb://${host}:27017/${dbName}`,
		);
}
