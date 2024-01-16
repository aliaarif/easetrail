
import City from "~~/server/models/City"
import Category from "~~/server/models/Category"
import Subcategory from "~~/server/models/Subcategory"
import Business from "~~/server/models/Business"

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    const cities = await City.find({ status: 'Active' })
    const categories = await Category.find({ status: 'Active' })
    const subcategories = await Subcategory.find({ status: 'Active' })
    const businesses = await Business.find({ status: 'Active' })
    // businesses.map((b) => {
    //     b._id.substr(16);
    // })

    // const nBusinesses = businesses.map(b => b.substr(16, b.length));
    // console.log(firstThreeLetters); // Output: ['app', 'ban', 'che']


    let urls = [];


    cities.map((c) => {
        categories.map((cat) => {
            var urlObj1 = {
                loc: `/${c.slug}/${cat.slug}`
            }
            urls.push(urlObj1)


            subcategories.map((scat) => {
                var urlObj2 = {
                    loc: `/${c.slug}/${scat.slug}-in-${scat.slug}`
                }
                urls.push(urlObj2)
            })
        })


        businesses.map((b) => {
            // let bid = b._id.substr(16, b._id.length);
            let bid = b._id;
            var urlObj3 = {
                loc: `/${c.slug}/${b.business_slug}-id${bid}}`
            }
            urls.push(urlObj3)
        })


    })



    return asSitemapUrl(urls)
    // const contentList = await CategoryModel.find()
    // return contentList
    //     .filter(c => c.slug.startsWith('-on'))
    //     .map((c) => {
    //         return asSitemapUrl({
    //             loc: `/gurugram/${c.slug}`,
    //             lastmod: c.updatedAt
    //         })
    //     })
})