import ServiceModel from "~~/server/models/Service";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        return ServiceModel.find({status: 'Active'})
    } catch (error) {}
})