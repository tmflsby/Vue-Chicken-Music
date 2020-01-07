<template>
    <div id="app">
        <MHeader></MHeader>
        <Tab></Tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <Player></Player>
    </div>
</template>

<script>
import MHeader from '@/views/m-header/m-header'
import Tab from '@/views/tab/tab'
import Player from '@/views/player/player'
export default {
    name: 'App',
    components: {
        MHeader,
        Tab,
        Player
    }
}
</script>

<style lang="stylus">

</style>
