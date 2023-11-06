import axios, { AxiosError, AxiosResponse } from 'axios';
import { loginDetails } from '../types/loginTypes';
import { OxyDetailInstaceWithToken, oxyDetailInstance } from './NetworkInstance';
import {
  ProductDetails,
  categoryListArray,
  deleteProductResponse,
  subCategoryListTypeArray
} from '../types/productTypes';
import { AttributeURLs, OrganizationURLs, ProductURLs, mrURLs, roleURLs } from './APIUrls';
import { AttributeList, deleteAttributeAction, insertUpdateAtrributeResponse } from '../types/attributeTypes';
import { toaster } from '../components/Toaster/Toaster';
import { clearAllCookies } from './common';
import {
  countryListArray,
  currencyArrayType,
  languageArrayType,
  organizationListArray,
  organizationSettings,
  plansListArray,
  stateListArray
} from '../types/organizationTypes';
import { usersListArray } from '../types/userTypes';
import { roleListArray, roleMenuArrayType } from '../types/roleTypes';

const multiFormHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const fetchUsersList = (): Promise<usersListArray> => {
  return new Promise<usersListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(mrURLs.MRLIST)
      .then((response: AxiosResponse<usersListArray>) => {
        // Handle the successful response here
        const responseData = response.data;
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const insertOrUpdateDataMapping = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(ProductURLs.MEDIAPUSH, payload, headers)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const insertOrUpdateUser = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(mrURLs.USERINSERTUPDATE, payload)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchOrganizationList = (): Promise<organizationListArray> => {
  return new Promise<organizationListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.ORGANIZATIONGETLIST)
      .then((response: AxiosResponse<organizationListArray>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchStateListDetails = (countryCode: string): Promise<stateListArray> => {
  return new Promise<stateListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.STATELIST, { params: { countryCode: countryCode } })
      .then((response: AxiosResponse<stateListArray>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchCoutryListDetails = (): Promise<countryListArray> => {
  return new Promise<countryListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.COUNTRYLIST)
      .then((response: AxiosResponse<countryListArray>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchLanguageList = (): Promise<languageArrayType> => {
  return new Promise<languageArrayType>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.LANGUAGELIST)
      .then((response: AxiosResponse<languageArrayType>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
export const fetchCurrencyList = (): Promise<currencyArrayType> => {
  return new Promise<currencyArrayType>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.CURRENCYLIST)
      .then((response: AxiosResponse<currencyArrayType>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchPlansList = (): Promise<plansListArray> => {
  return new Promise<plansListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.PLANSLIST)
      .then((response: AxiosResponse<plansListArray>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const insertOrUpdateOrganization = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(OrganizationURLs.ORGNIZATIONINSERTUPDATE, payload)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchRoleList = (RoleId?: string): Promise<roleListArray> => {
  return new Promise<roleListArray>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(roleURLs.ROLEGETLIST, { params: { RoleId: RoleId } })
      .then((response: AxiosResponse<roleListArray>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchOrganizationSettings = (): Promise<organizationSettings> => {
  return new Promise<organizationSettings>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(OrganizationURLs.ORGANIZATIONSETTINGLIST)
      .then((response: AxiosResponse<organizationSettings>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const insertOrUpdateRole = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(roleURLs.ROLEINSERTUPDATE, payload)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const updateSettings = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(OrganizationURLs.ORGANIZATIONSETTINGINSERTUPDATE, payload, multiFormHeaders)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const fetchMenuList = (RoleId?: number | null): Promise<roleMenuArrayType> => {
  return new Promise<roleMenuArrayType>((resolve, reject) => {
    OxyDetailInstaceWithToken.get(roleURLs.ROLEMENULIST, { params: { RoleId: RoleId } })
      .then((response: AxiosResponse<roleMenuArrayType>) => {
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};

export const updateRoleMapping = (payload: any): Promise<insertUpdateAtrributeResponse> => {
  return new Promise<insertUpdateAtrributeResponse>((resolve, reject) => {
    OxyDetailInstaceWithToken.post(roleURLs.ROLEMENUMAPPING + `?RoleId=${payload.RoleId}&MenuIds=${payload.MenuIds}`)
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
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
          clearAllCookies();
          toaster('warning', 'Token expired please login again');
          window.location.href = '/';
        } else {
          toaster('error', 'Something went wrong');
        }
        reject(error); // Reject the Promise to propagate the error
      });
  });
};
