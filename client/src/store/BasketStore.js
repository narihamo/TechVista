import {makeAutoObservable} from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = []
    this._countedDevices = []
    makeAutoObservable(this)
  }

  setDevices(devices) {
    this._devices = devices
  }

  get devices() {
    return this._devices
  }

  deleteDevice(id) {
    const filtred = this.devices.filter((device, index) => index != id)
    console.log(filtred, id)
    this.setDevices(filtred)
  }

  countDevice(id) {
    const count = this._devices.filter(device => {
      return device.id === id
    }).length

    return count
  }

  createCountedArr(devices) {
    console.log('devices = ', devices)
    const counted = devices.map((device) => {
      device.count = this.countDevice(device.id)
      console.log(device)
    })
    console.log(counted)
    return counted
  }

  setCountedDevices(devices) {
    // this._countedDevices = devices
  }

  get countedDevices() {
    return this._countedDevices
  }
}