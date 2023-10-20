import axios, { AxiosError, AxiosResponse } from 'axios';
import { loginDetails } from '../types/loginTypes';
import { OxyDetailInstaceWithToken, oxyDetailInstance } from './NetworkInstance';
import { ProductDetails } from '../types/productTypes';
import { ProductURLs, mrURLs } from '../Constants';

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
export const fetchProductList = (payload?:{ProductCode?:string,CategoryId?:number,SubCategoryId?:number}): Promise<ProductDetails> => {
    return new Promise<ProductDetails>((resolve, reject) => {
      OxyDetailInstaceWithToken.get(ProductURLs.PRODUCTLIST,{ params: { ProductCode:payload?.ProductCode,CategoryId:payload?.CategoryId,SubCategoryId:payload?.SubCategoryId  } })
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

  export const fetchCategoryList = (): Promise<ProductDetails> => {
    return new Promise<ProductDetails>((resolve, reject) => {
      OxyDetailInstaceWithToken.get(ProductURLs.CATEGORYLIST)
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

  export const fetchSubCategoryList = (categoryId:number|null): Promise<ProductDetails> => {
    return new Promise<ProductDetails>((resolve, reject) => {
      OxyDetailInstaceWithToken.get(ProductURLs.SUBCATEGORYLIST,{params:{CategoryId:categoryId}})
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