import jsonp from '@/assets/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

/**
 * 获取搜索页 热门搜索数据
 * */
export const getHotSearch = () => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        _: 1567068162534,
        uin: 0,
        platform: 'h5',
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

/**
 * 获取搜索页 搜索数据
 * */
export const search = (query, page, zhida, perpage) => {
    const url = debug ? '/api/search' : 'http://ustbhuangyi.com/music/api/search'

    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
}
