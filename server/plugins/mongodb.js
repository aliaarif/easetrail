
import mongoose from 'mongoose';

export default async () => {
    const config = useRuntimeConfig()
    try {
        const DB_OPTIONS = {
            dbName: config.dbName,
            // user: config.DB_USER,
            // pass: config.DB_PASS,
            // authSource: config.DB_AUTH
        }
        await mongoose.connect(config.dburl, DB_OPTIONS)
        console.log('Connected to MongoDB Database')
    } catch (err) {
        console.log(err)
    }
}