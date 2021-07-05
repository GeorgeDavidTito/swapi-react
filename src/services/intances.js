import axios from 'axios'

import apiRoute from '../constants/apiRoute'

axios.defaults.timeout = 15000

export const API = axios.create({
  baseURL: apiRoute.url,
})
