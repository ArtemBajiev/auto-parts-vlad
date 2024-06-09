import axios from 'axios'
import useApi from './useApi'

export default function orders() {
  const { api, params } = useApi()

  const PostOrders = (cart) => {
    return axios.post(api + '/api/order', { cart }, params)
  }
  const GetOrders = () => {
    return axios.get(api + '/api/user', params)
  }

  return {
    PostOrders,
    GetOrders
  }
}
