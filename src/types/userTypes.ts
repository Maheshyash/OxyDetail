export interface usersListArray {
  data: userListItem[];
}

export type usersListItemArray = Array<userListItem> | [];

export interface userListItem {
  userId: number;
  loginId: string;
  name: string;
  mobileNo: string;
  emailId: string;
  password: string | null;
  passwordSalt: string | null;
  orgCode: string;
  isActive: boolean;
  timeZoneId: string;
  roleId: number;
  categoryId: number;
  categoryName: string;
}
