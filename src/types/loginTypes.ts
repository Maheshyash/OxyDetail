export interface loginDetails {
  statusCode: number;
  message: string;
  token?: string;
  userDetails?: UserDetails;
}

export interface UserDetails {
  userId: number;
  loginId: string;
  name: any;
  mobileNo: string;
  type: any;
  emailId: string;
  password: string;
  passwordSalt: string;
  photo: any;
  orgId: string;
  isActive: boolean;
  timeZoneId: any;
  roleId: number;
}
