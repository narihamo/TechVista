import {makeAutoObservable} from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = []
    makeAutoObservable(this)
  }

  setDevices(devices) {
    this._devices = devices
  }

  get devices() {
    return this._devices
  }

  deleteDevice(id) {
    this._devices = this.devices.filter(device => device.id !== id)
  }

  increment(id) {
    const device = this.devices.filter(item => item.id === id)
    device[0].count += 1
  }

  decrement(id) {
    const device = this.devices.filter(item => item.id === id)
    device[0].count -= 1

    if (device[0].count === 0) {
      this.deleteDevice(id)
    }
  }

  isInBasket(id) {
    const device = this.devices.filter(item => item.id === id)

    if (device[0]) {
      return true
    } else {
      return false
    }
  }

  getDevice(id) {
    return this.devices.filter(item => item.id === id)
  }
}