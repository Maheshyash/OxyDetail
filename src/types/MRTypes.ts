export interface MRListArray {
  data: MRListItem[];
}

export type MRListItemArray = Array<MRListItem> | [];

export interface MRListItem {
  userId: number;
  loginId: string;
  name: string;
  mobileNo: string;
  emailId: string;
  password: any;
  passwordSalt: any;
  orgCode: string;
  isActive: boolean;
  timeZoneId: string;
  roleId: number;
  categoryId: number;
  categoryName: string;
}
