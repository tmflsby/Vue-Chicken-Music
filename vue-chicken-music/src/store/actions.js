import * as types from './mutationTypes'

// eslint-disable-next-line no-unused-vars
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCELIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENTINDEX, index)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
