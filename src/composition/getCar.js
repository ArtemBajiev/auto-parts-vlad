import axios from 'axios'
import useApi from './useApi'

export default function getCar() {
  const { api } = useApi()

  const getBrand = () => {
    return axios.get(api + '/api/brands')
  }
  const getDesigns = (brand, typeId) => {
    return axios.get(api + '/api/designs', {
      params: {
        brandId: brand,
        typeId
      }
    })
  }

  const getGenerations = (designId, typeId) => {
    return axios.get(api + '/api/generations', { params: { designId, typeId } })
  }
  const getModification = (generationId, typeId) => {
    return axios.get(api + '/api/modifications', { params: { generationId, typeId } })
  }
  const getDetails = (modificationId, typeId) => {
    return axios.get(api + '/api/details', { params: { modificationId, typeId } })
  }

  return {
    getGenerations,
    getBrand,
    getDesigns,
    getModification,
    getDetails
  }
}
