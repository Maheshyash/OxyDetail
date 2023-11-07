export interface loginDetails {
  statusCode: number;
  message: string;
  token?: string;
  userDetails?: UserDetails;
  menu?: Menu[];
}

export interface UserDetails {
  userId: number;
  loginId: string;
  name: any;
  mobileNo: string;
  emailId: string;
  password: string;
  passwordSalt: string;
  orgCode: string;
  isActive: boolean;
  timeZoneId: any;
  roleId: number;
  roleName: any;
  categoryId: any;
  categoryName: any;
}

export interface Menu {
  menuId: number;
  roleId: number;
  haveAccess: boolean;
  menuName: string;
  menuOrder: number;
  menuUrl: string;
  menuIcon: string;
  isActive: boolean;
  subMenus: SubMenu[];
}

export interface SubMenu {
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
