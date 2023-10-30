export const mrURLs = {
  MRLIST: 'User/MRList'
};
export const ProductURLs = {
  PRODUCTLIST: 'Product/Product_GetList',
  CATEGORYLIST: 'Product/Product_GetCategoryList',
  SUBCATEGORYLIST: 'Product/Product_GetSubCategoryList',
  DELETEPRODUCTITEM: 'Product/Product_Delete',
  INSERTORUPDATE: 'Product/Product_InsertUpdate',
  MEDIAPUSH:'Product/ProductAttributeMedia_InsertUpdate'
};

export const AttributeURLs = {
  INSERTORUPDATE: 'Attribute/Attribute_InsertUpdate',
  GETATTRIBUTELIST: 'Attribute/Attribute_GetList',
  DELETEATTRIBUTE: 'Attribute/Attribute_Delete'
};

export const MB = 1048576;

export const FileSize = {
  IMAGEFILESIZE: 1*MB,
  AUDIOFILESIZE: 2*MB
}
export const IdealTiming ={
  IDEALTIME : 20*60000,// 20 is mins
  AUTOSIGNOFF:1*60000// 1 is mins
}