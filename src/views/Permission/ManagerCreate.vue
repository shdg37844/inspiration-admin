<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import roleService from '@/services/role.js';
import userService from '@/services/user.js';


const router = useRouter();
const options = ref([]);
const roleValue = ref([]);
const formState = ref({
  name: '',
  phone: null,
});
async function fetchRoleInfo() {
  try {
    const roleResponse = await roleService.getRoleInfo();
    options.value = roleResponse.data.roles

  } catch (e) {
    console.error(e);
  }
}
fetchRoleInfo();

async function handleCreateUser() {
  const name = formState.value.name
  const phone = formState.value.phone
  const roles = roleValue.value

  try {
    const userInfoResponse = await userService.addUserRoles(name, phone, roles)
    if (userInfoResponse.error_code === 0) {
      alert("创建成功")
      router.push('/permission/manager')
    } else {
      console.log(userInfoResponse.message)
    }
  } catch (e) {
    console.error(e);
  }
}

</script>

<template>
  <div class="create-wrapper">
    <div class="content-box">
      <div class="section-title">
        <span class="title">创建管理员</span>
        <span class="back-btn" @click="$router.push('/permission/manager')">返回</span>
      </div>
      <div class="section-content">
        <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }" autocomplete="off">
          <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号!' }]">
            <a-input v-model:value="formState.phone" />
          </a-form-item>
        </a-form>
        <el-form-item class="select-box" label="角色">
          <el-select v-model="roleValue" multiple placeholder="请选择角色" style="width: 240px">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </div>
    <div class="create-btn-box">
      <a-button @click="handleCreateUser()" type="primary">创建</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.create-wrapper {
  margin: 5px;
  padding: 10px;
  height: 100%;
  width: 100%;
  background-color: #fff;

  .content-box {
    .section-title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 30PX;
      padding-right: 45px;

      .title {
        font-size: 20px;
        font-weight: 600;
      }

      .back-btn {
        font-size: 18px;
      }

      .back-btn:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .section-content {
      .select-box {
        margin-left: 80px;
      }
    }
  }

  .create-btn-box {
    display: flex;
    justify-content: flex-end;
    padding: 45px;
  }

}
</style>