import SubcategoryModel from "~~/server/models/Subcategory";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) { 
            return SubcategoryModel.findOne({slug: params.slug})    
        }
        return SubcategoryModel.find({status: 'Active'})
    } catch (error) {}
})