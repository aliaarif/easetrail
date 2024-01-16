import LocalityModel from "~~/server/models/Locality";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await LocalityModel.countDocuments({ state: body.state, city: body.city, slug: body.slug });
            if (count) {
                let existingName = await LocalityModel.findOne({ _id: body._id });

                if (body.name != existingName.name) {
                    LocalityModel.updateOne(filter, body).exec()
                    res.message = 'Locality Saved!'
                } else {
                    res.message = 'Already Exist'
                }
            } else {
                LocalityModel.updateOne(filter, body).exec()
                res.message = 'Locality Saved!'
            }
        } else {
            let count = await LocalityModel.countDocuments({ state: body.state, city: body.city, slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                LocalityModel.create(body)
                res.message = 'Locality Added!'
            }
        }
        return res
    } catch (error) {}
})