/**
* 系统设置-调度类型 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询系统设置-调度类型列表分页
export function getInvokeTypePageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VInvokeType/getInvokeTypePageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除系统设置-调度类型
export function deleteInvokeTypeById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VInvokeType/deleteInvokeTypeById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入系统设置-调度类型
export function insertInvokeType(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VInvokeType/insertInvokeType',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新系统设置-调度类型
export function updateInvokeType(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VInvokeType/updateInvokeType',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取系统设置-调度类型详情
export function getInvokeTypeDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VInvokeType/getInvokeTypeDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
