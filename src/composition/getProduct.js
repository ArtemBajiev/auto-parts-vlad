import axios from 'axios'
import useApi from './useApi'

export default function getProduct() {
  const { api } = useApi()

  const getProductModification = (modificationId, typeId) => {
    return axios.get(api + '/api/details', { params: { modificationId, typeId } })
  }
  const getProductItem = (detailId) => {
    return axios.get(api + '/api/detail', { params: { detailId } })
  }

  return {
    getProductModification,
    getProductItem
  }
}
