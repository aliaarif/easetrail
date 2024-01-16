import KeywordModel from "~~/server/models/Keyword";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        return KeywordModel.find({status: 'Active'})
    } catch (error) {}
})