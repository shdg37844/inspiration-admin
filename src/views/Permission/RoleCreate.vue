<script setup>
import {ref} from 'vue'
import roleService from '@/services/role.js';
//import roleService from '@/services/role.js';

const formState = ref({
  roleName: '',
});
const roleValue = ref([]);
const inspirationValue = ref([]);

async function createRole() {
    const roleName = formState.value.roleName

    try {
        const insertedRoleId = await roleService.createRole(roleName);
        const submitData = {
            id: insertedRoleId,
            roleValue: roleValue.value,
            inspirationValue: inspirationValue.value
        }
        await roleService.createRolePermissions(submitData);


    } catch(e) {
        console.error(e);
    }
}
</script>

<template>
    <div class="create-wrapper">
        <div class="content-box">
            <h3 class="section-title">角色信息</h3>
            <div class="section-content">
                <a-form :model="formState" name="basic" :label-col="{ span: 2 }"
                :wrapper-col="{ span: 6 }" autocomplete="off">
                    <a-form-item label="角色名称" name="roleName"
                    :rules="[{ required: true, message: '请输入角色名称!' }]">
                        <a-input v-model:value="formState.roleName" />
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div class="content-box">
            <h3 class="section-title">权限信息</h3>
            <div class="permission-section">
                <div class="permission-container">
                    <div class="permission-title">
                        <span>权限管理</span>
                    </div>
                    <a-checkbox-group v-model:value="roleValue" style="width: 100%" class="permission-body">
                        <a-row>
                            <a-col :span="8">
                                <a-checkbox value="A">角色-添加</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="B">角色-删除</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                              <a-checkbox value="C">角色-编辑</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                              <a-checkbox value="D">管理员-添加</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                              <a-checkbox value="E">管理员-删除</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                              <a-checkbox value="F">管理员-编辑</a-checkbox>
                            </a-col>                    
                        </a-row>
                    </a-checkbox-group>
                </div>    
                <div class="permission-container">
                    <div class="permission-title">
                        <span>灵感库管理</span>
                    </div>
                    <a-checkbox-group v-model:value="inspirationValue" style="width: 100%"  class="permission-body">
                        <a-row>
                            <a-col :span="8">
                                <a-checkbox value="A">类目-添加</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="B">类目-删除</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                              <a-checkbox value="C">类目-编辑</a-checkbox>
                            </a-col>      
                        </a-row>
                    </a-checkbox-group>
                </div> 
            </div>
        </div>
        <div class="create-btn-box">
            <a-button type="primary" @click="createRole">创建</a-button>
        </div>
    </div>

</template>

<style type="text/css" lang="less" scoped>
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

    .permission-section {
        display: flex;
        flex-direction: column;
        gap:15px;

        .permission-container {
            border:1px solid #f0f0f0;

            .permission-title {
                border-bottom:1px solid #f0f0f0;
                padding:15px;
                
                span {
                    font-size: 15px;
                    font-weight: 600;
                }
            }

            .permission-body {
                padding:18px;
            }
        }
    } 
    }

    .create-btn-box {
        display: flex;
        justify-content: flex-end;
        padding:45px;
    }
    
}
</style>