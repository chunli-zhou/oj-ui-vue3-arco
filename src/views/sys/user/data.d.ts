import type {TableColumnData} from "@arco-design/web-vue";

const columns: TableColumnData[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
    slotName: 'Username'
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    slotName: 'Avatar'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
    slotName: 'Gender'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roles',
    align: 'center',
    slotName: 'Roles'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    slotName: 'Status'
  },
  {
    title: '是否在线',
    dataIndex: 'online',
    align: 'center',
    slotName: 'Online'
  },
  {
    slotName: 'Controls',
    title: '操作',
    fixed: 'right',
    align: 'center'
  }
];
export default columns;
