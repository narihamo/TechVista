import {$authHost} from "./index";


export const addToBasket = async (userId, deviceId) => {
  const {device} = await $authHost.post('api/basket', {userId, deviceId})
  return device
}

export const removeFromBasket = async (userId, deviceId) => {
  const {removedDevice} = await $authHost.delete('api/basket', {userId, deviceId})
  return removedDevice
}

export const getAllBasket = async (userId) => {
  const {devices} = await $authHost.get('api/basket/' + userId)
  return devices
}