import Cookies from 'js-cookie'
import { valid_platform_jurisdiction } from '@/api/meiya/common/login'

const TokenKey = 'kk_quantization_front_token_' + process.env.NODE_ENV

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function validPlatformJurisdiction(permission) {
  valid_platform_jurisdiction({ permissionList: [permission] }).then(response => {
    return response.data.permissionList[permission] 
  })
}

export function getPermissionPlatformJurisdiction(allPermissions) {
  const validRequest = { permissionList: allPermissions || [] }
  const permissions = []
  valid_platform_jurisdiction(validRequest).then(response => {
    allPermissions.forEach(p => {
      if (response.data.permissionList[p] ) {
        permissions.push(p)
      }
    })
  })
  // console.log(permissions)
  return permissions
}
