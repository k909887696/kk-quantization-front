import request from '@/utils/request4Quantization'
import config from '@/config'

export function queryAllInvokeType(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/api/v1/tushare/collectiontask/queryAllInvokeType',
    method: 'post',
    params,
    isLoading
  })
}

export function queryCollectionPolicyListPage(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/api/v1/tushare/collectiontask/queryCollectionPolicyListPage',
    method: 'post',
    data: params,
    isLoading
  })
}

export function addCollectionPolicy(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/api/v1/tushare/collectiontask/addCollectionPolicy',
    method: 'post',
    data: params,
    isLoading
  })
}

export function updateCollectionPolicy(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/api/v1/tushare/collectiontask/updateCollectionPolicy',
    method: 'post',
    data: params,
    isLoading
  })
}
