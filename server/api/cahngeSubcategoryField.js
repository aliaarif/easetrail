import SubcategoryModel from "~~/server/models/Subcategory";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.cat_slug) {
            const meta = SubcategoryModel.oudateOne({ cat_slug: params.cat_slug }, {})
            return meta
        }
    } catch (error) {}
})