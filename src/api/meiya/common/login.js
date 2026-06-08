import request from '@/utils/request4View'
import config from '@/config'

export function platlogin(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/nl/nlapi/v1/login/login',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}

export function get_platform_login(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/nl/nlapi/v1/login/getLoginInfo',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading,
    isPrompt: false
  })
}

export function platform_logout(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/nl/nlapi/v1/login/logOut',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading
  })
}

export function valid_platform_jurisdiction(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/nl/nlapi/v1/login/getPermissionList',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading,
    isPrompt: false
  })
}
