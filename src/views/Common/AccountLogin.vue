<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
//import { useStore } from '@/stores/index.js'; 
import loginService from '@/services/login';
import Cookies from 'js-cookie';
const router = useRouter();

const smsRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '目前只支持中国大陆的手机号码',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const formData = ref({
  code: null,
  phone: null,
  checked: false
})

const smsText = ref('发送验证码')
const smsDisabled = ref(false)

async function handleSmsCode() {
  if (smsDisabled.value) return;

  const phoneNumber = formData.value.phone

  const phonePattern = /^1[3456789]\d{9}$/;
  if (!phonePattern.test(phoneNumber)) {
    alert('请输入中国大陆的手机号码！');
    return
  } else if (!phoneNumber) {
    alert('手机号码不能为空！');
    return
  }

  try{
    await loginService.sendSms(phoneNumber)
    startCountdown();
  } catch(e) {
    console.error('发送验证码错误:', e);
  }
}

//验证码倒计时
function startCountdown() {
  let seconds = 60;
  smsDisabled.value = true;

  const interval = setInterval(() => {
    seconds --;
    smsText.value = `${seconds}秒后重新获取`
    if (seconds <= 0) {
      clearInterval(interval);
      smsText.value = '发送验证码';
      smsDisabled.value = false;
    }
  }, 1000)
}

async function handleSubmit() {
  const phone = formData.value.phone;
  const code = formData.value.code;
  const TOKEN_KEY = 'web_token';
  try {
    const response = await loginService.login(phone, code);

    if (response.code === 1) {
      alert('登录成功');
      let token = response.data.token;
      Cookies.set(TOKEN_KEY, token, { expires: 1 });  // 将token保存到cookies中，有效期为1天
      localStorage.setItem(TOKEN_KEY, token); // 保存Token到localStorage，页面刷新后也能从本地存储中恢复Token和权限信息，保持用户的登录状态和访问权限。

      router.replace({ name: 'Home'});
    } else {
      alert(response.message || '登录失败');
    }
  } catch (error) {
    console.error('请求失败:', error);
    alert('请求失败: ' + error.message);
  }
}

</script>

<template>
  <div class="login-page">
    <div class="company-container">
      <img class="company-info-logo" src="@/assets/images/header-logo.svg" />
      <div class="company-info-desc">小具影响力的 Web 设计规范</div>
    </div>
    <div class="form-container">
      <div class="login-form-phone">
        <el-form :model="formData" :rules="smsRules">
          <el-form-item prop="phone">
            <el-input
              type="number"
              placeholder="请输手机号"
              v-model="formData.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="14">
              <el-input
                type="text"
                placeholder="请输入验证码"
                v-model="formData.code"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="5">
              <el-button :smsDisabled="smsDisabled" @click="handleSmsCode">{{ smsText }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="formData.checked">自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="handleSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 160px;
  box-sizing: border-box;
}
.company-container {
  text-align: center;
  .company-info-logo {
    height: 44px;
  }
  .company-info-desc {
    margin-top: 12px;
    font-size: 14px;
    opacity: 0.5;
    text-align: center;
  }
}
.form-container {
  text-align: center;
  max-width: 388px;
  margin: 40px auto;
}
</style>
