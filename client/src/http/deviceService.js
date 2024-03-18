import {$authHost, $host} from "./index";

export const getDevices = async (typeId, brandId, page, limit = 5) => {
  try {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
      }})
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getOneDevice = async (id) => {
  const {data} = await $host.get('api/device' + '/' + id)
  return data
}

export const createDevice = async (device) => {
  const {data} = await $authHost.post('api/device/create', device)
  return data
}

export const rateDevice = async (userId, deviceId, rate) => {
  const {data} = await $authHost.post('api/device/rate', {userId, deviceId, rate})
  return data
}

export const getUserRate = async (userId, deviceId) => {
  const {data} = await $authHost.get('api/device/get-user-rate?userId=' + userId + '&deviceId=' + deviceId)
  return data
}