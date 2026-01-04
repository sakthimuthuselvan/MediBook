import axios, { AxiosRequestConfig, Method } from 'axios';

interface HttpRequestOptions {
  url: string;
  method: Method;
  data?: any;
}
export async function HttpRequest({ url, method, data }: HttpRequestOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || '';
  const fullUrl =`${baseUrl}${url}`
  const config: AxiosRequestConfig = {
    url: fullUrl,
    method,
    data,
  };
  
  try {
    const res = await axios(config);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
}
