import CategoryModel from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
            return CategoryModel.find({status: 'Active'})
    } catch (error) {
        // // console.log(error)
    }
})