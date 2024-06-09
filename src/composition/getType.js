import axios from 'axios'
import useApi from './useApi'

export default function getType() {
  const { api } = useApi()

  const Type  = () => {
    return axios.get(api + '/api/types ')
  }


  return {
    Type,
  }
}