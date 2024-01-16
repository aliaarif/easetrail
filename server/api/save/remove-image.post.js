import fs from 'fs';
import path from 'path';
import BusinessModel from "~~/server/models/Business";
import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}
    try {
        let existingName = await BusinessModel.findOne({ _id: body._id });

        const filter = { _id: body._id }
        const business_images = [];
        for (let i = 0; i < existingName.business_images.length; i++) {
            if (existingName.business_images[i] != body.business_images) {
                business_images.push(existingName.business_images[i]);
            }
        }
        body.business_images = []
        body.business_images = business_images
        BusinessModel.updateOne(filter, body).exec()
        return res
    } catch (error) { }
})