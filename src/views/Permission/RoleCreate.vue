<script setup>
import { ref } from 'vue'
import roleService from '@/services/role.js';
import permissionService from '@/services/permission.js';
import { useRouter } from 'vue-router';

const formState = ref({
    roleName: '',
});
const permissionData = ref([])
const selectedPermissionsByGroup = ref({})
const router = useRouter();

async function fetchPermission() {
    try {
        const response = await permissionService.getAllPermissions();
        permissionData.value = response.data.permissions;

    } catch (e) {
        console.error(e);
    }
}
fetchPermission()

async function createRole() {
    const roleName = formState.value.roleName
    const permissions = Object.values(selectedPermissionsByGroup.value).flat();

    try {
        const response = await roleService.createRole(roleName, permissions);

        if (response.error_code === 0) {
            alert("角色创建成功")
            router.push('/permission/role')
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
                <span class="title">角色信息</span>
                <span class="back-btn" @click="$router.push('/permission/role')">返回</span>
            </div>
            <div class="section-content">
                <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }"
                    autocomplete="off">
                    <a-form-item label="角色名称" name="roleName" :rules="[{ required: true, message: '请输入角色名称!' }]">
                        <a-input v-model:value="formState.roleName" />
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
            <a-button type="primary" @click="createRole">创建</a-button>
        </div>
    </div>

</template>

<style type="text/css" lang="less" scoped>
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