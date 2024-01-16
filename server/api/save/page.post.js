import PageModel from "~~/server/models/Page";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await PageModel.countDocuments({ slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                PageModel.updateOne(filter, body).exec()
                res.message = 'Page Saved!'
            }
        } else {
            let count = await PageModel.countDocuments({ slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                PageModel.create(body)
                res.message = 'Page Added!'
            }
        }
        return res
    } catch (error) {
        console.log(error)
    }
})