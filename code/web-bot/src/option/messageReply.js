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
    {
      label: "关键字",
      prop: "keyword",
      editDisplay: false,
      rules: [
        {
          required: true,
          message: '请输入关键字',
          trigger: 'blur',
        },
      ],
    },
    {
      label: "描述",
      prop: "label",
      rules: [
        {
          required: true,
          message: '请输入描述',
          trigger: 'blur',
        },
      ],
    },
    {
      label: "排序",
      prop: "sort",
      value: 30,
      type: "number",
      rules: [
        {
          required: true,
          message: '请输入排序',
          trigger: 'blur',
        },
      ],
    },
    {
      label: "修改日期",
      prop: "updateTime",
      display: false,
    },
    {
      label: "更新日期",
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
