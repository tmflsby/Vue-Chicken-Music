<template>
    <MusicList :songs="songs" :title="title" :bg-image="bgImage"></MusicList>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import MusicList from '@/views/musicList/musicList'
export default {
    name: 'SingerDetail',
    data() {
        return {
            songs: []
        }
    },
    components: {
        MusicList
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters(['singer'])
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if(!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.log(err)
            })
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                if(musicData.songid && musicData.albummid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/variable"
    .slide-enter-active,.slide-leave-active
        transition: all .3s
    .slide-enter,.slide-leave-to
        transform: translate3d(100%,0,0)
</style>
