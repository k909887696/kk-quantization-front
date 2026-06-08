/**
* 用户信息 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询用户信息列表分页
export function getSyUserPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyUser/getSyUserPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除用户信息
export function deleteSyUserById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyUser/deleteSyUserById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入用户信息
export function insertSyUser(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyUser/insertSyUser',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新用户信息
export function updateSyUser(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyUser/updateSyUser',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取用户信息详情
export function getSyUserDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyUser/getSyUserDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
