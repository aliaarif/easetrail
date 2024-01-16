import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true },
    phone: { type: String, required: false, trim: true },
    subcategory: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    query: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true }
})
leadSchema.set('timestamps', true)
const LeadModel = mongoose.model('lead', leadSchema)
export default LeadModel