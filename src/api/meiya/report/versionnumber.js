import request from '@/utils/request4Meiya'
import config from '@/config'
// 获取记录报表更新的最大版本号列表
export function getComVersionNumberList(params, isLoading) {
  return request({
    url: config.meiya_report_api_url + '/apis/v1/platformComVersionNumber/getComVersionNumberList',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}

// 添加记录报表更新的最大版本号
export function addComVersionNumber(params, isLoading) {
  return request({
    url: config.meiya_report_api_url + '/apis/v1/platformComVersionNumber/addComVersionNumber',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}

// 获取记录报表更新的最大版本号
export function getComVersionNumber(params, isLoading) {
  return request({
    url: config.meiya_report_api_url + '/apis/v1/platformComVersionNumber/getComVersionNumber',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}

// 获取记录报表更新的最大版本号列表
export function updateComVersionNumber(params, isLoading) {
  return request({
    url: config.meiya_report_api_url + '/apis/v1/platformComVersionNumber/updateComVersionNumber',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}
// 修改记录报表更新的最大版本号
export function removeComVersionNumber(params, isLoading) {
  return request({
    url: config.meiya_report_api_url + '/apis/v1/platformComVersionNumber/removeComVersionNumber',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}
