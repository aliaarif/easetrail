export default function useValidation() {
    const onlyAlpha = (event) => { event.target.value = !/^[a-zA-Z- ]+$/.test(event.target.value) ? '' : event.target.value }
    const onlyNumber = (event) => { event.target.value = !/^[0-9]+$/.test(event.target.value) ? '' : event.target.value }
    const onlyAlphaNumber = (event) => { event.target.value = !/^[a-zA-Z0-9- ]+$/.test(event.target.value) ? '' : event.target.value }
    const onlyFacebook = (event) => { event.target.value = !/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/.test(event.target.value) ? '' : event.target.value }
    const onlyInstagram = (event) => { event.target.value = !/^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9._-]+\/?|p\/[a-zA-Z0-9._-]+\/?|tv\/[a-zA-Z0-9._-]+\/?)$/.test(event.target.value) ? '' : event.target.value }
    const onlyYoutube = (event) => { event.target.value = !/^(https?:\/\/)?((www\.|m\.)?youtube\.com|youtu\.be)\/(watch\?v=[a-zA-Z0-9_-]{11}|[a-zA-Z0-9_-]{11}|user\/[a-zA-Z0-9_-]+|channel\/[a-zA-Z0-9_-]+)\/?$/.test(event.target.value) ? '' : event.target.value }
    const onlyIndianMobile = (event) => { event.target.value = !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/.test(event.target.value) ? '' : event.target.value }
    const onlyEmail = (event) => { event.target.value = !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value) ? '' : event.target.value }
    
    return {
        onlyAlpha,
        onlyNumber,
        onlyAlphaNumber,
        onlyFacebook,
        onlyInstagram,
        onlyYoutube,
        onlyIndianMobile,
        onlyEmail
    }
}
