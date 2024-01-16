import ServiceModel from "~~/server/models/Service";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await ServiceModel.countDocuments({ subcategory: body.subcategory, slug: body.slug });
            if (count) {
                let existingName = await ServiceModel.findOne({ _id: body._id });
                if (body.subcategory != existingName.subcategory || body.name != existingName.name) {
                    ServiceModel.updateOne(filter, body).exec()
                    res.message = 'Service Saved!'
                } else {
                    res.message = 'Already Exist'
                }
            } else {
                ServiceModel.updateOne(filter, body).exec()
                res.message = 'Service Saved!'
            }
        } else {
            let count = await ServiceModel.countDocuments({subcategory: body.subcategory,  slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                ServiceModel.create(body)
                res.message = 'Service Added!'
            }
        }
        return res
    } catch (error) {
        console.log(error)
    }
})