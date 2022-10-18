import request from '@/utils/request4Quantization'
import config from '@/config'

export function get_invoke_type_page_result(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/invoke_type/get_invoke_type_page_result',
    method: 'post',
    data: params,
    isLoading
  })
}

export function get_base_data_item_map(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/basedata/get_base_data_item_map',
    method: 'post',
    data: params,
    isLoading,
    isPrompt: false
  })
}
