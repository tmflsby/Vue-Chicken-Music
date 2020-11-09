import originJSONP from 'jsonp'

/**
 * @param {Object} data
 * */
const param = (data) => {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

/**
 * @param {String} url
 * @param {Object} data
 * @param {Object} option
 * */
const jsonp = (url, data, option) => {
    return new Promise((resolve, reject) => {
        url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export default jsonp
