import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";
import UserModel from "~~/server/models/User";
export default defineEventHandler(async (event) => {
    const slug = (str) => { return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '' }
    const title = (str) => {
        var words = str ? str.split('-') : '';
        for (var i = 0; i < words.length; i++) { var word = words[i]; words[i] = word.charAt(0).toUpperCase() + word.slice(1); }
        return words ? words.join(' ') : '';
    }
    const params = getQuery(event)
    if (params.slug) { return SubcategoryModel.find({ "category_slug": params.slug }, {}) }
    if (params.subcategory && params.city) {
        const perPage = 10
        return BusinessModel.find({ "business_categoryslug": params.subcategory, "business_city": params.city, "status": "Active" }, {}).sort({ createdAt: -1 })
    }
    if (params.business_bid) { return BusinessModel.findOne({ "business_bid": params.business_bid }, {}) }
})



