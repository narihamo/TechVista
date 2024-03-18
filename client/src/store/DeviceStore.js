import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        makeAutoObservable(this)
    }

    setDevices(devices) {
        this._devices = devices
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get devices() {
        return this._devices
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
} 