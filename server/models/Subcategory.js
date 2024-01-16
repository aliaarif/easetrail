import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema({
    category: { type: String, required: true, trim: true },
    category_slug: { type: String, required: false, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: false, trim: true },
    services: { type: Array, required: false, trim: true },
    keywords: { type: Array, required: false, trim: true },
    page_title: { type: String, required: false, trim: true },
    page_content: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true }
})
subCategorySchema.set('timestamps', true)
const SubcategoryModel = mongoose.model('Subcategory', subCategorySchema)
export default SubcategoryModel