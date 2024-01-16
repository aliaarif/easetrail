export default defineNuxtRouteMiddleware(async (to, from) => {
    const { setMeta, setPageType } = useCommon()
    const query = to.params.query

    if (!query.includes('-in-') && !query.includes('-id')) {
        setPageType('Subcategories')
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getCategoriesMeta?slug=${query}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } else if (query.includes('-in-') && !query.includes('-id')) {
        setPageType('Businesses')
        const data = query.split('-in-')[0]
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getSubcategoriesMeta?slug=${data}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } else if (!query.includes('-in-') && query.includes('-id')) {
        const slug = query.split('-id')[0]
        const bid = query.split('-id')[1]
        setPageType('Business Details')
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getBusinessesMeta?slug=${slug}&bid=${bid}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } else if (query.includes('-in-') && query.includes('-id')) {
        const slug = query.split('-id')[0]
        const bid = query.split('-id')[1]
        setPageType('Business Details')
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getBusinessesMeta?slug=${slug}&bid=${bid}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } else {
        setPageType('Categories')
    }
})