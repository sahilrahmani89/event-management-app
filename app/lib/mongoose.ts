import mongoose from 'mongoose';

const MONGODB_URI = process.env.uri;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached:any = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Database is already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if(MONGODB_URI){
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
        console.log("Database connection established");
        return mongoose;
        }).catch(error => {
        console.error("Database connection error", error);
        throw new Error("Database connection failed");
        });
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
