import mongoose from "mongoose";
const localitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
localitySchema.set('timestamps', true)
const LocalityModel = mongoose.model('locality', localitySchema)
export default LocalityModel