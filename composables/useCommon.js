import { useAuthDataStore } from "@/stores/auth-data";
export default function useCommon() {
    const authDataStore = useAuthDataStore();
    const city = useState('city', () => 'gurugram')
    const state = useState('state', () => 'haryana')
    const category = useState('category', () => 'hire-on')
    const pageTitle = useState('pageTitle', () => 'Easetrail - List your Business Online and Connect with Customers Today!')
    const metaContent = useState('metaContent', () => 'Easetrail - List your Business Online and Connect with Customers Today!')
    const meta = useState('meta', () => { })
    const customMeta = useState('customMeta', () => { })
    const pageType = useState('pageType', () => '')
    const dynamicTitle = useState('dynamicTitle', () => 'Dashboard')
    const fields = useState('fields', () => [])
    const cities2 = useState('cities2', () => [])
    const module = useState('module', () => 'dashboard')
    const td = useState('td', () => [])
    const scats = useState('scats', () => [])
    const sCat = useState('sCat', () => '')
    const item = useState('item', () => { })
    const action = useState('action', () => 'grid')
    const edit = useState('edit', () => false)
    const isSpinner2 = useState('isSpinner2', () => false)
    const pageNo = useState('pageNo', () => 1)
    const pageLimit = useState('pageLimit', () => 20)
    const auth = useState('auth', () => authDataStore.authData)
    const textEditorContent = useState('textEditorContent', () => '')
    const pageSlug = useState('pageSlug', () => '')
    const searchTerms = useState('searchTerms', () => '')
    const profileTab = useState('profileTab', () => 'profile')
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = useState('day', () => {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const currentDayName = daysOfWeek[currentDayIndex];
        return currentDayName
    })
    const encryptObject = (obj, key) => {
        const jsonString = JSON.stringify(obj);
        const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
        return encrypted;
    }
    const decryptObject = (encryptedData, key) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedObj = JSON.parse(decryptedString);
        return decryptedObj;
    }
    const slug = (str) => { return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '' }
    const title = (str) => {
        var words = str ? str.split('-') : '';
        for (var i = 0; i < words.length; i++) { var word = words[i]; words[i] = word.charAt(0).toUpperCase() + word.slice(1); }
        return words ? words.join(' ') : '';
    }
    const { data: pages } = useAsyncData('pages', () => {
        return $fetch(`/api/pages`, {
            method: 'get'
        })
    },
    )
    const { data: page } = useAsyncData('page', () => {
        return $fetch(`/api/pages?slug=${pageSlug.value}`, {
            method: 'get'
        })
    })
    const { data: subcategories } = useAsyncData('subcategories', () => {
        return $fetch(`/api/subcategories`, {
            method: 'get'
        })
    })
    const { data: categories } = useAsyncData('categories', () => {
        return $fetch(`/api/categories`, {
            method: 'get'
        })
    })
    const showDateTime = (val) => {
        const timestamp = val
        const date = new Date(timestamp)
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
        const formattedDate = date.toLocaleDateString('en-IN', options)
        return formattedDate
    }
    const setProfileTab = (val) => { profileTab.value = val; return; }
    const setAuth = (val) => { authDataStore.authData = val; return; }
    const setPage = (val) => {
        pageSlug.value = val
        useFetch(`/api/pages?slug=${val}`, {
            method: 'get'
        }).then((res) => { page.value = res })
    }
    const setItem = (val) => { item.value = val }
    const setCity = (val) => { city.value = val }
    const setCities2 = (val) => { cities2.value = val }
    const setState = (val) => { state.value = val }
    const setPageTitle = (val) => { pageTitle.value = val; return }
    const setMetaContent = (val) => { metaContent.value = val; return }
    const setPageType = (val) => { pageType.value = val; return }
    const setDynamicTitle = (val) => { dynamicTitle.value = val; return }
    const setMeta = (val) => { meta.value = val; return }
    const setCustomMeta = (val) => { customMeta.value = val; return }
    const setPageNo = (val) => { pageNo.value = val; return }
    const setPageLimit = (val) => { pageLimit.value = val; return; }
    const setAction = (val) => {
        setIsSpinner(true)
        action.value = val;
        setIsSpinner(false);
        return;
    }
    const setTd = (val) => { td.value = val; return; }
    const setEdit = (val) => { edit.value = val; return; }
    const rows = useState('rows', () => { return {} })
    const setSCat = (val) => { sCat.value = val; return; }
    const setTextEditorContent = (val) => { textEditorContent.value = val; return; }
    const setIsSpinner = (val) => { isSpinner2.value = val }
    const setModule = (val) => {
        setIsSpinner(true)
        module.value = val
        if (val == 'states') { td.value = ['Name', 'Status', 'Action'] }
        if (val == 'cities') { td.value = ['State', 'City', 'Slug', 'Status', 'Action'] }
        if (val == 'localities') { td.value = ['State', 'City', 'Locality', 'Locality Slug', 'Status', 'Action'] }
        if (val == 'categories') { td.value = ['Name', 'Slug', 'Status', 'Action'] }
        if (val == 'subcategories') { td.value = ['Category', 'Subcategory', 'Slug', 'Status', 'Action'] }
        if (val == 'services') { td.value = ['Subcategory', 'Service', 'Slug', 'Status', 'Action'] }
        if (val == 'keywords') { td.value = ['Subcategory', 'Keyword', 'Slug', 'Status', 'Action'] }
        if (val == 'businesses') {
            if (authDataStore.authData.role === 'Admin') { td.value = ['bid', 'Name', 'Category', 'City', 'Content By', 'Approved By', 'Date', 'Status', 'Action'] }
            if (authDataStore.authData.role === 'Staff') { td.value = ['Name', 'Category', 'City', 'Content By', 'Approved By', 'Date', 'Status', 'Action'] }
            if (authDataStore.authData.role === 'QC') { td.value = ['Name', 'Category', 'City', 'Date', 'Status', 'Action'] }
            if (authDataStore.authData.role === 'User') { td.value = ['Name', 'Category', 'City', 'Date', 'Status', 'Action'] }
        }
        if (val == 'users') { td.value = ['Name', 'Email', 'Role', 'City', 'Status', 'Action'] }
        if (val == 'leads') { td.value = ['City', 'Category', 'Query', 'Name', 'Email', 'Phone', 'Date', 'Status', 'Action'] }
        if (val == 'contacts') { td.value = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status', 'Action'] }
        if (val == 'scripts') { td.value = ['Name', 'Type', 'Body', 'Status', 'Action'] }
        if (val == 'pages') { td.value = ['Name', 'Body', 'Status', 'Action'] }
        $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}`, { method: 'get' }).then((res) => { rows.value = res; setIsSpinner(false); });
        // setIsSpinner(false);
        return;
    }

    return {
        encryptObject,
        decryptObject,
        profileTab,
        setProfileTab,
        showDateTime,
        searchTerms,
        pages,
        page,
        setPage,
        pageNo,
        setPageNo,
        pageLimit,
        setPageLimit,
        auth,
        setAuth,
        city,
        setCity,
        cities2,
        setCities2,
        state,
        setState,
        slug,
        title,
        setSCat,
        day,
        pageTitle,
        setPageTitle,
        metaContent,
        setMetaContent,
        meta,
        setMeta,
        customMeta,
        setCustomMeta,
        pageType,
        setPageType,
        module,
        action,
        edit,
        setModule,
        setAction,
        setEdit,
        td,
        setTd,
        rows,
        dynamicTitle,
        setDynamicTitle,
        fields,
        item,
        setItem,
        categories,
        subcategories,
        textEditorContent,
        setTextEditorContent,
        isSpinner2,
        setIsSpinner
    }
}