import axios from './index'

interface DouBanMovie {
  (start?: number | string, count?: number | string): any
}

export const GetDouBanMovie: DouBanMovie = (start = 1, count = 10) => {
  return axios.get('/movie/list')
}

export const GetZhiHuHot = () => {
  return axios.get('/zhihu/hot/list')
}

export const GetZhiHuHotDetail = (url: string) => {
  return axios.get('/zhihu/hot/detail', {
    params: {
      url
    }
  })
}

export const GetSmile = (page: number) => {
  return axios.get('/smile/list', {
    params: {
      page
    }
  })
}