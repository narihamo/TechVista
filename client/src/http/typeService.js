import {$authHost, $host} from "./index";

export const getTypes = async () => {
  const {data} = await $host.get('api/type')
  return data
}

export  const createType = async (type) => {
  const {data} = await $authHost.post('api/type', type)
  return data
}