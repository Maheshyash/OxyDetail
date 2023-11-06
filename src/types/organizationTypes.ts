export type organizationListArray = Array<orgalizationListItem> | [];

export interface orgalizationListItem {
  orgId: number;
  orgCode: string;
  orgName: string;
  planId: number;
  activationDate: string;
  nextRenewalDate: string;
  expiryDate: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  stateName: string;
  address: string;
  numberOfUser: number;
  gstnNo: string;
  contactNo: string;
  emailId: string;
  pocName: string;
  pocContactNo: string;
  pocEmailId: string;
  isActive: boolean;
  forceUpdateIfExists: boolean;
}

export type countryListArray = Array<countryListItem> | [];

export interface countryListItem {
  countryCode: string;
  countryName: string;
}

export type stateListArray = Array<stateListItem> | [];

export interface stateListItem {
  stateCode: string;
  stateName: string;
}

// export interface organizationSettings {
//   orgSettingId: number;
//   orgCode: string;
//   language: string;
//   timeZone: string;
//   currency: string;
//   dateFormat: string;
//   logo: string;
//   pocName: string;
//   pocContactNo: string;
//   pocEmailId: string;
//   designation: string;
//   isActive: boolean;
// }
export interface organizationSettings {
  orgSettingId: number
  orgCode: string
  languageId: number
  languageName: string
  timeZone: string
  currencyId: number
  currencyName: string
  dateFormat: string
  logo: string
  pocName: string
  pocContactNo: string
  pocEmailId: string
  designation: string
  isActive: boolean
}

export type plansListArray = Array<planItem> | [];

export interface planItem {
  planId: number;
  planName: string;
}


export type languageArrayType = Array<languageItemType>| []

export interface languageItemType {
  languageId: number
  languageName: string
}

export type currencyArrayType = Array<currencyItemType>| []

export interface currencyItemType {
  currencyId: number
  currencyName: string
}
