<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import BasicLayoutHeader from './BasicLayoutHeader.vue'
import BasicLayoutSider from './BasicLayoutSider.vue'

const route = useRoute()

const breadcrumb = computed(() => route.matched.filter((data) => data.meta.breadcrumb))
</script>

<template>
  <div class="page-wrapper">
    <BasicLayoutSider class="page-sider" />
    <div class="page-mainer">
      <BasicLayoutHeader class="page-header" />
      <div class="breadcrumb-container">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="step in breadcrumb" :key="step.path">
            <router-link :to="step.meta.breadcrumb.path">
              {{ step.meta.breadcrumb.name }}
            </router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="page-body">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-wrapper {
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  .page-body {
    flex: 1;
    margin:8px;
    //padding: 8px;
    height: 1px;
    background-color: #fff;
  }
  .breadcrumb-container {
    flex: none;
    width: 100%;
    padding: 15px 15px 7px 15px;
  }
  .page-header {
    flex: none;
  }
}
</style>
