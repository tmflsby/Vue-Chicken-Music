<template>
    <transition class="slide">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <Switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></Switches>
            </div>
            <div class="play-btn" ref="playBtn" @click="random">
                <i class="play-icon"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <Scroll ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data="favoriteList">
                    <div class="list-inner">
                        <SongList :songs="favoriteList" @select="selectSong"></SongList>
                    </div>
                </Scroll>
                <Scroll  ref="playList" v-if="currentIndex===1"
                         class="list-scroll" :data="playHistory"
                >
                    <div class="list-inner">
                        <SongList :songs="playHistory" @select="selectSong"></SongList>
                    </div>
                </Scroll>
            </div>
            <div class="no-result-wrapper" v-show="noresult">
                <NoResult :title="noresultDesc"></NoResult>
            </div>
        </div>
    </transition>
</template>

<script>
import NoResult from '@/base/noResult/noResult'
import Switches from '@/base/switches/switches'
import SongList from '@/base/songList/songList'
import Scroll from '@/base/scroll/scroll'
import Song from '@/assets/js/song'
import { playlistMixin } from "@/assets/js/mixin"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'UserCenter',
    mixins: [ playlistMixin ],
    data() {
        return {
            currentIndex: 0,
            switches: [
                {name:'我喜欢的'},
                {name:'最近听的'}
            ]
        }
    },
    components: {
        Switches,
        SongList,
        Scroll,
        NoResult
    },
    computed: {
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ]),
        noresult() {
            if(Object.is(this.currentIndex,0)) {
                return !this.favoriteList.length
            }else {
                return !this.playHistory.length
            }
        },
        noresultDesc() {
            if(Object.is(this.currentIndex,0)) {
                return '暂无收藏歌曲'
            }else {
                return '你还没听过任何歌曲'
            }
        }
    },
    methods: {
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.listWrapper.style.bottom = bottom
            this.$refs.favoriteList && this.$refs.favoriteList.refresh()
            this.$refs.playList && this.$refs.playList.refresh()
        },
        back() {
            this.$router.back()
        },
        switchItem(index) {
            this.currentIndex = index
        },
        selectSong(song) {
            this.insertSong(new Song(song))
        },
        random() {
            let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
            if(list.length === 0) {
                return
            }
            list = list.map( (song) => {
                return new Song(song)
            })
            this.randomPlay({
                list
            })
        },
        ...mapActions([
            'insertSong',
            'randomPlay'
        ])
    }
}
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/variable"
    .user-center
        position: fixed
        top: 0
        bottom: 0
        z-index: 100
        width: 100%
        background: $color-background
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme
        .switches-wrapper
            margin: 10px 0 30px 0
        .play-btn
            box-sizing: border-box
            width: 135px
            padding: 7px 0
            margin: 0 auto
            text-align: center
            border: 1px solid  $color-text-l
            color: $color-text-l
            border-radius: 100px
            font-size: 0
            .icon-play
                display: inline-block
                vertical-align: middle
                margin-right: 6px
                font-size: $font-size-medium-x
            .text
                display: inline-block
                vertical-align: middle
                font-size: $font-size-small
        .list-wrapper
            position: absolute
            top: 110px
            bottom: 0
            width: 100%
            .list-scroll
                height: 100%
                overflow: hidden
                .list-inner
                    padding: 20px 30px
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
