import LocalityModel from "~~/server/models/Locality";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)

    try {
        if (params.state && params.slug) { 
            return LocalityModel.find({status: 'Active', state: params.slug, slug: params.slug}).sort({ name: 1 })
        } else if (params.state && params.city) { 
            return LocalityModel.find({status: 'Active', state: params.state, city: params.city}).sort({ name: 1 })
        } else if (params.city) { 
            return LocalityModel.find({status: 'Active', city: params.city}).sort({ name: 1 })
        } else {
            return LocalityModel.find({status: 'Active'}).sort({ name: 1 })
        }
        
    } catch (error) {
        // // console.log(error)
    }
})