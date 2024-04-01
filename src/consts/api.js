const PREFIX = `${import.meta.env.VITE_APP_HOST}`
const ADMIN_PREFIX = `${PREFIX}/admin`

export default {
  userInfo: `${ADMIN_PREFIX}/users/user-info`,  // 获得当前登录的用户信息
  users: `${ADMIN_PREFIX}/users`,  //获得所有用户信息
  user_roles: `${ADMIN_PREFIX}/user/roles`,
  UseRroleBind: `${ADMIN_PREFIX}/user/:id/roles`,
  selectedUser: `${ADMIN_PREFIX}/user-info/:id`,

  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  sendAliyunSms: `${ADMIN_PREFIX}/aliyun-sms`, // 发送短信验证码

  permissions: `${ADMIN_PREFIX}/permissions`,
  allPermissions: `${ADMIN_PREFIX}/all-permissions`,

  login: `${ADMIN_PREFIX}/login`,

  roleInfo: `${ADMIN_PREFIX}/role`,
  roleAction: `${ADMIN_PREFIX}/role/:id`,
  userRole: `${ADMIN_PREFIX}/role/:id/users`,
  RolePermissions: `${ADMIN_PREFIX}/role/:id/permissions`,

  classify: `${ADMIN_PREFIX}/classify`,
  parent_classify: `${ADMIN_PREFIX}/parent-classify`,
  selectedClassify: `${ADMIN_PREFIX}/classify/:id`,
}
