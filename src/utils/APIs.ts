import axios, { AxiosError, AxiosResponse } from 'axios';
import { loginDetails } from '../types/loginTypes';
import { OxyDetailInstaceWithToken, oxyDetailInstance } from './NetworkInstance';
import {
  ProductDetails,
  categoryListArray,
  deleteProductResponse,
  subCategoryListTypeArray
} from '../types/productTypes';
import { AttributeURLs, ProductURLs, mrURLs } from '../Constants';
import { AttributeList, deleteAttributeAction, insertUpdateAtrributeResponse } from '../types/attributeTypes';
import { toaster } from '../components/Toaster/Toaster';

export const fetchToken = (payload: { emailId: string; password: string }): Promise<loginDetails> => {
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise<loginDetails>((resolve, reject) => {
    oxyDetailInstance
      .post('Token', payload, headers)
      .then((response: AxiosResponse<loginDetails>) => {
        // Handle the successful response here
        const responseData = response.data;
        console.log('Response data:', responseData);
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        // Handle errors here
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
          toaster('error', error.response?.data?.message);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const fetchMrList = (): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(mrURLs.MRLIST)
      .then((response: AxiosResponse<any>) => {
        // Handle the successful response here
        const responseData = response.data;
        console.log('Response data:', responseData);
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        // Handle errors here
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const fetchProductList = (payload?: {
  ProductCode?: string;
  CategoryId?: number;
  SubCategoryId?: number;
}): Promise<ProductDetails> => {
  return new Promise<ProductDetails>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(ProductURLs.PRODUCTLIST, {
      params: {
        ProductCode: payload?.ProductCode,
        CategoryId: payload?.CategoryId,
        SubCategoryId: payload?.SubCategoryId
      }
    })
      .then((response: AxiosResponse<ProductDetails>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const deleteProductItem = (ProductCode?: { ProductCode: string }): Promise<deleteProductResponse> => {
  return new Promise<deleteProductResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.delete(ProductURLs.DELETEPRODUCTITEM, { params: { ProductCode: ProductCode } })
      .then((response: AxiosResponse<deleteProductResponse>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchCategoryList = (): Promise<categoryListArray> => {
  return new Promise<categoryListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(ProductURLs.CATEGORYLIST)
      .then((response: AxiosResponse<categoryListArray>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const insertOrUpdateProductDetail = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(ProductURLs.INSERTORUPDATE, payload)
      .then((response: AxiosResponse<insertUpdateAtrributeResponse>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchSubCategoryList = (categoryId: number | null): Promise<subCategoryListTypeArray> => {
  return new Promise<subCategoryListTypeArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(ProductURLs.SUBCATEGORYLIST, { params: { CategoryId: categoryId } })
      .then((response: AxiosResponse<subCategoryListTypeArray>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const insertOrUpdateAttributes = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(AttributeURLs.INSERTORUPDATE, payload, headers)
      .then((response: AxiosResponse<insertUpdateAtrributeResponse>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchAttributeList = (AttributeId?: number | null): Promise<AttributeList> => {
  return new Promise<AttributeList>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(AttributeURLs.GETATTRIBUTELIST, { params: { AttributeId: AttributeId } })
      .then((response: AxiosResponse<AttributeList>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const deleteAttributeItem = (AttributeId?: number | null): Promise<deleteAttributeAction> => {
  return new Promise<deleteAttributeAction>((resolve, reject) => {
    OxyDetailInstaceWithToken.delete(AttributeURLs.DELETEATTRIBUTE, { params: { AttributeId: AttributeId } })
      .then((response: AxiosResponse<deleteAttributeAction>) => {
        // Handle the successful response here
        const responseData = response.data;
        resolve(responseData);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error (e.g., network error)
          console.error('Axios error:', error);
        } else {
          // Non-Axios error (e.g., JSON parsing error)
          console.error('Non-Axios error:', error);
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
