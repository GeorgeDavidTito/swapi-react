import { API } from './instances'

const getPassengers = async (params) => {
  const url = 'people/'

  return await API.get(url, { params })
}

export default {
  getPassengers,
}
