<script setup>
//引入对象
import option from "@/option/messageReply.js";
// 引入环境
import {inject, ref} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import MessageKeywordsResponseDialog from "@/views/messageReply/component/messageKeywordsResponseDialog.vue";
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
// 组件实例
const messageKeywordsResponseDialogRef = ref(null);
// 分页对象
const page = ref({
  // 每页大小
  pageSize: 10,
  // 当前页码
  currentPage: 1,
  // 列表总数
  total: 10
});
//  ******************************************声明变量end*************************************************
// 加载数据方法
const onLoad = (pages, params = {})=>{
  params.current = pages?.currentPage;
  params.size = pages?.pageSize;
  loading.value = true;
  debugger
  $https("/bot-api/messageKeywords/list","get",params,1,{}).then(res=>{
    data.value = [];
    const records = res.data.data;
    page.value.total = records.count;
    data.value = records.data;
    loading.value = false;
    selectionClear();
  })
}
// 搜索区重置事件
const searchReset = ()=> {
  onLoad(page.value);
}
// 搜索区提交事件
const searchChange  = (params, done)=> {
  page.value.currentPage = 1;
  onLoad(page.value, params);
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
  onLoad(page.value);
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
        $https("/bot-api/messageKeywords/remove","post",row,2,{}).then((res) => {
          onLoad(page.value);
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
  $https("/bot-api/messageKeywords/submit","post",row,2,{}).then((res) => {
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
    onLoad(page.value);
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
  $https("/bot-api/messageKeywords/debug","post",row,2,{}).then((res) => {
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
const viewMessageKeywordsResponse = (row)=>{
  messageKeywordsResponseDialogRef.value.init(row)
}
</script>

<template>
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
               @on-load="onLoad"
    >
      <template #menu="scope">
<!--        <el-button type="text" @click="debugFunc(scope.row)">-->
<!--          调用一次-->
<!--        </el-button>-->
        <el-button type="text" @click="viewMessageKeywordsResponse(scope.row)">
          管理内容
        </el-button>
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
  <messageKeywordsResponseDialog ref="messageKeywordsResponseDialogRef"></messageKeywordsResponseDialog>
</template>

<style scoped>

</style>
