import UserModel from "~~/server/models/User";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id };
            body.lock = true
            let result1 = await UserModel.updateOne(filter, body).exec()
            res.status = 200
            res.message = 'User Saved successfully'
         } else {
            let result2 = UserModel.create(body)
            res.status = 201
            res.message = 'New User Generated successfully'
        }
        return res
    } catch (error) {}
})