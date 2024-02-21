import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'


enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface DefaultResponseData {
  message?: string
  data?: object
}

export interface DefaultError {
  data?: {
    error?: string
  }
}

const ApiBaseUrl = `http://localhost:5004/`

const instance = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    'Bypass-Tunnel-Reminder': 'true',
    "Access-Control-Allow-Credentials": "true"
  },
})
// instance.interceptors.request.use(
//   (config) => {
//     // middleware to add the bearer token to request
//     const token = getCookie('__session')
//     config.headers.Authorization = token ?? undefined
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   },
// )

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(error)
    return handleError(error)
  },
)

function handleError(error: AxiosError) {
  const { response } = error

  switch (response?.status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      break
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break
    }
  }

  return Promise.reject(error)
}

interface IApiServiceFactory {
  baseURL?: string
}

interface IApiService {
  get: typeof instance.get
  post: typeof instance.post
  put: typeof instance.put
  delete: typeof instance.delete
  request: typeof instance.request
}

export function CreateApiService({
  baseURL = '',
}: IApiServiceFactory): IApiService {
  const buildURL = (url: string) => `${baseURL}${url}`
  return {
    get: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.get<T, R>(buildURL(url), config),
    post: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.post<T, R>(buildURL(url), data, config),
    put: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.put<T, R>(buildURL(url), data, config),
    delete: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.delete<T, R>(buildURL(url), config),
    request: <T = DefaultResponseData, R = AxiosResponse<T>>(
      config: AxiosRequestConfig,
    ): Promise<R> =>
      instance.request<T, R>({
        url: buildURL(config?.url || ''),
        ...config,
      }),
  }
}

const ApiService = instance

export default ApiService
