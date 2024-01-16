import BusinessModel from "~~/server/models/Business";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug && params.bid) {
            const meta = BusinessModel.findOne({ business_slug: params.slug, business_bid: params.bid }, {})
            return meta
        }
    } catch (error) { }
})