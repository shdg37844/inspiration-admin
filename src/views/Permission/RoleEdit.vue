<script setup>
import { ref } from 'vue'
import roleService from '@/services/role.js';
import permissionService from '@/services/permission.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const formState = ref([]);
const permissionData = ref([])
const selectedPermissionsByGroup = ref({})

async function fetchAllPermission() {
    try {
        const response = await permissionService.getAllPermissions();
        permissionData.value = response.data.permissions;

    } catch (e) {
        console.error(e);
    }
}
fetchAllPermission()

async function fectchCurrentRoleInfo() {
    const id = route.params.id
    try {
        const roleResponse = await roleService.getCurrentRole(id);
        const role = roleResponse.data.role;
        formState.value = role;

        const permissionResponse = await permissionService.getCurrentRolePermissions(id);
        const permissions = permissionResponse.data.permissions
        

    } catch (e) {
        console.error(e);
    }
}
fectchCurrentRoleInfo()



</script>

<template>
    <div class="create-wrapper">
        <div class="content-box">
            <h3 class="section-title">角色信息</h3>
            <div class="section-content">
                <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }"
                    autocomplete="off">
                    <a-form-item label="角色名称" name="roleName" :rules="[{ required: true, message: '请输入角色名称!' }]">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div class="content-box">
            <h3 class="section-title">权限信息</h3>
            <div class="permission-section">
                <div class="permission-container" v-for="group in permissionData" :key="group.id">
                    <div class="permission-title">
                        <span>{{ group.name }}</span>
                    </div>
                    <a-checkbox-group v-model:value="selectedPermissionsByGroup[group.id]" style="width: 100%"
                        class="permission-body">
                        <a-row>
                            <a-col :span="8" v-for="child in group.children" :key="child.id">
                                <a-checkbox :value="child.id">{{ child.name }}</a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
                </div>
            </div>
        </div>
        <div class="create-btn-box">
            <a-button type="primary">保存</a-button>
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
            font-weight: 600;
        }

        .permission-section {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .permission-container {
                border: 1px solid #f0f0f0;

                .permission-title {
                    border-bottom: 1px solid #f0f0f0;
                    padding: 15px;

                    span {
                        font-size: 15px;
                        font-weight: 600;
                    }
                }

                .permission-body {
                    padding: 18px;
                }
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