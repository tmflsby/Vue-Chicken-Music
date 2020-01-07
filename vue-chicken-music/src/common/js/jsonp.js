import originJSONP from 'jsonp'

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

const param = (data) => {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

export default jsonp
