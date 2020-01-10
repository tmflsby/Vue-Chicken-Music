<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close">
                    <i class="icon-close" @click="hide"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <SearchBox ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></SearchBox>
            </div>
            <div class="shortcut" v-show="!query">
                <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
                <div class="list-wrapper">
                   <Scroll ref="songList" v-if="currentIndex===0" class="list-scroll" :data="playHistory">
                       <div class="list-inner">
                           <SongList :songs="playHistory" @select="selectSong"></SongList>
                       </div>
                   </Scroll>
                   <Scroll :refreshDelay="refreshDelay" ref="searchList" v-if="currentIndex===1" class="list-scroll" :data="searchHistory">
                       <div class="list-inner">
                           <SearchList @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></SearchList>
                       </div>
                   </Scroll>
                </div>
            </div>
            <div class="search-result"  v-show="query">
                <Suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></Suggest>
            </div>
            <TopTip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放列表</span>
                </div>
            </TopTip>
        </div>
    </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/songList/songList'
import SearchList from '@/base/searchList/searchList'
import TopTip from '@/base/topTip/topTip'
import SearchBox from '@/base/searchBox/searchBox'
import Switches from '@/base/switches/switches'
import Suggest from '@/components/suggest/suggest'
import Song from '@/assets/js/song'
import { searchMixin } from '@/assets/js/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AddSong',
    mixins: [searchMixin],
    data() {
        return {
            showFlag: false,
            showSinger: false,
            currentIndex: 0,
            switches: [
                {name:'最近播放'},
                {name:'搜索历史'}
            ]
        }
    },
    components: {
        SearchBox,
        Suggest,
        Switches,
        SongList,
        SearchList,
        TopTip,
        Scroll
    },
    computed: {
        ...mapGetters([
            'playHistory'
        ])
    },
    methods: {
        show() {
            this.showFlag = true
            setTimeout(() => {
                if(this.currentIndex === 0) {
                    this.$refs.songList.refresh()
                }else{
                    this.$refs.searchList.refresh()
                }
            }, 20);
        },
        hide() {
            this.showFlag = false
        },
        selectSuggest() {
            this.saveSearch()
            this.showTip()
        },
        switchItem(index) {
            this.currentIndex = index
        },
        selectSong(song,index) {
            if(index !== 0) {
                this.insertSong(new Song(song))
                this.showTip()
            }
        },
        showTip() {
            this.$refs.topTip.show()
        },
        ...mapActions([
            'insertSong'
        ])
    }
}
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/variable"
    @import "~@/assets/stylus/mixin"
    .add-song
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        z-index: 200
        background: $color-background
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .header
            position: relative
            height: 44px
            text-align: center
            .title
                line-height: 44px
                font-size: $font-size-large
                color: $color-text
            .close
                position: absolute
                top: 0
                right: 8px
                .icon-close
                    display: block
                    padding: 12px
                    font-size: 20px
                    color: $color-theme
        .search-box-wrapper
            margin: 20px
        .shortcut
            .list-wrapper
                position: absolute
                top: 165px
                bottom: 0
                width: 100%
                .list-scroll
                    height: 100%
                    overflow: hidden
                    .list-inner
                        padding: 20px 30px
        .search-result
            position: fixed
            top: 124px
            bottom: 0
            width: 100%
        .tip-title
            text-align: center
            padding: 18px 0
            font-size: 0
            .icon-ok
                font-size: $font-size-medium
                color: $color-theme
                margin-right: 4px
            .text
                font-size: $font-size-medium
                color: $color-text
</style>
