<template>
    <Scroll class="suggest" :data="result" ref="suggest"
            :pullup="pullup" :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore" @beforeScroll="listScroll"
    >
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <Loading v-show="hasMore" title=""></Loading>
        </ul>
        <div class="no-result-wrapper" v-show="!hasMore && !result.length">
            <NoResult title="抱歉，没有搜索结果"></NoResult>
        </div>
    </Scroll>
</template>

<script>
import NoResult from '@/base/noResult/noResult'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import Singer from '@/assets/js/singer'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/assets/js/song'
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
    name: 'Suggest',
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    },
    methods: {
        search() {
            this.hasMore = true
            this.page = 1
            this.$refs.suggest.scrollTo(0,0)
            search(this.query, this.page, this.showSinger, perpage).then( res=> {
                if(Object.is(res.code,ERR_OK)) {
                    this.result = this._genResult(res.data)
                    this._checkmore(res.data)
                }
            })
        },
        _checkmore(data){
            const song = data.song
            if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
                this.hasMore = false
            }
        },
        _genResult(data){
            let ret =[]
            if(data.zhida && data.zhida.singerid) {
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            if(data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach( (musicData) => {
                if(musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
        getIconCls(item) {
            if(Object.is(item.type, TYPE_SINGER)) {
                return 'icon-mine'
            }else {
                return 'icon-music'
            }
        },
        getDisplayName(item) {
            if(Object.is(item.type , TYPE_SINGER)) {
                return item.singername
            }else {
                return `${item.name} - ${(item.singer)}`
            }
        },
        searchMore(){
            if(!this.hasMore) {
                return
            }
            this.page ++
            search(this.query, this.page, this.showSinger, perpage).then( res=> {
                if(Object.is(res.code,ERR_OK)) {
                    this.result =this.result.concat(this._genResult(res.data))
                    this._checkmore(res.data)
                }
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.log(err)
            })
        },
        selectItem(item) {
            // eslint-disable-next-line no-console
            // console.log(item)  //=====>url is undefined
            if (Object.is(item.type,TYPE_SINGER)) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.setSinger(singer)
            } else {
                this.insertSong(item)
            }
            this.$emit('select')
        },
        listScroll() {
            this.$emit('listScroll')
        },
        refresh() {
            this.$refs.suggest.refresh()
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query(newQuery) {
            this.search(newQuery)
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/variable"
    @import "~@/assets/stylus/mixin"
    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^="icon-"]
                    font-size: 14px
                    color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                    no-wrap()
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
