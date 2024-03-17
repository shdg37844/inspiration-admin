<script setup>
import {ref} from 'vue';
import roleService from '@/services/role.js';

const formState = ref({
  name: '',
  phone:null,
});
const options = ref([]);
const roleValue = ref(null);
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
async function fetchRoleInfo() {
  try {
    const roleResponse = await roleService.getRoleInfo();
    options.value = roleResponse.data.roles
    console.log(roleResponse)
    
  } catch(e) {
    console.error(e);
  }
}
fetchRoleInfo();

</script>

<template>
    <div class="create-wrapper">
        <div class="content-box">
          <h3 class="section-title">创建管理员</h3>
          <div class="section-content">
            <a-form :model="formState" name="basic" :label-col="{ span: 2 }"
            :wrapper-col="{ span: 6 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="昵称" name="name"
                :rules="[{ required: true, message: '请输入昵称!' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="手机号" name="phone"
                :rules="[{ required: true, message: '请输入手机号!' }]">
                    <a-input v-model:value="formState.phone" />
                </a-form-item>
              </a-form>


              <el-select
                v-model="roleValue"
                placeholder="请选择角色"
                size="large"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
  

          </div>
        </div>
        <div class="create-btn-box">
          <a-button type="primary">创建</a-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.create-wrapper {
    margin:5px;
    padding:10px;
    height:100%;
    width:100%;
    background-color: #fff;

    .content-box {
       .section-title {
            font-weight: 600;
        }
    }
    .create-btn-box {
        display: flex;
        justify-content: flex-end;
        padding:45px;
    }

    
}

</style>