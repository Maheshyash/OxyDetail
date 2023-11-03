export type roleListArray = Array<roleListItem> | []

export interface roleListItem {
  roleId: number
  roleName: string
  isActive: boolean
}