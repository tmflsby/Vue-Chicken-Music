import { playMode } from '@/assets/js/config'
import { loadSearch, loadPlay } from "@/assets/js/cache"

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    toplist: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay()
}

export default state
