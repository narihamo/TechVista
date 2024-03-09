import {$host} from "./index";

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
  const {data} = await $host.post('api/device', device)
  return data
}