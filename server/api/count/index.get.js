
import CityModel from "~~/server/models/City";
import CategoryModel from "~~/server/models/Category";
import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";
import UserModel from "~~/server/models/User";
import ContactModel from "~~/server/models/Contact";
export default defineEventHandler(async event => {
    const params = getQuery(event)
    const res = {}
    try {

        if (params.mod == 'cities') {
            return CityModel.count({ }, {}).count()
        }
        if (params.mod == 'categories') {
            return CategoryModel.count({ }, {}).count()
        }
        if (params.mod == 'subcategories') {
            return SubcategoryModel.count({ }, {}).count()
        }
        if (params.mod == 'businesses') {
            return BusinessModel.count({ }, {}).count()
        }
        if (params.mod == 'users') {
            return UserModel.count({ }, {}).count()
        }
        if (params.mod == 'contacts') {
            return ContactModel.count({ }, {}).count()
        }





        if (params.mod == 'CityModel') {
            return CityModel.count({ state: params.countTerm }, {}).count()
        }

        if (params.mod == 'BusinessModel') {
            return BusinessModel.count({ business_category: params.countTerm }, {}).count()
        }
    } catch (error) {
        // // console.log(error)
    }
})