/**
 * 系统角色
 */
export type SysRoleRequest = {
  /**
   * id
   */
  id?: number;
  /**
   * 角色标识
   */
  roleCode?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 部门ID
   */
  deptId?: string;
  /**
   * 排序
   */
  sort?: number;
};
