import StateModel from "~~/server/models/State";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await StateModel.countDocuments({ name: body.name });
            if (count) {
                res.message = 'Already Exist'
            } else {
                StateModel.updateOne(filter, body).exec()
                res.message = 'State Saved!'
            }
        } else {
            let count = await StateModel.countDocuments({ name: body.name });
            if (count) {
                res.message = 'Already Exist'
            } else {
                StateModel.create(body)
                res.message = 'State Added!'
            }
        }
        return res
    } catch (error) {
        console.log(error)
    }
})