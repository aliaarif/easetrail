import SubcategoryModel from "~~/server/models/Subcategory";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) {
            const meta = SubcategoryModel.findOne({ slug: params.slug }, {})
            return meta
        }
    } catch (error) {}
})