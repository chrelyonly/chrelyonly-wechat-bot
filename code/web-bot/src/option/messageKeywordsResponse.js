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
  addBtn: true,
  dialogClickModal: false,
  menuType: 'menu',
  labelWidth: 150,
  align: "center",
  column: [
    {
      label: "主键",
      prop: "id",
      type: "input",
      hide: true,
      display: false,
    },
    // {
    //   label: "权重",
    //   prop: "level",
    // },
    {
      label: "父级id",
      prop: "parentId",
      display: false,
      hide: true
    },
    {
      label: "回复内容",
      prop: "content",
    },
    // {
    //   label: "排序",
    //   prop: "sort",
    //   value: 30,
    //   type: "number",
    //   rules: [
    //     {
    //       required: true,
    //       message: '请输入排序',
    //       trigger: 'blur',
    //     },
    //   ],
    // },
    {
      label: "修改日期",
      prop: "updateTime",
      display: false,
    },
    {
      label: "创建日期",
      prop: "createTime",
      display: false,
    },
    {
      label: "开关",
      prop: "open",
      display: false,
    },
  ]
}
