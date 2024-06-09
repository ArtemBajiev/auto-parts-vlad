import axios from 'axios'
import useApi from './useApi'

export default function adminCars() {
  const { api, paramsImg } = useApi()

  const createBrand = (name) => {
    return axios.post(api + '/api/brands/create', { name })
  }
  const editBrand = (name, brandId) => {
    return axios.post(api + '/api/brands/edit', { name, brandId })
  }
  const createDesign = (name, brandId) => {
    alert(brandId)
    return axios.post(api + '/api/designs/create', { name, brandId })
  }
  const editDesign = (name, designId) => {
    return axios.post(api + '/api/designs/edit', { name, designId })
  }
  const createGenerations = (name, designId) => {
    return axios.post(api + '/api/generations/create', { name, designId })
  }
  const editGenerations = (name, generationId) => {
    return axios.post(api + '/api/generations/edit', { name, generationId })
  }
  const createModifications = (name, generationId) => {
    return axios.post(api + '/api/modifications/create', { name, generationId })
  }
  const editModifications = (name, modificationId) => {
    return axios.post(api + '/api/modifications/edit', { name, modificationId })
  }
  const addImageBrand = (file, brandId) => {
    return axios.post(api + '/api/brands/image/upload', { file, brandId }, paramsImg)
  }
  const addImageGenerations = (file, generationId) => {
    return axios.post(api + '/api/generations/image/upload', { file, generationId }, paramsImg)
  }

  return {
    createBrand,
    editBrand,
    createDesign,
    editDesign,
    createGenerations,
    editGenerations,
    createModifications,
    editModifications,
    addImageBrand,
    addImageGenerations
  }
}
