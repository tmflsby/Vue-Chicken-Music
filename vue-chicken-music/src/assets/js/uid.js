let _uid = ''

export const getUid = () => {
    if (_uid) {
        return _uid
    }
    if (!_uid) {
        const t = (new Date()).getUTCMilliseconds()

        // 2^31-1 = 2147483647 是32位操作系统中最大的符号型整型常量
        _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
    }
    return _uid
}
