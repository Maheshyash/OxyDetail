import { Grid, TextField } from '@mui/material';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import LabelValue from '../components/LabelValue';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {
  ActionButtonGroup,
  CustomButton,
  CustomeAutoSelect,
  Label
} from '../components/styledComponents/InputBox.styles';
import {
  fetchAttributeList,
  fetchCategoryList,
  fetchSubCategoryList,
  insertOrUpdateProductDetail
} from '../utils/APIs';
import {
  ProductDetails,
  categoryListArray,
  subCategoryListType,
  subCategoryListTypeArray
} from '../types/productTypes';
import { CustomMultiSelect, CustomSwitch, CustomTextArea } from '../components/styledComponents/Common.styles';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
interface productTypes {
  productName: string;
  description: null | string;
  category: null | number;
  subCategory: null | number;
  attributes: Array<attributeTypes>;
  isNewProduct: boolean;
  isFocusedProduct: boolean;
}
interface attributeTypes {
  label: string;
  value: number;
}
const AddOrEditProduct = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<productTypes>({
    productName: '',
    description: null,
    category: null,
    subCategory: null,
    attributes: [{ label: '', value: 0 }],
    isNewProduct: false,
    isFocusedProduct: false
  });
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [subCategoryList, setSubCategoryList] = useState<subCategoryListTypeArray>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<subCategoryListType | null>(null);
  const [attributeList, setAttributeList] = useState<attributeTypes | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, productName: e.target.value });
  };
  const fetchAttributeDetails = (AttributeId = null) => {
    setIsLoader(true);
    fetchAttributeList(AttributeId)
      .then(res => {
        // setAttributeList(res.map(ele=>{label:ele.attributeId, value:ele.attributeName}));
        setAttributeList(res.map(ele => ({ label: ele.attributeName, value: ele.attributeId })));
        setIsLoader(false);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
        setIsLoader(false);
      });
  };
  const fetchCategoryDetails = async () => {
    await fetchCategoryList()
      .then(res => {
        setCategoryList(res);
      })
      .catch(err => {
        alert('err');
      });
  };
  const fetchSubCategoryDetails = async (categoryId: number) => {
    await fetchSubCategoryList(categoryId)
      .then(res => {
        setSubCategoryList(res);
      })
      .catch(err => {
        alert('err');
      });
  };
  useEffect(() => {
    fetchCategoryDetails();
    fetchAttributeDetails();
  }, []);
  const handleProductSubmittion = () => {
    // {
    //   "productCode": "string",
    //   "productName": "string",
    //   "productDescription": "string",
    //   "categoryId": 0,
    //   "categoryName": "string",
    //   "subCategoryId": 0,
    //   "subCategoryName": "string",
    //   "isisNewProduct": true,
    //   "isisFocusedProduct": true,
    //   "isActive": true,
    //   "activationDate": "2023-10-23T06:31:31.709Z",
    //   "attributes": [
    //     {
    //       "productCode": "string",
    //       "attributeId": 0,
    //       "productAttributeOrder": 0
    //     }
    //   ]
    // }
    const payload = {
      productCode: null,
      productName: formDetails.productName,
      productDescription: formDetails.description,
      categoryId: categoryId,
      subCategoryId: subCategoryId?.subCategoryId,
      categoryName: '',
      subCategoryName: '',
      isNewProduct: formDetails.isNewProduct,
      isFocusedProduct: formDetails.isFocusedProduct,
      isActive: true,
      attributes: selected.map((ele, index) => ({
        productCode: null,
        attributeId: ele.value,
        productAttributeOrder: index
      }))
    };
    insertOrUpdateProductDetail(JSON.stringify(payload))
      .then(res => {
        console.log(res, 'res');
      })
      .catch(err => console.log(err));
  };
  const [selected, setSelected] = useState<Array<any> | []>([]);
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Product Name"
            value={formDetails.productName}
            onChange={handleProductName}
            placeholder="Enter Attribute Name"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Category</Label>
          <CustomeAutoSelect
            options={categoryList}
            onChange={(event, data) => {
              setCategoryId(data.categoryId);
              fetchSubCategoryDetails(data.categoryId);
              setSubCategoryId(null);
              console.log(data, 'data');
            }}
            getOptionLabel={option => option.categoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Sub Category Name</Label>
          <CustomeAutoSelect
            options={subCategoryList}
            onChange={(event, data) => {
              setSubCategoryId(data);
            }}
            value={subCategoryId}
            getOptionLabel={option => option.subCategoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Product Attributes</Label>
          <CustomMultiSelect
            hasSelectAll={false}
            options={attributeList}
            value={selected}
            onChange={(data: Array<attributeTypes>) => {
              if (data.length <= 5) {
                setSelected(data);
              }
            }}
            labelledBy="Select"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>New Product</Label>
          <CustomSwitch
            checked={formDetails.isNewProduct}
            onChange={() =>
              setFormDetails(props => {
                return { ...formDetails, isNewProduct: !props.isNewProduct };
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Focused Product</Label>
          <CustomSwitch
            checked={formDetails.isFocusedProduct}
            onChange={() =>
              setFormDetails(props => {
                return { ...formDetails, isFocusedProduct: !props.isFocusedProduct };
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Product Description</Label>
          <CustomTextArea minRows={4} maxRows={4} />
        </Grid>
      </Grid>
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleProductSubmittion}>
          Submit
        </CustomButton>
      </ActionButtonGroup>
    </BodyContainer>
  );
};

export default AddOrEditProduct;
