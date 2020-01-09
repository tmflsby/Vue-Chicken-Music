import { getLyric, getSongsUrl } from '@/api/song'
import { ERR_OK } from '@/api/config'
import { Base64 } from 'js-base64'

export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.filename = `C400${this.min}.m4a`
        this.url = url
    }

    getLyric () {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject(new Error('no lyric'))
                }
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.log(err)
            })
        })
    }
}

export const createSong = (musicData) => {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
    })
}

export const filterSinger = (singer) => {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}

export const isValidMusic = (musicData) => {
    return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

export const processSongsUrl = (songs) => {
    if (!songs.length) {
        return Promise.resolve(songs)
    }
    return getSongsUrl(songs).then((purlMap) => {
        songs = songs.filter((song) => {
            const purl = purlMap[song.mid]
            if (purl) {
                song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
                return true
            }
            return false
        })
        return songs
    }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
}
