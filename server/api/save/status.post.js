
import CityModel from "~~/server/models/City";
import StateModel from "~~/server/models/State";
import CategoryModel from "~~/server/models/Category";
import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";
import UserModel from "~~/server/models/User";
import LeadModel from "~~/server/models/Lead";
import ContactModel from "~~/server/models/Contact";
import ScriptModel from "~~/server/models/Script";

export default defineEventHandler(async event => {
    const params = getQuery(event)
    const res = {}

    try {
        if (params.mod == 'cities') {
            return CityModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'subcategories') {
            return SubcategoryModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'states') {
            return StateModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'categories') {
            return CategoryModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'businesses') {
            return BusinessModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'users') {
            return UserModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'leads') {
            return LeadModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'contacts') {
            return ContactModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        if (params.mod == 'scripts') {
            return ScriptModel.updateOne({ _id: params.val }, {status:params.update}).exec()
        }

        return res
    } catch (error) {}
})