export type organizationListArray = Array<orgalizationListItem> | []

export interface orgalizationListItem {
  orgId: number
  orgCode: string
  orgName: string
  planId: number
  activationDate: string
  nextRenewalDate: string
  expiryDate: string
  countryCode: string
  countryName: string
  stateCode: string
  stateName: string
  address: string
  numberOfUser: number
  gstnNo: string
  contactNo: string
  emailId: string
  pocName: string
  pocContactNo: string
  pocEmailId: string
  isActive: boolean
  forceUpdateIfExists: boolean
}


export type countryListArray = Array<countryListItem> |[]

export interface countryListItem {
  countryCode: string
  countryName: string
}

export type stateListArray = Array<stateListItem> | []

export interface stateListItem {
  stateCode: string
  stateName: string
}