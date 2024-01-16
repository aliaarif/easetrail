import StateModel from "~~/server/models/State";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    return StateModel.findOne({name:body.name}, {})
})