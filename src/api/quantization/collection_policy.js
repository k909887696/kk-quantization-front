import request from '@/utils/request4Quantization'
import config from '@/config'

export function get_collection_policy_page_result(params, isLoading, isPrompt) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_policy/get_collection_policy_page_result',
    method: 'post',
    data: params,
    isLoading: isLoading,
    isPrompt
  })
}

export function insert_policy(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_policy/insert_policy',
    method: 'post',
    data: params,
    isLoading
  })
}

export function update_policy(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_policy/update_policy',
    method: 'post',
    data: params,
    isLoading
  })
}

export function get_policy(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_policy/get_policy',
    method: 'post',
    data: params,
    isLoading
  })
}

export function execute_policy_by_hand(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_policy/execute_policy_by_hand',
    method: 'post',
    data: params,
    isLoading
  })
}
