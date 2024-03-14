import {$authHost} from "./index";


export const addToBasket = async (userId, deviceId) => {
  const {data} = await $authHost.post('api/basket', {userId, deviceId})
  return data
}

export const removeFromBasket = async (userId, deviceId) => {
  const {data} = await $authHost.post('api/basket/remove', {userId, deviceId})
  return data
}

export const getAllBasket = async (userId) => {
  const {data} = await $authHost.get('api/basket/' + userId)
  return data
}