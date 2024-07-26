import request from '@/utils/request4Quantization'
import config from '@/config'

export function get_collection_task_history_page_result(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_task_history/get_collection_task_history_page_result',
    method: 'post',
    data: params,
    isLoading
  })
}

export function get_collection_task_page_result(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_task/get_collection_task_page_result',
    method: 'post',
    data: params,
    isLoading
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

export function retry_execute_task(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/collection_task/retry_execute_task',
    method: 'post',
    data: params,
    isLoading
  })
}
