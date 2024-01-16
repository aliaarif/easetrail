import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    subcategory: { type: String, required: true, trim: true },
    subcategory_slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true }
})
serviceSchema.set('timestamps', true)
const ServiceModel = mongoose.model('service', serviceSchema)
export default ServiceModel