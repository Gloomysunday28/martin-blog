import axios from './index'

interface DouBanMovie {
  (start?: number | string, count?: number | string): any
}

export const GetDouBanMovie: DouBanMovie = (start = 1, count = 10) => {
  return axios.get('/movie/list')
}