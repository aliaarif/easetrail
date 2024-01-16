import CategoryModel from "~~/server/models/Category";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) {
            const meta = CategoryModel.findOne({ slug: params.slug }, {})
            return meta
        }
    } catch (error) {}
})