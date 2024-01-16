import LeadModel from "~~/server/models/Lead";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {  
        let count = await LeadModel.countDocuments({ subcategory: body.subcategory, name: body.name});
        if (count) {
            res.message = 'Already Submitted'
        } else {
            LeadModel.create(body)
            res.message = 'Lead Submitted!'
        }
        return res
    } catch (error) {
        console.log(error)
    }
})