import request from '@/utils/request4Quantization'
import config from '@/config'

export function get_cn_m_page_result(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/cn_m/get_cn_m_page_result',
    method: 'post',
    data: params,
    isLoading
  })
}

