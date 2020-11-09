/**
 * @param {String} el
 * @param {String} className
 * */
export const addClass = (el, className) => {
    el.classList.add(className)
}

/**
 * @param {String} el
 * @param {String} className
 * */
export const hasClass = (el, className) => {
    el.classList.add(className)
}

/**
 * @param {String} el
 * @param {String} name
 * @param {String} val
 * */
export const getData = (el, name, val) => {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

/**
 * @param {String} style
 * */
export const prefixStyle = (style) => {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
