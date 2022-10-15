import request from '@/utils/request4Meiya'
import config from '@/config'

export function platlogin(params, isLoading) {
  return request({
    url: config.meiya_tmcjurisdiction_api_url + '/apixs/v1/apixs/platlogin',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}

export function get_platform_login(params, isLoading) {
  return request({
    url: config.meiya_tmcjurisdiction_api_url + '/apis/v1/logininfo/get_platform_login',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading,
    isPrompt: false
  })
}

export function platform_logout(params, isLoading) {
  return request({
    url: config.meiya_tmcjurisdiction_api_url + '/apis/v1/logininfo/platform_logout',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading
  })
}

export function valid_platform_jurisdiction(params, isLoading) {
  return request({
    url: config.meiya_tmcjurisdiction_api_url + '/apis/v1/logininfo/valid_platform_jurisdiction',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1' },
    isLoading,
    isPrompt: false
  })
}
