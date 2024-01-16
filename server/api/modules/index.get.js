
import StateModel from "~~/server/models/State";
import CityModel from "~~/server/models/City";
import LocalityModel from "~~/server/models/Locality";
import CategoryModel from "~~/server/models/Category";
import SubcategoryModel from "~~/server/models/Subcategory";
import ServiceModel from "~~/server/models/Service";
import KeywordModel from "~~/server/models/Keyword";
import BusinessModel from "~~/server/models/Business";
import UserModel from "~~/server/models/User";
import LeadModel from "~~/server/models/Lead";
import ContactModel from "~~/server/models/Contact";
import ScriptModel from "~~/server/models/Script";
import PageModel from "~~/server/models/Page";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    if (params.name == 'states') { return StateModel.find({}, {}).limit(params.pageLimit).sort({ name: 1 }) }
    if (params.name == 'cities') { return CityModel.find({}, {}).limit(params.pageLimit).sort({ state: 1 }) }
    if (params.name == 'localities') { return LocalityModel.find({}, {}).limit(params.pageLimit).sort({ state: 1 }) }
    if (params.name == 'categories') { return CategoryModel.find({}, {}).limit(params.pageLimit).sort({ name: 1 }) }
    if (params.name == 'subcategories') {
        return SubcategoryModel.find({}, {}).limit(params.pageLimit).sort({ category: 1 })
        // if (params.searchTerms) {
        //     // '/' + params.searchTerms + '^/'
        //     return SubcategoryModel.find({ }, {}).limit(params.pageLimit)
        // } else if (params.searchTerms == '')  {
        //     return SubcategoryModel.find({ }, {}).limit(params.pageLimit)
        // }
    }
    if (params.name == 'services') { return ServiceModel.find({}, {}).limit(params.pageLimit).sort({ subcategory: 1 }) }
    if (params.name == 'keywords') { return KeywordModel.find({}, {}).limit(params.pageLimit).sort({ subcategory: 1 }) }
    if (params.name == 'businesses') { return BusinessModel.find({}, {}).limit(params.pageLimit).sort({ createdAt: -1 }) }
    if (params.name == 'users') { return UserModel.find({}, {}).limit(params.pageLimit).sort({ email: 1 }) }
    if (params.name == 'leads') { return LeadModel.find({}, {}).limit(params.pageLimit) }
    if (params.name == 'contacts') { return ContactModel.find({}, {}).limit(params.pageLimit) }
    if (params.name == 'scripts') { return ScriptModel.find({}, {}).limit(params.pageLimit) }
    if (params.name == 'pages') { return PageModel.find({}, {}).limit(params.pageLimit) }
    if (params.name == 'profile') { return }
})



