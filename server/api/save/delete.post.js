
import CityModel from "~~/server/models/City";
import LocalityModel from "~~/server/models/Locality";
import StateModel from "~~/server/models/State";
import CategoryModel from "~~/server/models/Category";
import SubcategoryModel from "~~/server/models/Subcategory";
import ServiceModel from "~~/server/models/Service";
import KeywordModel from "~~/server/models/Keyword";
import BusinessModel from "~~/server/models/Business";
import UserModel from "~~/server/models/User";
import LeadModel from "~~/server/models/Lead";
import ContactModel from "~~/server/models/Contact";
import ScriptModel from "~~/server/models/Script";
export default defineEventHandler(async event => {
    const params = getQuery(event)
    const res = {}
    try {
        if (params.mod == 'cities') { return CityModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'localities') { return LocalityModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'subcategories') { return SubcategoryModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'states') { return StateModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'categories') { return CategoryModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'services') { return ServiceModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'keywords') { return KeywordModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'businesses') { return BusinessModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'users') { return UserModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'leads') { return LeadModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'contacts') { return ContactModel.deleteOne({ _id: params.id }).exec() }
        if (params.mod == 'scripts') {  return ScriptModel.deleteOne({ _id: params.id }).exec()}
        return res
    } catch (error) {}
})