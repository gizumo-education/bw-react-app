import Axios, { isAxiosError } from 'axios'

export const axios = Axios.create()

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject(
        new Error(
          'ネットワークエラーが発生しました。接続を確認して、もう一度お試しください。'
        )
      )
    }
    return Promise.reject(error)
  }
)
