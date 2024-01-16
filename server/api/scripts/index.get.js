import ScriptModel from "~~/server/models/Script";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
            return ScriptModel.find({status: 'Active'})
    } catch (error) {
        // // console.log(error)
    }
})