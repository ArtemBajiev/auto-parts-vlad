import axios from 'axios'
import useApi from './useApi'

export default function authentication() {
  const { api } = useApi()
  const registration = (email, name, password, password_confirmation) => {
    return axios.post(api + '/api/register', { name, email, password, password_confirmation })
  }
  const login = (email, password) => {
    return axios.post(api + '/api/login', { email, password })
  }

  return {
    registration,
    login
  }
}
