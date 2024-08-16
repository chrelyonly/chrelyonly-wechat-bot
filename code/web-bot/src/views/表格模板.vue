<script setup>
//引入对象
import option from "@/option/template.js";
// 引入环境
import {inject, ref} from 'vue';
// 调用全局方法
const $https = inject("$https");
//  ******************************************声明变量sta*************************************************
// 表单对象
const form = ref({});
// 列表对象
const data = ref([]);
// 动画
const loading = ref(false);
// 当前选择的对象list
const selectionList = ref([]);
// 组件实例
const crudRef = ref(null);
// 分页对象
const page = ref({
  // 每页大小
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 列表总数
  total: 0
});
//  ******************************************声明变量end*************************************************
// 加载数据方法
const onLoad = (pages, params = {})=>{
  params.current = pages.value?.currentPage;
  params.size = pages.value?.pageSize;
  loading.value = true;
  $https("/api/storeUser/list","get",params,1,{}).then(res=>{
    const records = res.data.data;
    page.value.total = records.total;
    data.value = records.records;
    loading.value = false;
    selectionClear();
  })
}
// 搜索区重置事件
const searchReset = ()=> {
  onLoad(page);
}
// 搜索区提交事件
const searchChange  = (params, done)=> {
  page.value.currentPage = 1;
  onLoad(page, params);
  done();
}
// 列表数据选中事件
const selectionChange=(list) =>{
  selectionList.value = list;
}
// 列表数据清空事件
const selectionClear = ()=>{
  selectionList.value = [];
  crudRef.value.toggleSelection();
}
// 分页改变事件
const currentChange = (currentPage) =>{
  page.value.currentPage = currentPage;
}
// 分页数量改变事件
const sizeChange = (pageSize) => {
  page.value.pageSize = pageSize;
}
// 刷新事件
const refreshChange = () => {
  onLoad(page);
}
</script>

<template>
    <avue-crud ref="crudRef"
               v-model:page="page"
               v-model="form"
               :option="option"
               :table-loading="loading"
               :data="data"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
    >
    </avue-crud>
</template>

<style scoped>

</style>