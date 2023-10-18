export type ProductDetails = Array<ProductItem> | []
export interface ProductItem {
    productCode: string
    productName: string
    productDiscription: any
    categoryId: number
    subCategoryId: number
    isNewProduct: boolean
    isFocusedProduct: boolean
    isActive: boolean
    activationDate: string
  }