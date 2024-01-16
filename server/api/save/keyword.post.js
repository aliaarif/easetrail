import KeywordModel from "~~/server/models/Keyword";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await KeywordModel.countDocuments({ subcategory: body.subcategory, slug: body.slug });
            if (count) {
                let existingName = await KeywordModel.findOne({ _id: body._id });
                if (body.subcategory != existingName.subcategory || body.name != existingName.name) {
                    KeywordModel.updateOne(filter, body).exec()
                    res.message = 'Keyword Saved!'
                } else {
                    res.message = 'Already Exist'
                }
            } else {
                KeywordModel.updateOne(filter, body).exec()
                res.message = 'Keyword Saved!'
            }
        } else {
            let count = await KeywordModel.countDocuments({ subcategory: body.subcategory, slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                KeywordModel.create(body)
                res.message = 'Keyword Added!'
            }
        }
        return res
    } catch (error) {
        console.log(error)
    }
})