import {makeAutoObservable} from 'mobx'

export default class BrandStore {
    constructor() {
        this._brands = []
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        if (this._selectedBrand.id === brand.id) {
            this._selectedBrand = {}
        } else this._selectedBrand = brand
    }

    setSelectedBrandModal(brand) {
        this._selectedBrand = brand
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get brands() {
        return this._brands
    }

    get selectedBrand() {
        return this._selectedBrand
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

    getBrandByName(name) {
        return this.brands.filter(brand => brand.name === name)
    }
} 