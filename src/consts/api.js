const PREFIX = `${import.meta.env.VITE_APP_HOST}`
const WEB_PREFIX = `${PREFIX}/web`
const ADMIN_PREFIX = `${PREFIX}/admin`

export default {
  userInfo: `${ADMIN_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/permissions`,
  sendAliyunSms: `${ADMIN_PREFIX}/aliyun-sms`, // 发送短信验证码
  login: `${ADMIN_PREFIX}/login`,
  roleInfo: `${ADMIN_PREFIX}/role`
}
