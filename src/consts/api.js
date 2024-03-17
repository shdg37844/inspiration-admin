const PREFIX = `${import.meta.env.VITE_APP_HOST}`
const WEB_PREFIX = `${PREFIX}/web`
const ADMIN_PREFIX = `${PREFIX}/admin`

export default {
  userInfo: `${ADMIN_PREFIX}/users/user-info`,  // 获得当前登录的用户信息
  users: `${ADMIN_PREFIX}/users`,  //获得所有用户信息
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/permissions`,
  sendAliyunSms: `${ADMIN_PREFIX}/aliyun-sms`, // 发送短信验证码
  login: `${ADMIN_PREFIX}/login`,
  roleInfo: `${ADMIN_PREFIX}/role`,
  roleAction: `${ADMIN_PREFIX}/role/:id`,
}
