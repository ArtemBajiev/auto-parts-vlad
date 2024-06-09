import axios from 'axios'
import useApi from './useApi'

export default function adminOrders() {
  const { api, paramsImg } = useApi()

  const getOrders = () => {
    return axios.get(api + '/api/orders')
  }
  const changeStatus = (orderId, status) => {
    return axios.post(api + '/api/order/status', { orderId, status })
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
    getOrders,
    changeStatus,
    editProducts
  }
}
