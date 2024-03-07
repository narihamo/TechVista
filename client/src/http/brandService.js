import {$authHost, $host} from "./index";

export const getBrands = async () => {
  const {data} = await $host.get('api/brand')
  return data
}

export const createBrand = async (brand) => {
  const {data} = await $authHost.post('api/brand', brand)
  return data
}