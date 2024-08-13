import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGO_URL

if (!MONGODB_URL) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env',
	)
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}
		cached.promise = mongoose.connect(MONGODB_URL, opts).then(mongoose => {
			console.log('Db connected')
			return mongoose
		})
	}
	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}

export default dbConnect