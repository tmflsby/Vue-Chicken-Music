<template>
    <div class="search">
        <div class="search-box-wrapper">
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="(item, index) in hotKey" :key="index" @click="addQuery(item.k)" >
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query">
            <Suggest :query="query"></Suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Suggest from '@/components/suggest/suggest'
import SearchBox from "@/base/searchBox/searchBox"
import { getHotSearch } from "@/api/search"
import { ERR_OK } from "@/api/config"
export default {
    name: 'Search',
    data() {
        return {
            hotKey: [],
            query:''
        }
    },
    components: {
        SearchBox,
        Suggest
    },
    created() {
        this._getHotSearch()
    },
    methods: {
        _getHotSearch(){
            getHotSearch().then( res => {
                if(Object.is(res.code, ERR_OK)){
                    const result = res.data.hotkey
                    this.hotKey = result.slice(1,10)
                }
            })
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        onQueryChange(query) {
            this.query = query
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~@/assets/stylus/variable'
    @import '~@/assets/stylus/mixin'
    .search
        .search-box-wrapper
            margin 20px
        .shortcut-wrapper
            position fixed
            top 178px
            bottom 0
            width 100%
            .shortcut
                height 100%
                overflow hidden
                .hot-key
                    margin: 0 20px 20px 20px
                    .title
                        margin-bottom: 20px
                        font-size: $font-size-medium
                        color: $color-text-l
                    .item
                        display: inline-block
                        padding: 5px 10px
                        margin: 0 20px 10px 0
                        border-radius: 6px
                        background: $color-highlight-background
                        font-size: $font-size-medium
                        color: $color-text-d
        .search-result
            position: fixed
            width: 100%
            top: 178px
            bottom: 0
</style>
