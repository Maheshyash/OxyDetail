export type ProductDetails = Array<ProductItem> | [];
export interface ProductItem {
  productCode: string;
  productName: string;
  productDiscription: string | null;
  categoryId: number;
  subCategoryId: number;
  isNewProduct: boolean;
  isFocusedProduct: boolean;
  isActive: boolean;
  activationDate: string;
}

export interface deleteProductResponse {
  statusCode: number;
  statusMessage: string;
}

export type categoryListArray = Array<categoryListType> | [];
export interface categoryListType {
  categoryId: number;
  categoryName: string;
  createdBy?: string;
  createdOn?: string;
}
export type subCategoryListTypeArray = Array<subCategoryListType> | [];
export interface subCategoryListType {
  subCategoryId: number;
  subCategoryName: string;
  createdBy?: string;
  createdOn?: string;
}
