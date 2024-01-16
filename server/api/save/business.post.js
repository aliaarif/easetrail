import fs from 'fs';
import path from 'path';
import BusinessModel from "~~/server/models/Business";
import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const res = {}

    const randomNumber = () => {
        // const unixTimestamp = Math.floor(Date.now() / 1000)
        const mix = Math.floor(Math.random() * 9001000);
        return Math.floor(mix + Math.random() * 90000000);
    }

    const storeImages = (body, obj = null) => {

        if (obj.business_images.length > 0) {
            const business_images = [];
            for (let i = 0; i < obj.business_images.length; i++) {
                business_images.push(obj.business_images[i]);
            }

            body.images.forEach((file, index) => {
                const buffer = Buffer.from(file, 'base64');
                const customDir = path.join(process.cwd(), 'public/businesses');
                if (!fs.existsSync(customDir)) { fs.mkdirSync(customDir); }
                const uniqueName = `${body.business_slug}_${randomNumber()}.jpg`;
                const filePath = path.join(customDir, uniqueName);
                fs.promises.writeFile(filePath, buffer).then().catch();
                business_images.push('businesses/' + uniqueName)

            })
            body.business_images = []
            body.business_images = business_images


        } else if (obj == null) {
            body.images.forEach((file, index) => {
                const buffer = Buffer.from(file, 'base64');
                const customDir = path.join(process.cwd(), 'public/businesses');
                if (!fs.existsSync(customDir)) { fs.mkdirSync(customDir); }
                const uniqueName = `${body.business_slug}_${randomNumber()}.jpg`;
                const filePath = path.join(customDir, uniqueName);
                fs.promises.writeFile(filePath, buffer).then().catch();
                body.business_images.push('businesses/' + uniqueName)
            })
        }

        // body.images = []
    }

    try {
        if (body._id) {
            const filter = { _id: body._id }
            let count = await BusinessModel.countDocuments({ business_categoryslug: body.business_categoryslug, business_slug: body.business_slug });
            if (count) {
                let existingName = await BusinessModel.findOne({ _id: body._id });
                if (
                    body.business_name != existingName.business_name ||
                    body.business_category != existingName.business_category ||
                    body.business_phone != existingName.business_phone ||
                    body.business_email != existingName.business_email ||
                    body.business_website != existingName.business_website ||
                    body.business_address != existingName.business_address ||
                    body.business_state != existingName.business_state ||
                    body.business_city != existingName.business_city ||
                    body.business_locality != existingName.business_locality ||
                    body.business_pin != existingName.business_pin ||
                    body.business_latitude != existingName.business_latitude ||
                    body.business_longitude != existingName.business_longitude ||
                    body.business_social.facebook != existingName.business_social.facebook ||
                    body.business_social.instagram != existingName.business_social.instagram ||
                    body.business_social.youtube != existingName.business_social.youtube ||
                    body.business_timing.monday.start != existingName.business_timing.monday.end ||
                    body.business_timing.monday.start != existingName.business_timing.monday.end ||
                    body.business_timing.tuesday.start != existingName.business_timing.tuesday.end ||
                    body.business_timing.tuesday.start != existingName.business_timing.tuesday.end ||
                    body.business_timing.wednesday.start != existingName.business_timing.wednesday.end ||
                    body.business_timing.wednesday.start != existingName.business_timing.wednesday.end ||
                    body.business_timing.thrusday.start != existingName.business_timing.thrusday.end ||
                    body.business_timing.thrusday.start != existingName.business_timing.thrusday.end ||
                    body.business_timing.friday.start != existingName.business_timing.friday.end ||
                    body.business_timing.friday.start != existingName.business_timing.friday.end ||
                    body.business_timing.saturday.start != existingName.business_timing.saturday.end ||
                    body.business_timing.saturday.start != existingName.business_timing.saturday.end ||
                    body.business_timing.sunday.start != existingName.business_timing.sunday.end ||
                    body.business_timing.sunday.start != existingName.business_timing.sunday.end ||
                    body.business_description != existingName.business_description ||
                    body.business_faqs[0].q != existingName.business_faqs[0].q ||
                    body.business_faqs[0].a != existingName.business_faqs[0].a ||
                    body.business_faqs[1].q != existingName.business_faqs[1].q ||
                    body.business_faqs[1].a != existingName.business_faqs[1].a ||
                    body.business_faqs[2].q != existingName.business_faqs[2].q ||
                    body.business_faqs[2].a != existingName.business_faqs[2].a ||
                    body.business_description != existingName.business_description ||
                    body.business_images.length != existingName.business_images.length ||
                    body.images.length != existingName.images.length
                ) {
                    const subCat = await SubcategoryModel.findOne({ slug: body.business_categoryslug })
                    body.page_title = subCat.page_title
                    body.page_content = subCat.page_content
                    // storeImages(body, existingName)
                    // Need API call for Store Images

                    const business_images = [];
                    for (let i = 0; i < existingName.business_images.length; i++) {
                        business_images.push(existingName.business_images[i]);
                    }

                    body.images.forEach((file, index) => {
                        const buffer = Buffer.from(file, 'base64');
                        const customDir = path.join(process.cwd(), 'public/businesses');
                        if (!fs.existsSync(customDir)) { fs.mkdirSync(customDir); }
                        const uniqueName = `${body.business_slug}_${randomNumber()}.jpg`;
                        const filePath = path.join(customDir, uniqueName);
                        fs.promises.writeFile(filePath, buffer).then().catch();
                        business_images.push('businesses/' + uniqueName)

                    })
                    body.business_images = []
                    body.business_images = business_images
                    body.images = []

                    BusinessModel.updateOne(filter, body).exec()
                    res.message = 'Business Saved!'
                } else {
                    res.message = 'Already Exist'
                }
            } else {
                const subCat = await SubcategoryModel.findOne({ slug: body.business_categoryslug })
                body.page_title = subCat.page_title
                body.page_content = subCat.page_content
                BusinessModel.updateOne(filter, body).exec()
                res.message = 'Business Saved'
            }
        } else {
            let count = await BusinessModel.countDocuments({ business_category: body.business_category, business_slug: body.business_slug });
            if (count) {
                res.message = 'Already Exist'
            } else {
                const subCat = await SubcategoryModel.findOne({ slug: body.business_categoryslug })
                body.page_title = subCat.page_title
                body.page_content = subCat.page_content
                // storeImages(body, null)
                // Need API call for Store Images

                body.images.forEach((file, index) => {
                    const buffer = Buffer.from(file, 'base64');
                    const customDir = path.join(process.cwd(), 'public/businesses');
                    if (!fs.existsSync(customDir)) { fs.mkdirSync(customDir); }
                    const uniqueName = `${body.business_slug}_${randomNumber()}.jpg`;
                    const filePath = path.join(customDir, uniqueName);
                    fs.promises.writeFile(filePath, buffer).then().catch();
                    body.business_images.push('businesses/' + uniqueName)
                })

                body.images = []

                BusinessModel.create(body)
                res.message = 'Business Added!'
            }
        }
        return res
    } catch (error) { }
})