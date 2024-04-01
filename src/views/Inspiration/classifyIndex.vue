<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import classifyService from '@/services/classify.js';

const router = useRouter();
const data = ref([]);
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '类目名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '分类',
        dataIndex: 'parentName',
        key: 'parentName',
    },
    {
        title: '操作',
        key: 'action',
    },
];

async function fetchClassifyInfo() {
    try {
        const response = await classifyService.getAllClassify();
        data.value = response.data.classify

    } catch (e) {
        console.error(e);
    }
}
fetchClassifyInfo();

async function deleteClassify(selectedId) {
    const isConfirmed = confirm("确认删除该类目？");

    if (!isConfirmed) {
        return;
    }

    let id = selectedId;
    try {
        const response = await classifyService.deleteClassify(id);
        if (response.code === 200) {
            const index = data.value.findIndex(item => item.id === id)
            data.value.splice(index, 1)
        }
    } catch (e) {
        console.error(e);
    }
}


</script>

<template>
    <div class="body-container">
        <div class="body-header">
            <a-button type="primary" class="addClassify-btn"
                @click="$router.push('/inspiration/classify/create')">创建类目</a-button>
        </div>
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <span>
                        <a @click="deleteClassify(record.id)">删除</a>
                        <a-divider type="vertical" />
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style lang="less" scoped>
.body-header {
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
    padding-right: 20px;
    margin-bottom: 15px;
}
</style>