export type roleListArray = Array<roleListItem> | [];

export interface roleListItem {
  roleId: number;
  roleName: string;
  isActive: boolean;
}

export type roleMenuArrayType = roleMenuItemType[] | [];

export interface roleMenuItemType {
  menuId: number;
  roleId: number;
  haveAccess: boolean;
  menuName: string;
  menuOrder: number;
  menuUrl: string;
  menuIcon: string;
  isActive: boolean;
  subMenus: subItemType[] | [];
}

export interface subItemType {
  subMenuId: number;
  parentMenuId: number;
  roleId: number;
  haveAccess: boolean;
  subMenuName: string;
  subMenuOrder: number;
  subMenuUrl: string;
  subMenuIcon: string;
  isActive: boolean;
}
