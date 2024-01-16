import ContactModel from "~~/server/models/Contact";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id };
            const update = { status: body.status };
            let result1 = ContactModel.updateOne(filter, update).exec()
            res.status = 200
            res.message = 'Status Updated successfully'
         } else {
            let result1 = ContactModel.create(body)
            res.status = 201
            res.message = 'Message Submitted!'
        }
        return res
    } catch (error) {}
})

