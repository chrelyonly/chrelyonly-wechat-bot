<script setup>
//引入对象
import option from "@/option/messageKeywordsResponse.js";
// 引入环境
import {inject, ref} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
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
  total: 10
});
// 弹出标题
const title = ref("");
// 弹出开关
const drawer = ref(false);
// 父级数据
const parentData = ref(false);
//  ******************************************声明变量end*************************************************
// 加载数据方法
const onLoad = (pages, params = {})=>{
  if(!parentData.value?.id){
    return;
  }
  params.current = pages.value?.currentPage ?? 1;
  params.size = pages.value?.pageSize ?? 10;
  params.parentId = parentData.value?.id;
  loading.value = true;
  $https("/bot-api/messageKeywordsResponse/list","get",params,1,{}).then(res=>{
    const records = res.data.data;
    // page.value.total = records.total;
    data.value = records;
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
// 新增事件
const rowSave = (row, done, loading) => {
  submit(row, done, loading)
}
// 删除事件
const rowDel = (row, done, loading) => {
  ElMessageBox.prompt('确认你的密码', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '关闭',
    inputErrorMessage: '不告诉你',
  })
      .then(({ value }) => {
        $https("/bot-api/messageKeywordsResponse/remove","post",row,2,{}).then((res) => {
          onLoad(page);
          ElMessage({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      })
}
// 修改事件
const rowUpdate = (row,index, done, loading) => {
  submit(row, done, loading)
}
// 统一事件
const submit = (row, done, loading)=>{
  row.parentId = parentData.value?.id
  $https("/bot-api/messageKeywordsResponse/submit","post",row,2,{}).then((res) => {
    if(res.data.code === 200){
      ElMessage({
        type: "success",
        message: res.data.msg
      });
    }else{
      ElMessage({
        type: "error",
        message: res.data.msg
      });
    }
    onLoad(page);
    done();
  }, error => {
    loading();
    window.console.log(error);
  });
}

// 状态改变
const openChange = (row) => {
  if(!row.id){
    return;
  }
  submit(row);
}

// 点击发送测试
const debugFunc = (row) => {
  loading.value = true;
  $https("/bot-api/messageKeywordsResponse/debug","post",row,2,{}).then((res) => {
    if(res.data.code === 200){
      ElMessage({
        type: "success",
        message: res.data.msg
      });
    }
  }).then(()=>{
    loading.value = false;
  })
}


// 父级事件
const init = (row) => {
  parentData.value = row;
  data.value = [];
  drawer.value = true;
  onLoad(page);
}

defineExpose({
  init
})
</script>

<template>
  <el-drawer
      v-model="drawer"
      :title="title"
      size="80%"
  >
    <avue-crud ref="crudRef"
               v-model:page="page"
               v-model="form"
               :option="option"
               :table-loading="loading"
               :data="data"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
    >
      <template #menu="scope">
<!--        <el-button type="text" @click="debugFunc(scope.row)">-->
<!--          调用一次-->
<!--        </el-button>-->
      </template>
      <template #open="{ row }">
        <el-switch
            v-model="row.open"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="启用"
            active-value="1"
            inactive-value="0"
            inactive-text="停用"
            @change="openChange(row)"
        />
      </template>
    </avue-crud>
  </el-drawer>
</template>

<style scoped>

</style>