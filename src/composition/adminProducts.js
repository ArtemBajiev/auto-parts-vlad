import axios from 'axios'
import useApi from './useApi'

export default function adminProducts() {
  const { api, paramsImg } = useApi()

  const postTypes = (name) => {
    return axios.post(api + '/api/types/create', { name })
  }
  const getTypes = () => {
    return axios.get(api + '/api/types')
  }
  const createProducts = (detail_brand, number, descr, count, price, modificationId, typeId) => {
    return axios.post(api + '/api/details/create', {
      detail_brand,
      number,
      descr,
      price,
      count,
      modificationId,
      typeId
    })
  }
  const uploadImage = (file, detailId) => {
    return axios.post(api + '/api/details/image/upload', { detailId, file }, paramsImg)
  }
  const editProducts = (detailId, detail_brand, number, descr, count, price) => {
    return axios.post(api + '/api/details/edit', {
      detailId,
      detail_brand,
      number,
      descr,
      price,
      count
    })
  }

  return {
    getTypes,
    createProducts,
    editProducts,
    uploadImage,
    postTypes
  }
}
