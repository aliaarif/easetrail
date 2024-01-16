import CityModel from "~~/server/models/City";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await CityModel.countDocuments({ state: body.state, slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                CityModel.updateOne(filter, body).exec()
                res.message = 'City Saved!'
            }
        } else {
            let count = await CityModel.countDocuments({ state: body.state, slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                CityModel.create(body)
                res.message = 'City Added!'
            }
        }
        return res
    } catch (error) {}
})