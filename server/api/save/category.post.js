import CategoryModel from "~~/server/models/Category";
import SubcategoryModel from "~~/server/models/Subcategory";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await CategoryModel.countDocuments({ slug: body.slug });
            if (count) {
                let existingName = await CategoryModel.findOne({ _id: body._id });
                if (body.name != existingName.name) {
                    await SubcategoryModel.updateOne({ category: body.name }, { category_slug: body.slug }).exec()
                    CategoryModel.updateOne(filter, body).exec()
                    res.message = 'Category Saved!'
                } else {
                    res.message = 'Already Exist'
                }
            } else {
                await SubcategoryModel.updateOne({ category: body.name }, { category_slug: body.slug }).exec()
                CategoryModel.updateOne(filter, body).exec()
                res.message = 'Category Saved!'
            }
        } else {
            let count = await CategoryModel.countDocuments({ slug: body.slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                // await SubcategoryModel.updateOne({ category: body.name }, { category_slug: body.slug }).exec()
                CategoryModel.create(body)
                res.message = 'Category Added!'
            }
        }
        return res
    } catch (error) {}
})