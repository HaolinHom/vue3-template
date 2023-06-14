import { AxiosRequestConfig } from 'axios';
import fetch from './fetch';

function request<T>(
  url: string | AxiosRequestConfig,
  config?: AxiosRequestConfig,
): Promise<T> {
  const reqParams = Object.assign(
    typeof url === 'string' ? { ...config, url } : { ...url },
    { loading: true },
  );
  return fetch(reqParams);
}

export default request;
