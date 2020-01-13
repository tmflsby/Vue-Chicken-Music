import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200
const FAVORITE_KEY='__favorite__'
const FAVORITE_MAX_LENGTH= 200

const insertArray = (arr, val, compare, maxLen) => {
    const index = arr.findIndex(compare)
    if(Object.is(index, 0)) {
        return
    }
    if(index>0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if(maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

const deleteFromArray = (arr, compare) => {
    const index = arr.findIndex(compare)
    if(index >  -1) {
        arr.splice(index, 1)
    }
}

export const saveSearch = (query) => {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item)=> {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)
    return searches
}

export const loadSearch = () => {
    return storage.get(SEARCH_KEY,[])
}

export const deleteSearch = (query) => {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

export const clearSearch = () => {
    storage.remove(SEARCH_KEY)
    return []
}

export const savePlay = (song) => {
    let songs = storage.get(PLAY_KEY,[])
    insertArray(songs, song , (item) => {
        return item.id === song.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}

export const loadPlay = () => {
    return storage.get(PLAY_KEY, [])
}

export const saveFavorite = (song) => {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export const deleteFavorite = (song) => {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export const loadFavorite = () => {
    return storage.get(FAVORITE_KEY, [])
}
