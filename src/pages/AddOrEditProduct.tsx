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
import { categoryListArray, subCategoryListType, subCategoryListTypeArray } from '../types/productTypes';
import { CustomMultiSelect, CustomSwitch, CustomTextArea } from '../components/styledComponents/Common.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
interface productTypes {
  productCode: string;
  productName: string;
  description: string;
  category: null | any;
  subCategory: null | any;
  categoryId: any;
  attributes: Array<attributeTypes>;
  isNewProduct: boolean;
  isFocusedProduct: boolean;
}
interface attributeTypes {
  label: string;
  value: number | string;
}
const AddOrEditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formDetails, setFormDetails] = useState<productTypes>({
    productCode: '',
    productName: '',
    description: '',
    category: null,
    subCategory: null,
    attributes: [{ label: '', value: 0 }],
    isNewProduct: false,
    isFocusedProduct: false,
    categoryId: null
  });
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [subCategoryList, setSubCategoryList] = useState<subCategoryListTypeArray>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<subCategoryListType | null>(null);
  const [attributeList, setAttributeList] = useState<Array<attributeTypes> | []>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, productName: e.target.value });
  };
  const handleProductCode = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, productCode: e.target.value });
  };
  const fetchAttributeDetails = async (AttributeId = null) => {
    setIsLoader(true);
    await fetchAttributeList(AttributeId)
      .then(res => {
        // setAttributeList(res.map(ele=>{label:ele.attributeId, value:ele.attributeName}));
        const list = res.map(ele => ({ label: ele.attributeName, value: ele.attributeId }));
        console.log(list, 'list');
        if (location.state) {
          const list1 = location.state.productDetails.attributes.map(ele => ele.attributeId);
          console.log(list1, 'list1');
          const info = list1
            .map(ele => (list.find(ele1 => ele1.value === ele) ? list.find(ele1 => ele1.value === ele) : null))
            .filter(ele => ele !== null && ele !== undefined);
          // const info = list.filter(ele => list.findIndex(ele1 => ele1.value === ele) && list.find(ele1 => ele1.value === ele) );
          console.log(info, 'info');
          setSelected(info);
        }
        setAttributeList(list);
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
    console.log(location.state);
    if (location?.state) {
      const {
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
        isFocusedProduct,
        isNewProduct,
        productDescription,
        productName,
        productCode
      } = location.state.productDetails;
      fetchSubCategoryDetails(categoryId);
      setFormDetails({
        ...formDetails,
        productCode: productCode,
        productName: productName,
        description: productDescription,
        isFocusedProduct: isFocusedProduct,
        isNewProduct: isNewProduct,
        categoryId: { categoryId: categoryId, categoryName: categoryName }
      });
      setSubCategoryId({ subCategoryId: subCategoryId, subCategoryName: subCategoryName });
    }
  }, []);

  const handleProductSubmittion = () => {
    const payload = {
      productCode: formDetails.productCode,
      productName: formDetails.productName,
      productDescription: formDetails.description,
      categoryId: formDetails.categoryId?.categoryId,
      subCategoryId: subCategoryId?.subCategoryId,
      categoryName: '',
      subCategoryName: '',
      isNewProduct: formDetails.isNewProduct,
      isFocusedProduct: formDetails.isFocusedProduct,
      isActive: true,
      attributes: selected.map((ele, index) => ({
        productCode: formDetails.productCode,
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
            label="Product Code"
            value={formDetails.productCode}
            onChange={handleProductCode}
            placeholder="Enter Product Code"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <LabelValue
            label="Product Name"
            value={formDetails.productName}
            onChange={handleProductName}
            placeholder="Enter Product Name"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Category</Label>
          <CustomeAutoSelect
            options={categoryList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
              setCategoryId(data.categoryId);
              setFormDetails({ ...formDetails, categoryId: data });
              fetchSubCategoryDetails(data.categoryId);
              setSubCategoryId(null);
              console.log(data, 'data');
            }}
            value={formDetails.categoryId}
            getOptionLabel={option => option.categoryName}
            size="small"
            renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>Sub Category Name</Label>
          <CustomeAutoSelect
            options={subCategoryList}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: any) => {
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
          <CustomTextArea
            minRows={4}
            maxRows={4}
            value={formDetails.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormDetails({ ...formDetails, description: e.target.value })
            }
          />
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
