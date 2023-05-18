/**
* 个股异常波动信息 api接口
*
* @author kk
* @since 2023-05-18
*/
import request from '@/utils/request4Quantization'
import config from '@/config'

// 查询列表分页
export function get_stock_fluctuation_page_list(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/stock_fluctuation/get_stock_fluctuation_page_list',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除
export function deleteById(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/stock_fluctuation/delete_by_id',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入
export function insert(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/stock_fluctuation/insert',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新
export function update(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/stock_fluctuation/update',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取详情
export function get_details(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/stock_fluctuation/get_details',
    method: 'post',
    data: params,
    isLoading
  })
}
