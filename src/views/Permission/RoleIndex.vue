<script setup>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    key: 'action',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
];
</script>

<template>
    <div>
        <a-button type="primary">创建角色</a-button>
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'action'">
                    <span>
                    <a>查看</a>
                    <a-divider type="vertical" />
                    <a>删除</a>
                    <a-divider type="vertical" />
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style lang="less" scoped>

</style>
