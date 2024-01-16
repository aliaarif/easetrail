import CityModel from "~~/server/models/City";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)

    try {
        if (params.state) { 
            return CityModel.find({status: 'Active', state: params.state}).sort({ state: 1 })
        } else if (params.name) {
            return CityModel.count({ status: 'Active', name: params.name }, {}).count()
        } else {
            return CityModel.find({status: 'Active'}).sort({ name: 1, slug: 1 })
        }
        
    } catch (error) {
        // // console.log(error)
    }
})