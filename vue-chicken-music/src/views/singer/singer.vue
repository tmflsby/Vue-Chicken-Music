<template>
    <div class="singer" ref="singer">
        <ListView @select="selectSinger" :data="singers" ref="list"></ListView>
        <router-view></router-view>
    </div>
</template>

<script>
import Singer from '@/assets/js/singer'
import ListView from '@/base/listView/listView'
import { mapMutations } from 'vuex'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { playlistMixin } from '@/assets/js/mixin'

const HOT_SINGER_LEN = 10
const HOT_NAME ='热门'

export default {
    name: 'Singer',
    mixins: [playlistMixin],
    data() {
        return {
            singers: []
        }
    },
    components:{
        ListView
    },
    created() {
        this._getSingerList()
    },
    methods:{
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        ...mapMutations({ setSinger: 'SET_SINGER' }),
        selectSinger(singer) {
            this.$router.push({
                path: `singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList() {
            getSingerList().then((res) => {
                if(res.code === ERR_OK){
                    this.singers = this._normalizeSinger(res.data.list)
                }
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.log(err)
            })
        },
        _normalizeSinger(list) {
            let map ={
                hot: {
                    title:HOT_NAME,
                    items:[]
                }
            }
            list.forEach((item, index) => {
                if(index < HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            });
            // 为了得到有序列表，我们需要处理 map
            let ret = []
            let hot = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
