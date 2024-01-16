import StateModel from "~~/server/models/State";
export default defineEventHandler(async () => {
    try {
        return StateModel.find({status: 'Active'}).sort({ name: 1 })
    } catch (error) {}
})