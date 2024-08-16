export default {
  height:'auto',
  calcHeight: 30,
  tip: false,
  searchShow: true,
  searchMenuSpan: 6,
  border: true,
  index: true,
  viewBtn: false,
  selection: true,
  addBtn: false,
  dialogClickModal: false,
  menuType: 'menu',
  labelWidth: 150,
  align: "center",
  column: [
    {
      label: "主键",
      prop: "id",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
    },
    {
      label: "排序",
      prop: "sort",
    },
    {
      label: "描述",
      prop: "label",
    },
    {
      label: "关键字",
      prop: "keyword",
    },
    {
      label: "修改日期",
      prop: "updateTime",
    },
    {
      label: "更新日期",
      prop: "createTime",
    },
    {
      label: "开关",
      prop: "open",
    },
  ]
}
