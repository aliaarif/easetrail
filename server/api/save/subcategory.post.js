import SubcategoryModel from "~~/server/models/Subcategory";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await SubcategoryModel.countDocuments({ category: body.category, slug: body.slug });
            if (count) {
                let existingName = await SubcategoryModel.findOne({ _id: body._id });

                if (body.name != existingName.name || body.page_title != existingName.page_title || body.page_content != existingName.page_content) {
                    SubcategoryModel.updateOne(filter, body).exec()
                    res.message = 'Subcategory Saved!'
                } else {
                    res.message = 'Already Exist'
                }
                
            } else {
                SubcategoryModel.updateOne(filter, body).exec()
                res.message = 'Subcategory Saved!'
            }
        } else {
            let count = await SubcategoryModel.countDocuments({category: body.category, slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                SubcategoryModel.create(body)
                res.message = 'Subcategory Added!'
            }
        }
        return res
    } catch (error) {
        console.log(error)
    }
})