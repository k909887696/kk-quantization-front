/**
* 钉钉群机器人配置 api接口
*
* @author kk
* @since 2026-11-20
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询钉钉群机器人配置列表分页
export function getDingdingSettingPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDingdingSetting/getDingdingSettingPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除钉钉群机器人配置
export function deleteDingdingSettingById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VDingdingSetting/deleteDingdingSettingById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入钉钉群机器人配置
export function insertDingdingSetting(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDingdingSetting/insertDingdingSetting',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新钉钉群机器人配置
export function updateDingdingSetting(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDingdingSetting/updateDingdingSetting',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取钉钉群机器人配置详情
export function getDingdingSettingDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDingdingSetting/getDingdingSettingDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
