import jsonp from '@/assets/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

/**
 * 获取推荐页 轮播图数据
 * */
export const getRecommend = () => {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

/**
 * 获取推荐页 热门歌单推荐数据
 * */
export const getDiscList = () => {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
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

/**
 * 获取推荐页 相应热门歌单歌曲数据
 * */
export const getSongList = (disstid) => {
  const url = debug ? '/api/getCdInfo' : 'http://ustbhuangyi.com/music/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
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
