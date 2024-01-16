import CategoryModel from "~~/server/models/Category";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.name) {
            return CategoryModel.findOne({ name: params.name }, {})
        }
    } catch (error) {}
})