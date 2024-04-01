<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import classifyService from '@/services/classify.js';

const router = useRouter();
const options = ref([]);
const classifyValue = ref([]);
const formState = ref({
    name: '',
});

async function fetchParentClassifyOptions() {
    try {
        const response = await classifyService.getParentClassify()
        options.value = response.data.ParentClassify
    } catch (e) {
        console.error(e);
    }
}
fetchParentClassifyOptions();

async function handleCreateClassify() {
    const name = formState.value.name
    const parent_id = classifyValue.value

    try {
        const response = await classifyService.createClassify(name, parent_id);
        if (response.code === 200) {
            alert("类目创建成功")
            router.push('/inspiration/classify')
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
                <span class="title">创建类目</span>
                <span class="back-btn" @click="$router.push('/inspiration/classify')">返回</span>
            </div>
            <div class="section-content">
                <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }"
                    autocomplete="off">
                    <a-form-item label="类目名称" name="name" :rules="[{ required: true, message: '请输入类目!' }]">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                </a-form>
                <el-form-item class="select-box" label="分类">
                    <el-select v-model="classifyValue" placeholder="请选择分类" style="width: 240px">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="create-btn-box">
            <a-button @click="handleCreateClassify()" type="primary">创建</a-button>
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
                margin-left: 70px;
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