import mongoose from "mongoose";
const keywordSchema = new mongoose.Schema({
    subcategory: { type: String, required: true, trim: true },
    subcategory_slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true }
})
keywordSchema.set('timestamps', true)
const KeywordModel = mongoose.model('keyword', keywordSchema)
export default KeywordModel